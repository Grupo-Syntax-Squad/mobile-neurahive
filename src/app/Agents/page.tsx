import { useRouter } from "expo-router"
import { Image, View, Text, TouchableOpacity, Alert } from "react-native"
import globalStyles from "../styles/globalStyles"
import { useEffect, useState } from "react"
import { useAxios } from "@/contexts/axiosContext"
import { GetAgentResponse, GetAgentResponseKeys } from "@/interfaces/Services/Agent"
import { getErrorMessage } from "@/utils/getErrorMessage"

export default function Agents() {
    const router = useRouter()
    const [agents, setAgents] = useState<GetAgentResponse[]>([])
    const [loading, setLoading] = useState(true)
    const { get } = useAxios()
    const fetchAgents = async () => {
        setLoading(true)
        try {
            const response = (await get("/agents/")).data
            setAgents(response)
        } catch (error) {
            Alert.alert("Consultar agentes", `Erro ao consultar agentes: ${getErrorMessage(error)}`)
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
            <View style={globalStyles.header}>
                <Text>Área de Agentes</Text>
                <Image source={require("../../assets/images/agente1.png")} />
            </View>
            {/* <Link href="/#" style={globalStyles.middleButton}>
                <Image
                    source={require("../../assets/images/base-de-conhecimento.png")}
                />
                <Text>Base de Conhecimento</Text>
            </Link> */}
            <TouchableOpacity style={globalStyles.orangeButton}>
                <Text
                    style={globalStyles.WhiteText}
                    onPress={() => router.replace("/Agents/create")}
                >
                    Criar Novo Agente
                </Text>
            </TouchableOpacity>
            <View style={globalStyles.agentContainer}>
                {agents.length < 1 && <Text>Nenhum agente encontrado.</Text>}
                {agents.map((agent) => (
                    <TouchableOpacity
                        style={globalStyles.agentBox}
                        onPress={() => router.push(`/Agents/${agent[GetAgentResponseKeys.ID]}`)}
                        key={agent[GetAgentResponseKeys.ID]}
                    >
                        <Text>{agent[GetAgentResponseKeys.NAME]}</Text>
                    </TouchableOpacity>
                ))}
            </View>
        </View>
    )
}
