import { useRouter } from "expo-router"
import { StyleSheet, View, Text, TouchableOpacity, Alert } from "react-native"
import globalStyles from "../styles/globalStyles"
import { useEffect, useState } from "react"
import { useAxios } from "@/context/axiosContext"
import { GetAgentResponse, GetAgentResponseKeys } from "@/interfaces/Services/Agent"
import { Division } from "@/components/Division"
import { useAuth } from "@/context/authContext"

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
            console.log("userId", user.userId)
            console.log("agentId", agentId)
            const response = await post("/chat/", { 
                user_id: user.userId,
                agent_id: agentId
            });
            console.log("Resposta COMPLETA da API:", JSON.stringify(response, null, 2));

            console.log("Dados da navegação:", {
                pathname: `/Chat/[id]`,
                params: {
                    id: response.data.id,
                    agentName: agentName
                }
            });
            const chatId = response.data.chat_id || response.data._id;
            console.log("ChatID: " + chatId)
            router.push({
                pathname: `/Chat/[id]`,
                params: {
                  id: response.data.id,
                  agentName: agentName
                }
              });
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
            <Division/>
            <View style={globalStyles.agentContainer}>
                {agents.length < 1 && <Text>Nenhum agente encontrado.</Text>}
                {agents.map((agent) => (
                    <TouchableOpacity
                        style={globalStyles.agentBox}
                        onPress={() => handleAgentPress(
                            agent[GetAgentResponseKeys.ID].toString(),
                            agent[GetAgentResponseKeys.NAME]
                        )}
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