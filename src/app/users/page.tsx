import { StyleSheet, Image, Text, View, TouchableOpacity, ScrollView } from "react-native"
import { Link, useRouter } from "expo-router"
import React, { useEffect, useState } from "react"
import ProtectedRoute from "@/components/ProtectedRoute"
import { Role } from "@/enum/Role"
import { useAxios } from "@/contexts/axiosContext"
import globalStyles from "../styles/globalStyles"
import { User } from "@/types/User"
import { Division } from "@/components/Division"
import { getErrorMessage } from "@/utils/getErrorMessage"

enum ActionButtonKeys {
    LABEL = "label",
    ON_PRESS = "onPress",
    TEST_ID = "testID",
}

interface ActionButton {
    [ActionButtonKeys.LABEL]: string
    [ActionButtonKeys.ON_PRESS]: () => void
    [ActionButtonKeys.TEST_ID]: string
}

export function Users() {
    const router = useRouter()
    const [users, setUsers] = useState<User[]>([])
    const [, setLoading] = useState(true)
    const [, setError] = useState<string | null>(null)
    const { get } = useAxios()

    const enableUsers = users.filter((user) => user.enabled);

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

    const actionButtons: ActionButton[] = [
        // TODO: Verify if this pages will be used
        // {
        //     [ActionButtonKeys.LABEL]: "Acessos",
        //     [ActionButtonKeys.ON_PRESS]: () => router.push("/accesses/page"),
        //     [ActionButtonKeys.TEST_ID]: "accesses-button",
        // },
        {
            [ActionButtonKeys.LABEL]: "Criar novo usuário",
            [ActionButtonKeys.ON_PRESS]: () => router.push("/users/create"),
            [ActionButtonKeys.TEST_ID]: "create-user-button",
        },
        // {
        //     [ActionButtonKeys.LABEL]: "Permissões dos Usuários",
        //     [ActionButtonKeys.ON_PRESS]: () => router.push("/permissions/page"),
        //     [ActionButtonKeys.TEST_ID]: "permissions-button",
        // },
    ]

    return (
        <ProtectedRoute allowedRoles={[Role.ADMIN]}>
            <Division />
            <ScrollView
                keyboardShouldPersistTaps="handled"
                contentContainerStyle={styles.scrollContainer}
            >
                <View style={globalStyles.header}>
                    <Text>Seus Usuários</Text>
                    <Image source={require("../../assets/images/usuarios.png")}></Image>
                </View>

                <View style={styles.actionsContainer}>
                    {actionButtons.map((button, index) => (
                        <TouchableOpacity
                            key={index}
                            style={globalStyles.orangeButton}
                            onPress={button[ActionButtonKeys.ON_PRESS]}
                            testID={button[ActionButtonKeys.TEST_ID]}
                        >
                            <Text style={globalStyles.WhiteText}>
                                {button[ActionButtonKeys.LABEL]}
                            </Text>
                        </TouchableOpacity>
                    ))}
                </View>

                <View style={styles.usersList}>
                    {enableUsers.map((user) => (
                        <UserCard key={user.id} user={user} />
                    ))}
                </View>
            </ScrollView>
        </ProtectedRoute>
    )
}

const UserCard: React.FC<{ user: User }> = ({ user }) => (
    <View style={styles.userContainer}>
        <Text style={styles.userName}>{user.name}</Text>
        <Text style={styles.userEmail}>{user.email}</Text>
        <TouchableOpacity style={styles.userDetailButton}>
            <Link href={{ pathname: "/users/[id]", params: { id: user.id } }}>
                <Text style={globalStyles.WhiteText}>Detalhes</Text>
            </Link>
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
        borderRadius: 8,
        padding: 16,
        borderWidth: 1,
        borderColor: "#e0e0e0",
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
        backgroundColor: "#FC801F",
        padding: 10,
        borderRadius: 6,
        alignSelf: "flex-start",
        minWidth: 100,
        alignItems: "center",
    },
})

export default Users
