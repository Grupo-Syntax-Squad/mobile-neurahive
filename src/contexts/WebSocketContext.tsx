import { Message } from "@/interfaces/Services/Message"
import convertToSaoPauloUTC from "@/utils/convertToBrasiliaDate"
import { createContext, useContext, useRef, useState } from "react"
import { Alert } from "react-native"
import Constants from "expo-constants"
const extra = Constants.expoConfig?.extra ?? {}

interface WebSocketContextType {
    connect: () => void
    disconnect: () => void
    sendMessage: (message: string) => void
    messages: Message[]
    setMessages: React.Dispatch<React.SetStateAction<Message[]>>
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
        return `${extra.WEBSOCKET_URL}/ws/chat`
    }

    const connect = async () => {
        try {
            if (!chatId) {
                console.log("[WEBSOCKET] Aguardando chatId...")
                return
            }

            if (ws.current?.readyState === WebSocket.OPEN) {
                console.log("[WEBSOCKET]  Já conectado.")
                return
            }

            if (ws.current?.readyState === WebSocket.CONNECTING) {
                console.log("[WEBSOCKET] Já está conectando...")
                return
            }

            const url = `${getWebSocketUrl()}`
            console.log("[WEBSOCKET] Conectando a:", url)

            ws.current = new WebSocket(url)

            ws.current.onopen = () => {
                console.log(`[WEBSOCKET] Conectado ao chat ${chatId}`)
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
                    console.error("[WEBSOCKET] Erro ao processar mensagem:", error)
                }
            }

            ws.current.onerror = (e) => {
                console.error("[WEBSOCKET] Erro no WebSocket:", e)
            }

            ws.current.onclose = (e) => {
                console.log("[WEBSOCKET] Conexão fechada", e.code, e.reason)
                setIsConnected(false)

                if (chatId) {
                    setTimeout(() => {
                        console.log("[WEBSOCKET] Tentando reconectar...")
                        connect()
                    }, 3000)
                }
            }
        } catch (error) {
            console.error("[WEBSOCKET] Erro na conexão:", error)
            Alert.alert("Chat", "Erro ao acessar o chat. Tente novamente.")
        }
    }

    const disconnect = () => {
        console.log("[WEBSOCKET] Disconectando do websocket")
        if (ws.current) {
            ws.current.close()
            ws.current = null
        }
        console.log("[WEBSOCKET] Disconectado do websocket")
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
            console.warn("[WEBSOCKET] WebSocket não conectado ou chatId inválido")
        }
    }

    const value = {
        connect,
        disconnect,
        sendMessage,
        messages,
        setMessages,
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
