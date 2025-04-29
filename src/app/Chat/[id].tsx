import { useLocalSearchParams } from "expo-router"
import React from "react"
import Body from "./body"
import WebSocketProvider from "@/contexts/WebSocketContext"

export default function Chat() {
    const params = useLocalSearchParams()
    const chatId = Number(params.id[1])

    return (
        <WebSocketProvider chatId={chatId}>
            <Body />
        </WebSocketProvider>
    )
}
