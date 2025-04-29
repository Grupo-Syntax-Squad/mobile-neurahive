import { useAxios } from "@/contexts/axiosContext"
import { useEffect, useState } from "react"
import { Alert, Text, TouchableOpacity, View } from "react-native"
import globalStyles from "../styles/globalStyles"
import { router } from "expo-router"
import { getErrorMessage } from "@/utils/getErrorMessage"

interface GetKnowledgeBasesResponse {
    [GetKnowledgeBasesResponseKeys.ID]: number
    [GetKnowledgeBasesResponseKeys.NAME]: string
}

enum GetKnowledgeBasesResponseKeys {
    ID = "id",
    NAME = "name",
}

export default function KnowledgeBase() {
    const { get } = useAxios()
    const [loading, setLoading] = useState<boolean>(true)
    const [knowledgeBases, setKnowledgeBases] = useState<GetKnowledgeBasesResponse[]>([])

    useEffect(() => {
        getKnowledgeBases()
    }, [])

    const getKnowledgeBases = async () => {
        setLoading(true)
        try {
            const response = (await get("/knowledge-base/")).data
            setKnowledgeBases(response)
        } catch (error) {
            Alert.alert(
                "Consultar bases de conhecimento",
                `Erro ao consultar as bases de conhecimento do sistema: ${getErrorMessage(error)}`
            )
        } finally {
            setLoading(false)
        }
    }

    if (loading) return <Text>Consultando as bases de conhecimento...</Text>

    return (
        <View style={globalStyles.agentContainer}>
            {knowledgeBases.length < 1 && (
                <Text>Nenhuma base de conhecimento cadastrada no sistema.</Text>
            )}
            {knowledgeBases.map((knowledgeBase) => (
                <TouchableOpacity
                    onPress={() =>
                        router.push({
                            pathname: "/KnowledgeBase/[id]",
                            params: { id: String(knowledgeBase[GetKnowledgeBasesResponseKeys.ID]) },
                        })
                    }
                    key={String(knowledgeBase[GetKnowledgeBasesResponseKeys.ID])}
                    style={globalStyles.agentBox}
                >
                    <Text>{knowledgeBase[GetKnowledgeBasesResponseKeys.NAME]}</Text>
                </TouchableOpacity>
            ))}
        </View>
    )
}
