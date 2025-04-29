import { useLocalSearchParams } from "expo-router"
import React from "react"
import Body from "./body"
import WebSocketProvider from "@/contexts/WebSocketContext"

export default function Chat() {
    const params = useLocalSearchParams()
    const chatId = params.id[1]
    console.log(chatId)

    return (
        <WebSocketProvider chatId={Number(chatId)}>
            <Body />
        </WebSocketProvider>
    )
}
