import { StyleSheet, Text, View, TouchableOpacity, ScrollView } from "react-native"
import { Link, useRouter } from "expo-router"
import React, { useEffect, useState } from "react"
import { useAxios } from "@/contexts/axiosContext"
import globalStyles from "../../styles/globalStyles"
import { Agent } from "@/types/Agent"
import { getErrorMessage } from "@/utils/getErrorMessage"
import Entypo from '@expo/vector-icons/Entypo';
import { Text as SvgText} from 'react-native-svg'
import { PieChart } from 'react-native-svg-charts'
import AgentsLegend from "@/components/AgentsLegend"


export function ManageAgents() {
    const router = useRouter()
    const [agents, setAgents] = useState<Agent[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)
    const { get, deletar } = useAxios()

    const enableAgents = agents.filter((agent) => agent.enabled);
    const disableAgents = agents.filter((agent) => !agent.enabled);

    const percentActive = agents.length ? (enableAgents.length / agents.length) * 100 : 0;
    const percentInactive = agents.length ? (disableAgents.length / agents.length) * 100 : 0;

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

        const handleDelete = async (agentId: number) => {
            try {
                setLoading(true);
                await deletar(`/agents/?agent_id=${agentId}`);
                await fetchAgents();
            } catch (err) {
                console.error("Erro ao deletar:", getErrorMessage(err));
                setError("Erro ao deletar Agente");
            } finally {
                setLoading(false);
            }
        };
    
        useEffect(() => {
            fetchAgents()
        }, [])

        const data = [percentActive, percentInactive]
        const chartColors = ['#16ae03', '#ae1a03']
        const pieData = data.map((value, index) => ({
            value: parseFloat(value.toFixed(0)),
            color: chartColors[index % chartColors.length],
        }))
        .filter(item => item.value > 0)
        .map((item, index) => ({
            value: item.value,
            key: `${index}-${item.value}`,
            svg: {
            fill: item.color,
            },
        }));

        const Label = ({ slices }) => {
        return slices.map((slice, index) => {
            const { pieCentroid, data } = slice;
            return (
            <SvgText
                key={`label-${index}`}
                x={pieCentroid[0]}
                y={pieCentroid[1]}
                fill="white"
                textAnchor={'middle'}
                alignmentBaseline={'middle'}
                fontSize={12}
            >
                {data.value}%
            </SvgText>
            );
        });
        };
    

  return (
    <ScrollView keyboardShouldPersistTaps="handled"
        contentContainerStyle={styles.scrollContainer}
    >
        <View style={{ justifyContent: 'center' }}>
            <PieChart style={{ height: 150 }} data={pieData}>
                <Label/>
            </PieChart>
        </View>
        <AgentsLegend/>
    <View style={styles.usersList}>
        <Text style={globalStyles.orangeText}>Agentes Ativos</Text>
        {agents.map((agent) => (
            <AgentCard key={agent.id} agent={agent} onDelete={handleDelete}/>
        ))}
    </View>
    </ScrollView>
  );
};

type AgentCardProps = {
    agent: Agent;
    onDelete: (id: string) => void;
}

const AgentCard: React.FC<AgentCardProps> = ({ agent, onDelete }) => (
    <View style={styles.userContainer}>
        <Text style={styles.userName}>{agent.name}</Text>
        <TouchableOpacity style={styles.userDetailButton}
            onPress={() => onDelete(agent.id)}
        >
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
