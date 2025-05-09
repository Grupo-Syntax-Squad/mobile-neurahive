import React, { useState, useEffect } from "react"
import {
    StyleSheet,
    View,
    Text,
    TouchableOpacity,
    TextInput,
    KeyboardAvoidingView,
    Platform,
    ScrollView,
} from "react-native"
import { useWebSocket } from "@/contexts/WebSocketContext"
import Icon from "react-native-vector-icons/Ionicons"

export default function Body() {
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)
    const [message, setMessage] = useState("")
    const [sending, setSending] = useState(false)

    const { connect, disconnect, sendMessage, messages, isConnected } = useWebSocket()

    useEffect(() => {
        connect()

        return () => {
            disconnect()
        }
    }, [])

    useEffect(() => {
        const timer = setTimeout(() => {
            setLoading(false)
        }, 500)

        return () => clearTimeout(timer)
    }, [])

    const handleSendMessage = async () => {
        if (!message.trim() || sending) return

        setSending(true)
        try {
            sendMessage(message)

            setMessage("")
        } catch (error) {
            setError("Falha ao enviar mensagem")
            console.error("Erro: ", error)
        } finally {
            setSending(false)
        }
    }

    if (loading) {
        return (
            <View style={styles.container}>
                <Text>Carregando chat...</Text>
            </View>
        )
    }

    return (
        <View style={styles.container}>
            <ScrollView
                style={styles.messagesContainer}
                contentContainerStyle={styles.messagesContent}
                ref={(ref) => ref?.scrollToEnd({ animated: true })}
            >
                <View style={styles.messagesContainer}>
                    {error && <Text style={styles.errorText}>{error}</Text>}
                </View>

                {messages.map((msg, index) => (
                    <View
                        key={index}
                        style={[
                            styles.message,
                            msg.is_user_message ? styles.myMessage : styles.iaMessage,
                        ]}
                    >
                        <Text style={msg.is_user_message ? styles.myText : styles.iaText}>
                            {msg.message}
                        </Text>
                        <Text style={styles.timeText}>
                            {new Date(msg.message_date).toLocaleTimeString([], {
                                hour: "2-digit",
                                minute: "2-digit",
                            })}
                        </Text>
                    </View>
                ))}

                {!isConnected && (
                    <View style={styles.connectionStatus}>
                        <Text style={styles.connectionText}>Reconectando...</Text>
                    </View>
                )}
            </ScrollView>

            <KeyboardAvoidingView
                behavior={Platform.OS === "ios" ? "padding" : "height"}
                style={styles.inputContainer}
            >
                <TextInput
                    style={styles.input}
                    placeholder="Digite sua mensagem..."
                    placeholderTextColor="#999"
                    value={message}
                    onChangeText={setMessage}
                />
                <TouchableOpacity style={styles.sendButton} onPress={handleSendMessage}>
                    <Icon name="send" size={24} color="#fff" />
                </TouchableOpacity>
            </KeyboardAvoidingView>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#f2f2f2",
    },
    messagesContent: {
        paddingBottom: 16,
    },
    header: {
        flexDirection: "row",
        alignItems: "center",
        padding: 15,
        backgroundColor: "#FCAF1F",
    },
    avatar: {
        width: 40,
        height: 40,
        borderRadius: 20,
    },
    timeText: {
        fontSize: 10,
        color: "#666",
        marginTop: 4,
        alignSelf: "flex-end",
    },
    headerTitle: {
        color: "white",
        fontSize: 18,
        fontWeight: "bold",
        marginLeft: 10,
    },
    messagesContainer: {
        flex: 1,
        padding: 10,
    },
    connectionStatus: {
        padding: 8,
        backgroundColor: "#fff3cd",
        borderRadius: 4,
        marginTop: 8,
    },
    connectionText: {
        color: "#856404",
        textAlign: "center",
    },
    message: {
        maxWidth: "70%",
        padding: 10,
        borderRadius: 10,
        marginVertical: 5,
    },
    myMessage: {
        backgroundColor: "#E1E3E5",
        alignSelf: "flex-end",
    },
    iaMessage: {
        backgroundColor: "#FCAF1F",
        alignSelf: "flex-start",
    },
    myText: {
        color: "black",
    },
    iaText: {
        color: "black",
    },
    inputContainer: {
        flexDirection: "row",
        padding: 8,
        backgroundColor: "#fff",
        borderTopWidth: 1,
        borderTopColor: "#eee",
    },
    input: {
        flex: 1,
        backgroundColor: "#f5f5f5",
        borderRadius: 20,
        paddingHorizontal: 15,
        paddingVertical: 10,
        marginRight: 10,
    },
    sendButton: {
        backgroundColor: "#FCAF1F",
        borderRadius: 20,
        paddingHorizontal: 15,
        paddingVertical: 10,
        justifyContent: "center",
        alignItems: "center",
    },
    sendButtonText: {
        color: "white",
    },
    errorText: {
        color: "red",
        fontSize: 14,
    },
    noMessages: {
        color: "#999",
        fontSize: 16,
        textAlign: "center",
        marginVertical: 10,
    },
})
