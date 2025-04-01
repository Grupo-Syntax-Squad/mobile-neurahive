import React, { useEffect, useState } from "react"
import {
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    Image,
    Switch,
    ScrollView,
    KeyboardAvoidingView,
    Platform,
    Alert,
    TouchableWithoutFeedback,
    Keyboard,
} from "react-native"
import { useLocalSearchParams, useRouter } from "expo-router"
import CustomInput from "../../components/CustomInput"
import { globalStyles } from "../styles/globalStyles"
import Checkbox from "expo-checkbox"
import { useAxios } from "@/context/axiosContext"
import FormField from "@/components/FormField"
import MultiSelect from "@/components/MultiSelect"
import { Agent } from "@/types/Agent"

type UserData = {
    id: number
    name: string
    email: string
    role: number[]
    enabled: boolean
    createdAt: string
    updatedAt: string
    password: string
    agents: Agent[]
}

const UserDetails: React.FC = () => {
    const router = useRouter()
    const { get, put } = useAxios()
    const { id } = useLocalSearchParams()
    const [isLoading, setIsLoading] = useState(true)

    const [roles, setRoles] = useState({
        admin: false,
        curator: false,
    })
    const [agents, setAgents] = useState<Agent[]>([])
    const[selectedAgents, setSelectedAgents] = useState<number[]>([])

    const [user, setUser] = useState<UserData>({
        id: Number(id),
        name: "",
        email: "",
        role: [],
        enabled: false,
        createdAt: "",
        updatedAt: "",
        password: "",
        agents:[]
    })

    const [password, setPassword] = useState("")
    const [passwordConfirmation, setPasswordConfirmation] = useState("")

    useEffect(() => {
        const fetchAgents = async () => {
            const response = await get("/agents/")
            console.log(response.data)
            setAgents(response.data)
        }
        fetchAgents()
        const fetchUser = async () => {
            try {
                if (id) {
                    const response = await get(`/users/${id}`)
                    setUser(response.data)
                    const userRoles: number[] = response.data.role
                    setRoles({
                        admin: userRoles.includes(1),
                        curator: userRoles.includes(2),
                    })                    
                    setSelectedAgents(user.agents.map(agent => agent.id))
                    setIsLoading(false)
                }
            } catch (error: any) {
                Alert.alert(
                    "Erro",
                    "Não foi possível carregar os dados do usuário"
                )
                console.error(error)
            } finally {
                setIsLoading(false)
            }
        }

        fetchUser()
    }, [id])

    const toggleStatus = () =>
        setUser((prev) => ({ ...prev, enabled: !prev.enabled }))

    const getRoles = () => {
        const selectedRoles: number[] = []
        if (roles.admin) selectedRoles.push(1)
        if (roles.curator) selectedRoles.push(2)
        selectedRoles.push(3)
        return selectedRoles
    }

    const handleSave = async () => {
        if (password !== passwordConfirmation) {
            Alert.alert("Erro", "As senhas não coincidem")
            return
        }

        try {
            console.log(user)
            await put(`/users/`, {
                id: user.id,
                name: user.name,
                email: user.email,
                role: getRoles(),
                password: password,
                agents: selectedAgents
            })
            Alert.alert("Sucesso", "Usuário atualizado com sucesso!")
            router.replace("/users/")
        } catch (error: any) {
            Alert.alert(
                "Erro",
                error.response?.data?.message || "Erro ao salvar usuário"
            )
            console.error(error)
        }
    }

    if (isLoading && id !== "new") {
        return (
            <View style={styles.container}>
                <Text>Carregando...</Text>
            </View>
        )
    }

    const handleCancel = () => {
        router.back()
    }

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={{ flex: 1 }}
        >
            <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
                <ScrollView
                    contentContainerStyle={styles.scrollContainer}
                    keyboardShouldPersistTaps="handled"
                >
                    <View style={styles.avatarSection}>
                        <Text style={globalStyles.textCenter}>{user.name}</Text>
                        <View style={globalStyles.imageContainer}>
                            <Image
                                source={require("../../assets/images/bees-background.png")}
                            />
                        </View>
                    </View>

                    <View style={styles.userMeta}>
                        <Text style={styles.metaItem}>
                            Atualizado em: {user.updatedAt}
                        </Text>
                        <Text style={styles.metaItem}>
                            Criado em: {user.createdAt}
                        </Text>
                        <Text
                            style={[
                                styles.metaItem,
                                user.enabled
                                    ? styles.activeStatus
                                    : styles.inactiveStatus,
                            ]}
                        >
                            {user.enabled ? "Ativo" : "Inativo"}
                        </Text>
                    </View>

                    <FormField label="Nome">
                        <CustomInput
                            placeholder="Nome"
                            value={user.name}
                            onChangeText={(text) =>
                                setUser((prev) => ({ ...prev, name: text }))
                            }
                        />
                    </FormField>

                    <FormField label="E-mail">
                        <CustomInput
                            placeholder="E-mail"
                            keyboardType="email-address"
                            value={user.email}
                            onChangeText={(text) =>
                                setUser((prev) => ({ ...prev, email: text }))
                            }
                        />
                    </FormField>

                    <FormField label="Permissões do Usuário">
                        <View
                            style={[
                                styles.checkboxContainer,
                                styles.marginTop10,
                            ]}
                        >
                            <Checkbox
                                style={styles.checkbox}
                                value={roles.admin}
                                onValueChange={(value) =>
                                    setRoles({ ...roles, admin: value })
                                }
                                color={roles.admin ? "#4630EB" : undefined}
                            />
                            <Text style={styles.checkboxLabel}>
                                Administrador
                            </Text>
                        </View>
                        <View style={styles.checkboxContainer}>
                            <Checkbox
                                style={styles.checkbox}
                                value={roles.curator}
                                onValueChange={(value) =>
                                    setRoles({ ...roles, curator: value })
                                }
                                color={roles.curator ? "#4630EB" : undefined}
                            />
                            <Text style={styles.checkboxLabel}>Curador</Text>
                        </View>
                    </FormField>
                    <Text style={globalStyles.orangeText}>Agentes Permitidos</Text>
                    <ScrollView style={{ flex: 1 }}>
                        <MultiSelect data={agents} selectedItems={selectedAgents} setSelectedItems={setSelectedAgents}></MultiSelect>
                    </ScrollView>

                    <FormField label="Senha">
                        <CustomInput
                            placeholder="Senha"
                            secureTextEntry
                            value={password}
                            onChangeText={setPassword}
                        />
                    </FormField>

                    <FormField label="Repita a Senha">
                        <CustomInput
                            placeholder="Repita a Senha"
                            secureTextEntry
                            value={passwordConfirmation}
                            onChangeText={setPasswordConfirmation}
                        />
                    </FormField>

                    <View style={styles.switchContainer}>
                        <Text style={globalStyles.orangeText}>Status</Text>
                        <Switch
                            value={user.enabled}
                            onValueChange={toggleStatus}
                        />
                    </View>

                    <View style={styles.actionsContainer}>
                        <TouchableOpacity
                            onPress={handleSave}
                            style={styles.saveButton}
                        >
                            <Text style={styles.saveButtonText}>Salvar</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={handleCancel}
                            style={styles.cancelButton}
                        >
                            <Text style={styles.cancelButtonText}>
                                Cancelar
                            </Text>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
            </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#f5f5f5",
        padding: 20,
    },
    checkboxContainer: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 8,
    },
    checkbox: {
        width: 20,
        height: 20,
        borderWidth: 1,
        borderColor: "#000",
        borderRadius: 4,
        marginRight: 10,
    },
    checkboxLabel: {
        fontSize: 14,
    },
    marginTop10: {
        marginTop: 10,
    },
    scrollContainer: {
        padding: 20,
        paddingBottom: 40,
    },
    avatarSection: {
        alignItems: "center",
        marginBottom: 20,
    },
    avatarImage: {
        width: 100,
        height: 100,
        borderRadius: 50,
        marginTop: 10,
    },
    userMeta: {
        flexDirection: "row",
        justifyContent: "space-around",
        marginBottom: 20,
        flexWrap: "wrap",
        gap: 10,
    },
    metaItem: {
        padding: 8,
        borderRadius: 5,
        color: "white",
        backgroundColor: "#6c757d",
    },
    activeStatus: {
        backgroundColor: "#28a745",
    },
    inactiveStatus: {
        backgroundColor: "#dc3545",
    },

    picker: {
        width: "100%",
        height: 50,
        backgroundColor: "#fff",
        borderRadius: 10,
        borderWidth: 1,
        borderColor: "#ccc",
    },
    switchContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 20,
        width: "100%",
    },
    actionsContainer: {
        width: "100%",
        gap: 10,
        marginTop: 10,
    },
    saveButton: {
        width: "100%",
        height: 50,
        backgroundColor: "#28a745",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 10,
    },
    cancelButton: {
        width: "100%",
        height: 50,
        backgroundColor: "#dc3545",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 10,
    },
    saveButtonText: {
        color: "#fff",
        fontSize: 18,
        fontWeight: "bold",
    },
    cancelButtonText: {
        color: "#fff",
        fontSize: 18,
        fontWeight: "bold",
    },
})

export default UserDetails
