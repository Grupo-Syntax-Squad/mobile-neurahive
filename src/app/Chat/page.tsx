import { useRouter } from "expo-router"
import {
    StyleSheet,
    View,
    Text,
    TouchableOpacity,
    Alert,
    ScrollView
} from "react-native"
import globalStyles from "../styles/globalStyles"
import { MaterialIcons } from '@expo/vector-icons'; 
import React, { useEffect, useState } from "react";
import { useAxios } from "@/context/axiosContext";
import { GetChatResponse, GetChatResponseKeys } from "@/interfaces/Services/Chat"

export default function NewChat() {
    const router = useRouter()
    const [chats, setChats] = useState<GetChatResponse[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)
    const { get } = useAxios()

    const fetchChats = async () => {
        setLoading(true)
        try {
            const response = (await get("/chat/")).data
            setChats(response)
        } catch (error) {
            Alert.alert("Consultar chats", "Erro ao consultar chats")
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchChats()
    }, [])
    
    if (loading)
        return (
            <View>
                <Text>Consultando chats...</Text>
            </View>
        )

    return (
        <ScrollView contentContainerStyle={styles.scrollContainer}>
            <View style={styles.container}>
                <TouchableOpacity
                    style={[globalStyles.agentBox, styles.buttonContainer]}
                    onPress={() => router.push({ pathname: "/Chat/selectAgent" })}
                >
                    <Text style={styles.buttonText}>Novo Chat</Text>
                    <MaterialIcons name="add" size={24} color="orange" />
                </TouchableOpacity>
                {chats.length < 1 && <Text>Nenhum chat encontrado.</Text>}
                {chats.map((chat) => (
                   <TouchableOpacity
                       style={globalStyles.agentBox}
                       onPress={() =>
                           router.push(`/Chat/[${chat[GetChatResponseKeys.ID]}]`)
                       }
                       key={chat[GetChatResponseKeys.ID]}
                   >
                       <Text>id agente: {chat[GetChatResponseKeys.ID]}</Text>
                   </TouchableOpacity>
                ))}
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    scrollContainer: {
        flexGrow: 1,
    },
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
        gap: 10,
    },
    buttonContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 10,
        paddingVertical: 15,
        borderRadius: 10,
    },
    buttonText: {
        color: 'gray',
        fontSize: 18,
        fontWeight: 'bold',
    }
})