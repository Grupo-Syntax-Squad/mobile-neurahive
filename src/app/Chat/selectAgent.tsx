import { useRouter } from "expo-router"
import { View, Text, TouchableOpacity, Image, Alert } from "react-native"
import globalStyles from "../styles/globalStyles"
import { useEffect, useState } from "react"
import { useAxios } from "@/contexts/axiosContext"
import { GetAgentResponse, GetAgentResponseKeys } from "@/interfaces/Services/Agent"
import { Division } from "@/components/Division"
import { useAuth } from "@/contexts/authContext"

export default function Chats() {
    const router = useRouter()
    const [agents, setAgents] = useState<GetAgentResponse[]>([])
    const [loading, setLoading] = useState(true)
    const { get, post } = useAxios()
    const { user } = useAuth()

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

    const handleAgentPress = async (agentId: string, agentName: string) => {
        if (!user?.userId) {
            Alert.alert("Erro", "Usuário não autenticado")
            return
        }

        try {
            const response = await post("/chat/", {
                user_id: user.userId,
                agent_id: agentId,
            })
            router.push({
                pathname: `/Chat/${response.data.data.user_id}`,
                params: {
                    agentName: response.data.data.agent_name,
                },
            })
        } catch (error) {
            Alert.alert("Erro", "Não foi possível iniciar o chat com o agente")
            console.error("Error creating chat:", error)
        }
    }

    useEffect(() => {
        fetchAgents()
    }, [])

    if (loading) {
        return (
            <View>
                <Text>Consultando agentes...</Text>
            </View>
        )
    }

    return (
        <View>
            <Division />
            <View style={globalStyles.agentContainer}>
                {agents.length < 1 && <Text>Nenhum agente encontrado.</Text>}
                {agents.map((agent) => (
                    <TouchableOpacity
                        style={[
                            globalStyles.agentBox,
                            { flexDirection: "row", alignItems: "center" },
                        ]}
                        onPress={() =>
                            handleAgentPress(
                                agent[GetAgentResponseKeys.ID].toString(),
                                agent[GetAgentResponseKeys.NAME]
                            )
                        }
                        key={agent[GetAgentResponseKeys.ID]}
                    >
                        <Image
                            source={require("../../assets/images/agente4.png")}
                            style={{ width: 50, height: 50, borderRadius: 25, marginRight: 10 }}
                        />
                        <Text>{agent[GetAgentResponseKeys.NAME]}</Text>
                    </TouchableOpacity>
                ))}
            </View>
        </View>
    )
}
