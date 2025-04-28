import { useLocalSearchParams } from "expo-router"
import { useEffect, useState } from "react"
import { Alert, ScrollView, StyleSheet, Text } from "react-native"
import { useAxios } from "@/contexts/axiosContext"
import globalStyles from "../styles/globalStyles"
import {
    GetKnowledgeBaseDetails,
    GetKnowledgeBaseDetailsKeys,
    KnowledgeBaseDetailsDataKeys,
} from "@/interfaces/Services/KnowledgeBase"
import KnowledgeBaseTable from "@/components/KnowledgeBaseTable"

export default function KnowledgeBaseDetails() {
    const { id } = useLocalSearchParams()
    const { get } = useAxios()
    const [loading, setLoading] = useState<boolean>(true)
    const [knowledgeBaseDetails, setKnowledgeBaseDetails] = useState<
        GetKnowledgeBaseDetails | undefined
    >(undefined)

    useEffect(() => {
        getKnowledgeBaseDetails()
    }, [])

    const getKnowledgeBaseDetails = async () => {
        setLoading(true)
        try {
            const response = (await get(`/knowledge-base/${id}`)).data
            setKnowledgeBaseDetails(response)
        } catch (error) {
            Alert.alert(
                "Consultar detalhes da base de conhecimento",
                "Erro ao consultar os detalhes da base de conhecimento"
            )
        } finally {
            setLoading(false)
        }
    }

    if (loading) return <Text>Consultando os detalhes da base de conhecimento...</Text>

    return (
        <ScrollView style={styles.page}>
            <Text style={globalStyles.title}>
                {knowledgeBaseDetails?.[GetKnowledgeBaseDetailsKeys.NAME]}
            </Text>
            {knowledgeBaseDetails ? (
                <KnowledgeBaseTable
                    questions={
                        knowledgeBaseDetails?.[GetKnowledgeBaseDetailsKeys.DATA][
                            KnowledgeBaseDetailsDataKeys.QUESTIONS
                        ]
                    }
                    answers={
                        knowledgeBaseDetails[GetKnowledgeBaseDetailsKeys.DATA][
                            KnowledgeBaseDetailsDataKeys.ANSWERS
                        ]
                    }
                />
            ) : (
                <Text>Não foi possível consultar os detalhe da base de conhecimento</Text>
            )}
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    page: {
        padding: 10,
    },
})
