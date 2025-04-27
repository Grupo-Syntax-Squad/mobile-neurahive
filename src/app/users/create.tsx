import React, { useEffect, useState } from "react"
import {
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    Image,
    Alert,
    SafeAreaView,
    ScrollView,
} from "react-native"
import CustomInput from "../../components/CustomInput"
import globalStyles from "../styles/globalStyles"
import { router } from "expo-router"
import FormField from "@/components/FormField"
import Checkbox from "expo-checkbox"
import { Agent } from "@/types/Agent"
import { useAxios } from "@/context/axiosContext"
import MultiSelect from "@/components/MultiSelect"

export default function CreateUser() {
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [passwordConfirmation, setPasswordConfirmation] = useState("")
    const [agents, setAgents] = useState<Agent[]>([])
    const { get, post } = useAxios()
    const [selectedAgents, setSelectedAgents] = useState<number[]>([])
    const [roles, setRoles] = useState({
        admin: false,
        curator: false,
    })

    useEffect(() => {
        const fetchAgents = async () => {
            const response = await get("/agents/")
            console.log(response.data)
            setAgents(response.data)
        }
        fetchAgents()
    }, [])

    const getRoles = () => {
        const selectedRoles: number[] = []
        if (roles.admin) selectedRoles.push(1)
        if (roles.curator) selectedRoles.push(2)
        selectedRoles.push(3)
        return selectedRoles
    }

    const handleCreateUser = async () => {
        try {
            const response = await post(`/users`, {
                name: name,
                email: email,
                password: password,
                role: getRoles(),
                selectedAgents,
            })

            Alert.alert("Sucesso", "Usuário criado com sucesso!")
            router.replace("/users/page")
        } catch (error: any) {
            console.log(error)
            Alert.alert(
                "Erro ao criar usuário",
                error.response
                    ? error.response.data.message || error.response.data
                    : "Erro desconhecido"
            )
        }
    }

    return (
        <View style={globalStyles.container}>
            <Text style={globalStyles.textCenter}>Novo Usuário</Text>
            <View style={globalStyles.imageContainer}>
                <Image source={require("../../assets/images/bees-background.png")} />
            </View>
            <Text style={globalStyles.orangeText}>Nome</Text>
            <CustomInput placeholder="Nome" value={name} onChangeText={setName} />
            <Text style={globalStyles.orangeText}>E-mail</Text>
            <CustomInput
                placeholder="E-mail"
                keyboardType="email-address"
                value={email}
                onChangeText={setEmail}
            />
            <FormField label="Permissões do Usuário">
                <View style={[styles.checkboxContainer, styles.marginTop10]}>
                    <Checkbox
                        style={styles.checkbox}
                        value={roles.admin}
                        onValueChange={(value) => setRoles({ ...roles, admin: value })}
                        color={roles.admin ? "#4630EB" : undefined}
                    />
                    <Text style={styles.checkboxLabel}>Administrador</Text>
                </View>
                <View style={styles.checkboxContainer}>
                    <Checkbox
                        style={styles.checkbox}
                        value={roles.curator}
                        onValueChange={(value) => setRoles({ ...roles, curator: value })}
                        color={roles.curator ? "#4630EB" : undefined}
                    />
                    <Text style={styles.checkboxLabel}>Curador</Text>
                </View>
            </FormField>
            <Text style={globalStyles.orangeText}>Agentes Permitidos</Text>
            <ScrollView style={{ flex: 1 }}>
                <MultiSelect
                    data={agents}
                    selectedItems={selectedAgents}
                    setSelectedItems={setSelectedAgents}
                ></MultiSelect>
            </ScrollView>
            <Text style={globalStyles.orangeText}>Senha</Text>
            <CustomInput
                placeholder="Senha"
                secureTextEntry
                value={password}
                onChangeText={setPassword}
            />
            <Text style={globalStyles.orangeText}>Repita a Senha</Text>
            <CustomInput
                placeholder="Repita a Senha"
                secureTextEntry
                value={passwordConfirmation}
                onChangeText={setPasswordConfirmation}
            />
            <TouchableOpacity style={globalStyles.orangeButton} onPress={() => handleCreateUser()}>
                <Text style={globalStyles.WhiteText}>Criar Usuário</Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    title: {
        fontSize: 24,
        fontWeight: "bold",
        marginBottom: 20,
    },
    input: {
        width: "100%",
        height: 50,
        backgroundColor: "#fff",
        borderRadius: 10,
        paddingHorizontal: 15,
        marginBottom: 15,
        borderWidth: 1,
        borderColor: "#ccc",
    },
    button: {
        width: "100%",
        height: 50,
        backgroundColor: "#007bff",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 10,
    },
    buttonText: {
        color: "#fff",
        fontSize: 18,
        fontWeight: "bold",
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
})
