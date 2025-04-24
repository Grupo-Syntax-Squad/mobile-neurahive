import { Link, useRouter } from "expo-router"
import {
    Image,
    StyleSheet,
    View,
    Text,
    TouchableOpacity,
    Alert,
} from "react-native"
import { globalStyles } from "../styles/globalStyles"
import { useEffect, useState } from "react"
import { useAxios } from "@/context/axiosContext"
import {
    GetAgentResponse,
    GetAgentResponseKeys,
} from "@/interfaces/Services/Agent"

export default function Chats() {
    const router = useRouter()
    const [agents, setAgents] = useState<GetAgentResponse[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)
    const { get } = useAxios()
    const fetchAgents = async () => {
        setLoading(true)
        try {
            const response = (await get("/agents/")).data
            setAgents(response)
        } catch (error) {
            Alert.alert("Consultar agentes", "Erro ao consultar agentes")
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchAgents()
    }, [])

    if (loading)
        return (
            <View>
                <Text>Consultando agentes...</Text>
            </View>
        )

    return (
        <View>
            <View style={globalStyles.agentContainer}>
                {agents.length < 1 && <Text>Nenhum agente encontrado.</Text>}
                {agents.map((agent) => (
                    <TouchableOpacity
                    style={globalStyles.agentBox}
                    onPress={() =>
                        router.push({
                            pathname: "/Chat/[id]",
                            params: { 
                                id: agent[GetAgentResponseKeys.ID],
                                agentName: agent[GetAgentResponseKeys.NAME] 
                            }
                        })
                    }
                    key={agent[GetAgentResponseKeys.ID]}
                >
                    <Text>{agent[GetAgentResponseKeys.NAME]}</Text>
                </TouchableOpacity>
                ))}
            </View>
        </View>
    )
}

const styles = StyleSheet.create({})
