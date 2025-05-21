import { StyleSheet, Text, View, TouchableOpacity, ScrollView } from "react-native"
import { Link, useRouter } from "expo-router"
import React, { useEffect, useState } from "react"
import { useAxios } from "@/contexts/axiosContext"
import globalStyles from "../../styles/globalStyles"
import { User } from "@/types/User"
import { getErrorMessage } from "@/utils/getErrorMessage"
import Entypo from '@expo/vector-icons/Entypo'
import { PieChart } from 'react-native-svg-charts'
import { Text as SvgText} from 'react-native-svg'
import axios from "axios"


export function ManageUsers() {
    const router = useRouter()
    const [users, setUsers] = useState<User[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)
    const [statistics, setStatistics] = useState<Statistic[]>([])
    const { get } = useAxios()

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
    
        useEffect(() => {
            fetchStatistics()
        }, [])

    const data = [30, 10]
    const chartColors = ['#16ae03', '#ae1a03']
    const  pieData = data.map((value, index) => ({
        value,
        key: `${index}-${value}`,
        svg: {
            fill: chartColors[index % chartColors.length]
        }
    }));

    const Label = ({ slices }) => {
        return slices.map((slice, index) => {
            const {pieCentroid, data} = slice;
            return (
                <SvgText
                    key={`label-${index}`}
                    x={pieCentroid[0]}
                    y={pieCentroid[1]}
                    fill="white"
                    textAnchor={'middle'}
                    alignmentBaseLine={'middle'}
                    fontSize={12}
                >
                    {data.value}%
                </SvgText>
            )
        })
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
    
        useEffect(() => {
            fetchUsers()
        }, [])
    

  return (
    <ScrollView keyboardShouldPersistTaps="handled"
        contentContainerStyle={styles.scrollContainer}
    >
        <View style={{ justifyContent: 'center' }}>
            <PieChart style={{ height: 150 }} data={pieData}>
                <Label/>
            </PieChart>
        </View>
    <View style={styles.usersList}>
        <Text style={globalStyles.orangeText}>Usuários Ativos</Text>
        {users.map((user) => (
            <UserCard key={user.id} user={user}/>
        ))}
    </View>
    </ScrollView>
  );
};

const UserCard: React.FC<{ user: User}> = ({ user }) => (
    <View style={styles.userContainer}>
        <Text style={styles.userName}>{user.name}</Text>
        <View style={{ flexDirection: "row", gap: 8 }}>
        <TouchableOpacity style={styles.keyButton}>
            <Link href={{ pathname: "/permissions/[id]", params: { id: user.id } }}>
                <Entypo name="key" size={24} color="white" />
            </Link>
        </TouchableOpacity>
        <TouchableOpacity style={styles.trashButton}>
            <Entypo name="trash" size={24} color="white" />
        </TouchableOpacity>
        </View>
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

export default ManageUsers;
