import { Message } from "@/interfaces/Services/Message"
import { createContext, useContext, useRef, useState } from "react"
import { Alert } from "react-native"

interface WebSocketContextType {
    connect: () => void
    disconnect: () => void
    sendMessage: (message: string) => void
    messages: Message[]
    isConnected: boolean
    setChatId: React.Dispatch<React.SetStateAction<number | undefined>>
}

interface WebSocketMessage {
    chat_id: number
    message: string
}

const WebSocketContext = createContext<WebSocketContextType | undefined>(undefined)

export default function WebSocketProvider({ children }: { children: React.ReactNode }) {
    const ws = useRef<WebSocket | null>(null)
    const [isConnected, setIsConnected] = useState(false)
    const [messages, setMessages] = useState<Message[]>([])
    const [chatId, setChatId] = useState<number | undefined>(undefined)

    const connect = () => {
        try {
            if (!chatId) throw "Não foi informado o id do chat para o contexto!"
            if (
                ws.current &&
                (ws.current.readyState === WebSocket.OPEN ||
                    ws.current.readyState === WebSocket.CONNECTING) &&
                chatId
            ) {
                console.log("Já conectado ou conectando.")
                return
            }

            if (process.env.EXPO_PUBLIC_WEBSOCKET_URL)
                ws.current = new WebSocket(process.env.EXPO_PUBLIC_WEBSOCKET_URL)
            else throw new Error("Não foi possível encontrar o endereço do WebSocket")

            ws.current.onopen = () => {
                console.log("Conectado!")
                setIsConnected(true)
            }

            ws.current.onmessage = (e) => {
                console.log("Mensagem recebida:", e.data)
            }

            ws.current.onerror = (e) => {
                console.error("Erro no WebSocket:", e)
            }

            ws.current.onclose = (e) => {
                console.log("Conexão fechada", e.code, e.reason)
                setIsConnected(false)

                setTimeout(() => {
                    console.log("Tentando reconectar...")
                    connect()
                }, 3000)
            }
        } catch (error) {
            console.log(error)
            Alert.alert("Chat", "Erro ao acessar o chat. Tente novamente.")
        }
    }

    const disconnect = () => {
        if (ws.current) {
            ws.current.close()
            ws.current = null
        }
    }

    const sendMessage = (message: string) => {
        if (ws.current && isConnected && chatId) {
            const webSocketMessage: WebSocketMessage = { chat_id: chatId, message }
            const messageString = JSON.stringify(webSocketMessage)
            ws.current.send(messageString)
            setMessages([...messages, initializeUserMessage(message)])
        } else {
            console.warn("WebSocket não conectado.")
        }
    }

    const initializeUserMessage = (message: string): Message => {
        return {
            chat_id: chatId!,
            message: message,
            is_user_message: true,
            message_date: new Date(),
        }
    }

    const value = { connect, disconnect, sendMessage, messages, isConnected, setChatId }

    return <WebSocketContext.Provider value={value}>{children}</WebSocketContext.Provider>
}

export const useWebSocket = () => {
    const context = useContext(WebSocketContext)
    if (!context) {
        throw new Error("useWebSocket deve ser usado dentro do WebSocketProvider")
    }
    return context
}
