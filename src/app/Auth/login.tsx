import React, { useState } from "react"
import {
    View,
    Text,
    TextInput,
    StyleSheet,
    KeyboardAvoidingView,
    Platform,
    Alert,
} from "react-native"
import { useRouter } from "expo-router"
import OrangeButton from "@/components/orangeButton"
import { NeurahiveIcon } from "@/components/NeurahiveIcon"
import globalStyles from "../styles/globalStyles"
import * as SecureStore from "expo-secure-store"
import { useAuth } from "@/contexts/authContext"
import { useAxios } from "@/contexts/axiosContext"

const Login = () => {
    const router = useRouter()
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const { login } = useAuth()
    const { post } = useAxios()

    const handleLogin = async () => {
        try {
            const response = await post("/auth/login", { email, password })
            const token = response.data.access_token
            await SecureStore.setItem("jwt_token", token)
            login(token)
        } catch (error: any) {
            Alert.alert("Erro ao logar", String(error))
        }
        router.replace("/")
    }

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={styles.container}
        >
            <View style={styles.content}>
                <View style={styles.logoContainer}>
                    <NeurahiveIcon />
                </View>

                <Text style={styles.title}>Faça login em sua conta</Text>

                <View style={styles.formContainer}>
                    <Text style={globalStyles.formLabel}>E-mail</Text>
                    <TextInput
                        style={globalStyles.input}
                        placeholder="Insira seu endereço de e-mail"
                        keyboardType="email-address"
                        autoCapitalize="none"
                        value={email}
                        onChangeText={setEmail}
                    />

                    <Text style={globalStyles.formLabel}>Senha</Text>
                    <TextInput
                        style={globalStyles.input}
                        placeholder="Insira sua senha"
                        secureTextEntry
                        value={password}
                        onChangeText={setPassword}
                    />

                    <OrangeButton title={"Entrar"} onPress={handleLogin} />
                </View>
            </View>
        </KeyboardAvoidingView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#f5f5f5",
        justifyContent: "center",
    },
    content: {
        paddingHorizontal: 24,
    },
    logoContainer: {
        alignItems: "center",
        marginBottom: 32,
    },
    title: {
        ...globalStyles.textCenter,
        fontSize: 20,
        fontWeight: "600",
        marginBottom: 24,
        color: "#333",
    },
    formContainer: {
        width: "100%",
    },
    loginButton: {
        marginTop: 16,
        marginBottom: 24,
    },
    registerContainer: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
    },
    registerText: {
        color: "#666",
    },
    registerLink: {
        ...globalStyles.orangeText,
        fontWeight: "600",
    },
})

export default Login
