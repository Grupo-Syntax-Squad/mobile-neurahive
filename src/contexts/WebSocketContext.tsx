import { Message } from "@/interfaces/Services/Message"
import convertToSaoPauloUTC from "@/utils/convertToBrasiliaDate"
import { createContext, useContext, useRef, useState } from "react"
import { Alert } from "react-native"

interface WebSocketContextType {
    connect: () => void
    disconnect: () => void
    sendMessage: (message: string) => void
    messages: Message[]
    isConnected: boolean
}

interface WebSocketMessage {
    chat_id: number
    message: string
}

const WebSocketContext = createContext<WebSocketContextType | undefined>(undefined)

export default function WebSocketProvider({
    children,
    chatId,
}: {
    children: React.ReactNode
    chatId: number
}) {
    const ws = useRef<WebSocket | null>(null)
    const [isConnected, setIsConnected] = useState(false)
    const [messages, setMessages] = useState<Message[]>([])
    const getWebSocketUrl = () => {
        return process.env.EXPO_PUBLIC_WEBSOCKET_URL
    }

    const connect = () => {
        try {
            if (!chatId) {
                console.log("Aguardando chatId...")
                return
            }

            if (ws.current?.readyState === WebSocket.OPEN) {
                console.log("Já conectado.")
                return
            }

            if (ws.current?.readyState === WebSocket.CONNECTING) {
                console.log("Já está conectando...")
                return
            }

            const url = `${getWebSocketUrl()}`
            console.log("Conectando a:", url)

            ws.current = new WebSocket(url)

            ws.current.onopen = () => {
                console.log(`Conectado ao chat ${chatId}`)
                setIsConnected(true)
            }

            ws.current.onmessage = (e) => {
                try {
                    const data = JSON.parse(e.data)
                    const dateSaoPaulo = convertToSaoPauloUTC(data.response_date)
                    setMessages((prev) => [
                        ...prev,
                        {
                            chat_id: chatId,
                            message: data.answer,
                            is_user_message: false,
                            message_date: dateSaoPaulo,
                        },
                    ])
                } catch (error) {
                    console.error("Erro ao processar mensagem:", error)
                }
            }

            ws.current.onerror = (e) => {
                console.error("Erro no WebSocket:", e)
            }

            ws.current.onclose = (e) => {
                console.log("Conexão fechada", e.code, e.reason)
                setIsConnected(false)

                if (chatId) {
                    setTimeout(() => {
                        console.log("Tentando reconectar...")
                        connect()
                    }, 3000)
                }
            }
        } catch (error) {
            console.error("Erro na conexão:", error)
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
            const webSocketMessage: WebSocketMessage = {
                chat_id: chatId,
                message,
            }
            ws.current.send(JSON.stringify(webSocketMessage))
            setMessages((prev) => [
                ...prev,
                {
                    chat_id: chatId,
                    message,
                    is_user_message: true,
                    message_date: new Date(),
                },
            ])
        } else {
            console.warn("WebSocket não conectado ou chatId inválido")
        }
    }

    const value = {
        connect,
        disconnect,
        sendMessage,
        messages,
        isConnected,
    }

    return <WebSocketContext.Provider value={value}>{children}</WebSocketContext.Provider>
}

export const useWebSocket = () => {
    const context = useContext(WebSocketContext)
    if (!context) {
        throw new Error("useWebSocket deve ser usado dentro do WebSocketProvider")
    }
    return context
}
