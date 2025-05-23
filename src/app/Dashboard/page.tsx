import React, { useEffect, useState } from 'react';
import { Image, StyleSheet, View, Text, TouchableOpacity } from "react-native"
import { HomeActionButton, HomeActionButtonKeys } from "@/types/HomeActionButton"
import { DashboardButton, DashboardButtonKeys } from "@/types/DashboardButton"
import { Role } from "@/enum/Role"
import WithRole from '@/components/WithRole';
import globalStyles from "../styles/globalStyles"
import { router } from "expo-router"
import { User } from '@/types/User';
import { Statistic } from '@/types/Statistic';
import { getErrorMessage } from '@/utils/getErrorMessage';
import { useAxios } from '@/contexts/axiosContext';

const DashboardPage: React.FC = () => {
    const [statistics, setStatistics] = useState<Statistic[]>([])
    const [error, setError] = useState<string | null>(null)
    const [loading, setLoading] = useState<boolean>(false)
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


        const actionButtons: DashboardButton[] = [
            {
                [DashboardButtonKeys.ID]: "1",
                [DashboardButtonKeys.TITLE]: "Usuários",
                [DashboardButtonKeys.ROUTE]: "/Dashboard/Users/page",
                [DashboardButtonKeys.TOTAL]: statistics.total_users,
                [DashboardButtonKeys.ALLOWED_ROLES]: [Role.ADMIN]
            },
            {
                [DashboardButtonKeys.ID]: "2",
                [DashboardButtonKeys.TITLE]: "Agentes",
                [DashboardButtonKeys.ROUTE]: "/Dashboard/Agents/page",
                [DashboardButtonKeys.TOTAL]: statistics.total_agents,
                [DashboardButtonKeys.ALLOWED_ROLES]: [Role.ADMIN]
            },
            {
                [DashboardButtonKeys.ID]: "3",
                [DashboardButtonKeys.TITLE]: "Conversas",
                [DashboardButtonKeys.ROUTE]: "/Dashboard/Chats/page",
                [DashboardButtonKeys.TOTAL]: statistics.total_conversations,
                [DashboardButtonKeys.ALLOWED_ROLES]: [Role.ADMIN]
            },
            {
                [DashboardButtonKeys.ID]: "4",
                [DashboardButtonKeys.TITLE]: "Mensagens",
                [DashboardButtonKeys.ROUTE]: "/Dashboard/Agents/page",
                [DashboardButtonKeys.TOTAL]: statistics.total_messages,
                [DashboardButtonKeys.ALLOWED_ROLES]: [Role.ADMIN]
            },
        ]
  return (
    <View style={styles.actionButtonsContainer}>
      {actionButtons.map((button) => (
        <WithRole
            allowedRoles={button[DashboardButtonKeys.ALLOWED_ROLES]}
            key={button[DashboardButtonKeys.ID]}
        >
            <ActionButton
                title={button[DashboardButtonKeys.TITLE]}
                total={button[DashboardButtonKeys.TOTAL]}
                onPress={() =>
                    router.push(button[DashboardButtonKeys.ROUTE] as any)
                }
                testID={button[DashboardButtonKeys.TEST_ID]}
            />
        </WithRole>
    ))}
    </View>
  );
};

const ActionButton: React.FC<{
    title: string
    total: number
    onPress: () => void
    testID?: string
}> = ({ title, total, onPress, testID }) => (
    <TouchableOpacity style={styles.actionButton} onPress={onPress} testID={testID}>
        <Text style={styles.actionText}>{title}</Text>
        <Text style={styles.totalText}>{total}</Text>
    </TouchableOpacity>
)
const styles = StyleSheet.create({
    actionButtonsContainer: {
        display: "flex",
        flexDirection: "row",
        flexWrap: "wrap",
        padding: 10,
        gap: 10
        
    },
    logoutButton: {
        position: "absolute",
        top: 10,
        right: 20,
        padding: 10,
        backgroundColor: "red",
        borderRadius: 5,
    },
    flexColumn: {
        flexDirection: "column",
        alignItems: "center",
    },
    grayText: {
        color: "#8A8888",
    },
    scrollContainer: {
        paddingBottom: 30,
    },
    headerContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        padding: 20,
        position: "relative",
    },
    headerTextContainer: {
        flex: 1,
    },
    greetingText: {
        color: "#8A8888",
        fontSize: 16,
        marginBottom: 10,
    },
    welcomeContainer: {
        flexDirection: "row",
        alignItems: "center",
        flexWrap: "wrap",
    },
    welcomeText: {
        color: "#8A8888",
        marginLeft: 8,
    },
    apicultoraImage: {
        width: 100,
        height: 150,
        resizeMode: "contain",
        marginLeft: 10,
    },
    titleContainer: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
        padding: 20,
    },
    versionText: {
        textAlign: "center",
        color: "#8A8888",
        fontSize: 12,
        marginVertical: 5,
    },
    divider: {
        height: 9,
        backgroundColor: "#FC801F",
        marginVertical: 10,
    },
    actionsSection: {
        padding: 20,
    },
    sectionTitle: {
        ...globalStyles.orangeText,
        marginBottom: 20,
        fontSize: 18,
    },
    actionsGrid: {
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "space-between",
        gap: 5,
    },
    actionButton: {
        width: "48%",
        backgroundColor: "white",
        borderRadius: 10,
        padding: 25,
        alignItems: "center",
        justifyContent: "center",
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    actionIcon: {
        width: 40,
        height: 40,
        marginBottom: 10,
    },
    actionText: {
        textAlign: "center",
        fontSize: 20,
        color: "#333",
    },
    totalText: {
        textAlign: "center",
        fontSize: 20,
        color: "#FF7700",
    },
})

export default DashboardPage;
function setLoading(arg0: boolean) {
    throw new Error('Function not implemented.');
}

