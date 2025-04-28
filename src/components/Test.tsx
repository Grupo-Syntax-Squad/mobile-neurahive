import { useWebSocket } from "@/contexts/WebSocketContext"
import { useEffect } from "react"
import { Text } from "react-native"

// @TODO: Remover este component depois, usado somente para teste do websocket na página de agentes (/Agents/page)
export const TestComponent = () => {
    const { connect, disconnect, setChatId, sendMessage, isConnected } = useWebSocket()

    useEffect(() => {
        setChatId(2)
        connect()

        return () => {
            disconnect()
        }
    }, [])

    useEffect(() => {
        if (isConnected) {
            sendMessage("Oi")
        }
    }, [isConnected])

    return <Text>Test Component</Text>
}
