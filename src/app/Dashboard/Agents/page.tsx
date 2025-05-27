import { StyleSheet, Text, View, TouchableOpacity, ScrollView } from "react-native"
import React, { useEffect, useState } from "react"
import { useAxios } from "@/contexts/axiosContext"
import globalStyles from "../../styles/globalStyles"
import { Agent, AgentKeys, PutAgentKeys, PutAgentRequest } from "@/types/Agent"
import { getErrorMessage } from "@/utils/getErrorMessage"
import Entypo from "@expo/vector-icons/Entypo"
import { Text as SvgText } from "react-native-svg"
import { PieChart } from "react-native-svg-charts"
import AgentsLegend from "@/components/AgentsLegend"

export function ManageAgents() {
    const [agents, setAgents] = useState<Agent[]>([])
    const [, setLoading] = useState(true)
    const [, setError] = useState<string | null>(null)
    const { get, deletar, put } = useAxios()

    const enableAgents = agents.filter((agent) => agent[AgentKeys.ENABLED])
    const disableAgents = agents.filter((agent) => !agent[AgentKeys.ENABLED])

    const percentActive = agents.length ? (enableAgents.length / agents.length) * 100 : 0
    const percentInactive = agents.length ? (disableAgents.length / agents.length) * 100 : 0

    const fetchAgents = async () => {
        try {
            setLoading(true)
            const response = await get(`/agents/`, { params: { disabled_agents: true } })
            setAgents(response.data)
        } catch (err) {
            setError("Erro ao carregar usuários")
            console.error("Erro na requisição:", getErrorMessage(err))
        } finally {
            setLoading(false)
        }
    }

    const handleDelete = async (agentId: number) => {
        try {
            setLoading(true)
            await deletar(`/agents/?agent_id=${agentId}`)
            await fetchAgents()
        } catch (err) {
            console.error("Erro ao deletar:", err)
            setError("Erro ao deletar Agente")
        } finally {
            setLoading(false)
        }
    }

    const handleEnable = async (agent: Agent) => {
        const data: PutAgentRequest = {
            [PutAgentKeys.NAME]: agent[AgentKeys.NAME],
            [PutAgentKeys.THEME]: agent[AgentKeys.THEME],
            [PutAgentKeys.BEHAVIOR]: agent[AgentKeys.BEHAVIOR],
            [PutAgentKeys.TEMPERATURE]: agent[AgentKeys.TEMPERATURE],
            [PutAgentKeys.TOP_P]: agent[AgentKeys.TOP_P],
            [PutAgentKeys.IMAGE_ID]: agent[AgentKeys.IMAGE_ID],
            [PutAgentKeys.GROUPS]: agent[AgentKeys.GROUPS],
            [PutAgentKeys.KNOWLEDGE_BASE_ID]: agent[AgentKeys.KNOWLEDGE_BASE_ID],
            [PutAgentKeys.ENABLED]: true,
        }
        try {
            setLoading(true)
            await put(`/agents/${agent[AgentKeys.ID]}`, data, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            })
            await fetchAgents()
        } catch (err) {
            console.error("Erro ao habilitar o agente:", err)
            setError("Erro ao habilitar o agente")
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchAgents()
    }, [])

    const data = [percentActive, percentInactive]
    const chartColors = ["#16ae03", "#ae1a03"]
    const pieData = data
        .map((value, index) => ({
            value: parseFloat(value.toFixed(0)),
            color: chartColors[index % chartColors.length],
        }))
        .filter((item) => item.value > 0)
        .map((item, index) => ({
            value: item.value,
            key: `${index}-${item.value}`,
            svg: {
                fill: item.color,
            },
        }))

    const Label = ({ slices }: { slices: any }) => {
        return slices.map((slice: any, index: any) => {
            const { pieCentroid, data } = slice
            return (
                <SvgText
                    key={`label-${index}`}
                    x={pieCentroid[0]}
                    y={pieCentroid[1]}
                    fill="white"
                    textAnchor={"middle"}
                    alignmentBaseline={"middle"}
                    fontSize={12}
                >
                    {data.value}%
                </SvgText>
            )
        })
    }

    return (
        <ScrollView
            keyboardShouldPersistTaps="handled"
            contentContainerStyle={styles.scrollContainer}
        >
            <View style={{ justifyContent: "center" }}>
                <PieChart style={{ height: 150 }} data={pieData}>
                    <Label />
                </PieChart>
            </View>
            <AgentsLegend />
            <View style={styles.usersList}>
                <Text style={globalStyles.orangeText}>Agentes Ativos</Text>
                {agents.map((agent) => (
                    <AgentCard
                        key={agent[AgentKeys.ID]}
                        agent={agent}
                        onDelete={handleDelete}
                        onEnable={handleEnable}
                    />
                ))}
            </View>
        </ScrollView>
    )
}

type AgentCardProps = {
    agent: Agent
    onDelete: (id: number) => Promise<void>
    onEnable: (agent: Agent) => Promise<void>
}

const AgentCard: React.FC<AgentCardProps> = ({ agent, onDelete, onEnable }) => (
    <View style={agent[AgentKeys.ENABLED] ? styles.userContainer : styles.disabledUserContainer}>
        <Text style={styles.userName}>{agent[AgentKeys.NAME]}</Text>
        {agent[AgentKeys.ENABLED] ? (
            <TouchableOpacity
                style={styles.disableAgentButton}
                onPress={() => onDelete(agent[AgentKeys.ID])}
            >
                <Entypo name="trash" size={24} color="white" />
            </TouchableOpacity>
        ) : (
            <TouchableOpacity style={styles.enableAgentButton} onPress={() => onEnable(agent)}>
                <Entypo name="check" size={24} color="white" />
            </TouchableOpacity>
        )}
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
    disableAgentButton: {
        backgroundColor: "#ff0000",
        padding: 10,
        borderRadius: 6,
        alignSelf: "flex-start",
        minWidth: 50,
        alignItems: "center",
    },
    enableAgentButton: {
        backgroundColor: "#3333ff",
        padding: 10,
        borderRadius: 6,
        alignSelf: "flex-start",
        minWidth: 50,
        alignItems: "center",
    },
    disabledUserContainer: {
        backgroundColor: "#fff",
        flexDirection: "row",
        justifyContent: "space-between",
        borderRadius: 8,
        padding: 16,
        borderWidth: 1,
        borderColor: "#e0e0e0",
        alignItems: "center",
        opacity: 0.7,
    },
})

export default ManageAgents
