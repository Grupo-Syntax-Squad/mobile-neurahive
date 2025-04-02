import React, { useState } from "react"
import {
    View,
    Text,
    TextInput,
    StyleSheet,
    KeyboardAvoidingView,
    Platform,
    TouchableOpacity,
    Alert,
} from "react-native"
import { Link } from "expo-router"
import OrangeButton from "@/components/orangeButton"
import { NeurahiveIcon } from "@/components/NeurahiveIcon"
import { globalStyles } from "../styles/globalStyles"
import Checkbox from "expo-checkbox"

const RegisterScreen = () => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        passwordConfirmation: "",
    })
    const [errors, setErrors] = useState({
        name: "",
        email: "",
        password: "",
        passwordConfirmation: "",
    })
    const [acceptTermos, setacceptTermos] = useState({
        accept: false,
    })

    const handleChange = (name: string, value: string) => {
        setFormData((prev) => ({ ...prev, [name]: value }))
        if (errors[name as keyof typeof errors]) {
            setErrors((prev) => ({ ...prev, [name]: "" }))
        }
    }

    const validateForm = () => {
        let valid = true
        const newErrors = { ...errors }

        if (!formData.name.trim()) {
            newErrors.name = "Nome é obrigatório"
            valid = false
        }

        if (!formData.email.trim()) {
            newErrors.email = "Email é obrigatório"
            valid = false
        } else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
            newErrors.email = "Email inválido"
            valid = false
        }

        if (!formData.password) {
            newErrors.password = "Senha é obrigatória"
            valid = false
        } else if (formData.password.length < 6) {
            newErrors.password = "Senha deve ter pelo menos 6 caracteres"
            valid = false
        }

        if (formData.password !== formData.passwordConfirmation) {
            newErrors.passwordConfirmation = "As senhas não coincidem"
            valid = false
        }

        setErrors(newErrors)
        return valid
    }

    const handleRegister = () => {
        if (validateForm()) {
            Alert.alert("Cadastro realizado com sucesso!")
        }
    }

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={styles.container}
        >
            <View style={styles.content}>
                {/* Logo */}
                <View style={styles.logoContainer}>
                    <NeurahiveIcon />
                </View>

                {/* Título */}
                <Text style={styles.title}>Insira alguns dados básicos:</Text>

                {/* Formulário */}
                <View style={styles.form}>
                    <Text style={globalStyles.formLabel}>Nome</Text>
                    <TextInput
                        style={[styles.input, errors.name && styles.inputError]}
                        placeholder="Nome"
                        value={formData.name}
                        onChangeText={(text) => handleChange("name", text)}
                    />
                    {errors.name ? (
                        <Text style={styles.errorText}>{errors.name}</Text>
                    ) : null}
                    <Text style={globalStyles.formLabel}>E-mail</Text>
                    <TextInput
                        style={[
                            styles.input,
                            errors.email && styles.inputError,
                        ]}
                        placeholder="Email"
                        keyboardType="email-address"
                        autoCapitalize="none"
                        value={formData.email}
                        onChangeText={(text) => handleChange("email", text)}
                    />
                    {errors.email ? (
                        <Text style={styles.errorText}>{errors.email}</Text>
                    ) : null}
                    <Text style={globalStyles.formLabel}>Senha</Text>
                    <TextInput
                        style={[
                            styles.input,
                            errors.password && styles.inputError,
                        ]}
                        placeholder="Senha"
                        secureTextEntry
                        value={formData.password}
                        onChangeText={(text) => handleChange("password", text)}
                    />
                    {errors.password ? (
                        <Text style={styles.errorText}>{errors.password}</Text>
                    ) : null}
                    <Text style={globalStyles.formLabel}>Confirme a Senha</Text>
                    <TextInput
                        style={[
                            styles.input,
                            errors.passwordConfirmation && styles.inputError,
                        ]}
                        placeholder="Repita a Senha"
                        secureTextEntry
                        value={formData.passwordConfirmation}
                        onChangeText={(text) =>
                            handleChange("passwordConfirmation", text)
                        }
                    />
                    {errors.passwordConfirmation ? (
                        <Text style={styles.errorText}>
                            {errors.passwordConfirmation}
                        </Text>
                    ) : null}
                </View>

                <View style={globalStyles.flexRow}>
                    <Checkbox
                        style={styles.checkbox}
                        value={acceptTermos.accept}
                        onValueChange={(value) =>
                        setacceptTermos({ ...acceptTermos, accept: value })}
                        color={acceptTermos.accept ? "#4630EB" : undefined}
                    />
                    <Text>Eu concordo com os <Link href="/Terms/page" style={styles.link}>Termos de Uso</Link></Text>
                </View>

                {/* Botão de Cadastro */}
                <View style={styles.registerButton}>
                    <OrangeButton
                        title="Cadastre-se"
                        onPress={handleRegister}
                    />
                </View>

                {/* Link para Login */}
                <View style={styles.loginContainer}>
                    <Text style={styles.loginText}>Já possui uma conta? </Text>
                    <Link href="/Auth/login" asChild>
                        <TouchableOpacity>
                            <Text style={styles.loginLink}>Faça Login</Text>
                        </TouchableOpacity>
                    </Link>
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
    checkbox: {
        width: 20,
        height: 20,
        borderWidth: 1,
        borderColor: "#000",
        borderRadius: 4,
        marginRight: 10,
    },
    link: {
        color: 'blue'
    },
    title: {
        fontSize: 20,
        fontWeight: "600",
        marginBottom: 24,
        color: "#333",
        textAlign: "center",
    },
    form: {
        width: "100%",
        marginBottom: 16,
    },
    input: {
        width: "100%",
        height: 50,
        backgroundColor: "#fff",
        borderRadius: 10,
        paddingHorizontal: 15,
        marginBottom: 8,
        borderWidth: 1,
        borderColor: "#ccc",
    },
    inputError: {
        borderColor: "#dc3545",
    },
    errorText: {
        color: "#dc3545",
        fontSize: 12,
        marginBottom: 12,
        marginTop: -4,
    },
    registerButton: {
        marginTop: 8,
        marginBottom: 24,
    },
    loginContainer: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
    },
    loginText: {
        color: "#666",
    },
    loginLink: {
        color: "#FC801F",
        fontWeight: "600",
    },
})

export default RegisterScreen
