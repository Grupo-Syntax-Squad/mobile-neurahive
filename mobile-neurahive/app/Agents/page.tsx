import { Link, router, useRouter } from "expo-router"
import { Image, StyleSheet, View, Text, TouchableOpacity } from "react-native"
import { globalStyles } from "../styles/globalStyles"
import { useState } from "react"
import axios from "axios"
import { Agent } from "@/types/Agent"

export default function Agents() {
    const router = useRouter()
    const [agents, setAgents] = useState<Agent[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    const fetchAgents = async () => {
        try {
            setLoading(true)
            const response = await axios.get<Agent[]>(
                `${process.env.EXPO_PUBLIC_API_URL}/agents`
            )
            setAgents(response.data)
        } catch (err) {
            setError("Erro ao carregar usuários")
            console.error("Erro na requisição:", err)
        } finally {
            setLoading(false)
        }
    }

    return (
        <View>
            <View style={globalStyles.header}>
                <Text>Área de Agentes</Text>
                <Image source={require("../../assets/images/agente1.png")} />
            </View>
            <Link href="/#" style={globalStyles.middleButton}>
                <Image
                    source={require("../../assets/images/base-de-conhecimento.png")}
                />
                <Text>Base de Conhecimento</Text>
            </Link>
            <TouchableOpacity style={globalStyles.orangeButton}>
                <Text
                    style={globalStyles.WhiteText}
                    onPress={() => router.replace("/Agents/create")}
                >
                    Criar Novo Agente
                </Text>
            </TouchableOpacity>
            <View style={globalStyles.agentContainer}>
                <TouchableOpacity
                    style={globalStyles.agentBox}
                    onPress={() => router.push("/Agents/[id]")}
                >
                    <Image
                        source={require("../../assets/images/apicultora.png")}
                    />
                    <Text>Ive</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({})
