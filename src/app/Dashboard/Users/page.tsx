import { StyleSheet, Text, View, TouchableOpacity, ScrollView, Alert } from "react-native"
import { Link, useRouter } from "expo-router"
import React, { useEffect, useState } from "react"
import { useAxios } from "@/contexts/axiosContext"
import globalStyles from "../../styles/globalStyles"
import { User } from "@/types/User"
import { getErrorMessage } from "@/utils/getErrorMessage"
import Entypo from '@expo/vector-icons/Entypo'
import { PieChart } from 'react-native-svg-charts'
import { Text as SvgText} from 'react-native-svg'
import UsersLegend from "@/components/UsersLegend"

export function ManageUsers() {
    const router = useRouter()
    const [users, setUsers] = useState<User[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)
    const [statistics, setStatistics] = useState<Statistic[]>([])
    const { get, deletar } = useAxios()

    const enableUsers = users.filter((user) => user.enabled);
    const disableUsers = users.filter((user) => !user.enabled);

    const percentActive = users.length ? (enableUsers.length / users.length) * 100 : 0;
    const percentInactive = users.length ? (disableUsers.length / users.length) * 100 : 0;

    const fetchStatistics = async () => {
        try {
            setLoading(true)
            const response = await get(`/statistics/general`)
            setStatistics(response.data)
        } catch (err) {
            setError("Erro ao carregar estatísticas")
            console.error("Erro na requisição:", getErrorMessage(err))
        } finally {
            setLoading(false)
        }
    }

    const fetchUsers = async () => {
        try {
            setLoading(true)
            const response = await get(`/users/`)
            setUsers(response.data)
        } catch (err) {
            setError("Erro ao carregar usuários")
            console.error("Erro na requisição:", getErrorMessage(err))
        } finally {
            setLoading(false)
        }
    }

    const handleDelete = async (userId: number) => {
        try {
            setLoading(true);
            await deletar(`/users/?user_id=${userId}`);
            await fetchUsers();
        } catch (err) {
            console.error("Erro ao deletar:", getErrorMessage(err));
            setError("Erro ao deletar usuário");
        } finally {
            setLoading(false);
        }
    };


    useEffect(() => {
        fetchStatistics()
        fetchUsers()
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
            <UsersLegend/>
            <View style={styles.usersList}>
                <Text style={globalStyles.orangeText}>Usuários Ativos</Text>
                {enableUsers.map((user) => (
                    <UserCard key={user.id} user={user} onDelete={handleDelete} />
                ))}
            </View>
        </ScrollView>
    );
};

type UserCardProps = {
    user: User;
    onDelete: (id: string) => void;
}

const UserCard: React.FC<UserCardProps> = ({ user, onDelete }) => (
    <View style={styles.userContainer}>
        <Text style={styles.userName}>{user.name}</Text>
        <View style={{ flexDirection: "row", gap: 8 }}>
            <TouchableOpacity style={styles.keyButton}>
                <Link href={{ pathname: "/permissions/[id]", params: { id: user.id } }}>
                    <Entypo name="key" size={24} color="white" />
                </Link>
            </TouchableOpacity>
            <TouchableOpacity 
                style={styles.trashButton} 
                onPress={() => onDelete(user.id)}
            >
                <Entypo name="trash" size={24} color="white" />
            </TouchableOpacity>
        </View>
    </View>
)

const styles = StyleSheet.create({
    scrollContainer: {
        padding: 16,
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
    trashButton: {
        backgroundColor: "#ff0000",
        padding: 10,
        borderRadius: 6,
        alignSelf: "flex-start",
        minWidth: 50,
        alignItems: "center",
    },
    keyButton: {
        backgroundColor: "#FF7700",
        padding: 10,
        borderRadius: 6,
        alignSelf: "flex-start",
        minWidth: 50,
        alignItems: "center",
    },
})

export default ManageUsers
