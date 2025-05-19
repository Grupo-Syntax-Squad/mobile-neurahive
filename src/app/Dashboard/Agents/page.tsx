import { StyleSheet, Text, View, TouchableOpacity, ScrollView } from "react-native"
import { Link, useRouter } from "expo-router"
import React, { useEffect, useState } from "react"
import { useAxios } from "@/contexts/axiosContext"
import globalStyles from "../../styles/globalStyles"
import { Agent } from "@/types/Agent"
import { getErrorMessage } from "@/utils/getErrorMessage"
import Entypo from '@expo/vector-icons/Entypo';


export function ManageAgents() {
    const router = useRouter()
    const [agents, setAgents] = useState<Agent[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)
    const { get } = useAxios()

    const fetchAgents = async () => {
            try {
                setLoading(true)
                const response = await get(`/agents/`)
                setAgents(response.data)
            } catch (err) {
                setError("Erro ao carregar usuários")
                console.error("Erro na requisição:", getErrorMessage(err))
            } finally {
                setLoading(false)
            }
        }
    
        useEffect(() => {
            fetchAgents()
        }, [])

  return (
    <ScrollView keyboardShouldPersistTaps="handled"
        contentContainerStyle={styles.scrollContainer}
    >
    <View style={styles.usersList}>
        <Text style={globalStyles.orangeText}>Agentes Ativos</Text>
        {agents.map((agent) => (
            <AgentCard key={agent.id} agent={agent} />
        ))}
    </View>
    </ScrollView>
  );
};

const AgentCard: React.FC<{ agent: Agent }> = ({ agent }) => (
    <View style={styles.userContainer}>
        <Text style={styles.userName}>{agent.name}</Text>
        <TouchableOpacity style={styles.userDetailButton}>
            <Entypo name="trash" size={24} color="white" />
        </TouchableOpacity>
    </View>
)

const styles = StyleSheet.create({
    scrollContainer: {
        padding: 16,
    },
    header: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 20,
    },
    headerText: {
        fontSize: 20,
        fontWeight: "bold",
    },
    headerImage: {
        width: 40,
        height: 40,
    },
    actionsContainer: {
        gap: 12,
        marginBottom: 24,
    },
    usersList: {
        gap: 16,
    },
    userContainer: {
        backgroundColor: "#fff",
        flexDirection: "row",
        justifyContent: "space-between",
        borderRadius: 8,
        padding: 16,
        borderWidth: 1,
        borderColor: "#e0e0e0",
        alignItems: "center",

    },
    userName: {
        fontSize: 16,
        fontWeight: "500",
        marginBottom: 4,
    },
    userEmail: {
        backgroundColor: "#FFF8F2",
        borderColor: "#FC801F",
        borderWidth: 1,
        borderRadius: 6,
        padding: 8,
        marginBottom: 12,
        color: "#333",
    },
    userDetailButton: {
        backgroundColor: "#ff0000",
        padding: 10,
        borderRadius: 6,
        alignSelf: "flex-start",
        minWidth: 50,
        alignItems: "center",
    },
})

export default ManageAgents;
