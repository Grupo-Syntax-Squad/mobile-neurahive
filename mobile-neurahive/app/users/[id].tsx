import React, { useState } from "react"
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
} from "react-native"
import { useRouter } from "expo-router"
import { Picker } from "@react-native-picker/picker"
import CustomInput from "../../components/CustomInput"
import { globalStyles } from "../styles/globalStyles"

const FormField: React.FC<{ label: string; children: React.ReactNode }> = ({
    label,
    children,
}) => (
    <View style={styles.formField}>
        <Text style={globalStyles.orangeText}>{label}</Text>
        {children}
    </View>
)

type UserData = {
    name: string
    email: string
    permission: string
    status: boolean
    createdAt: string
    updatedAt: string
}

const UserForm: React.FC = () => {
    const router = useRouter()

    const [user, setUser] = useState<UserData>({
        name: "Thiago",
        email: "thiago@email.com",
        permission: "Escolha uma permissão",
        status: false,
        createdAt: "12/12/2024",
        updatedAt: "12/12/2024",
    })

    const [password, setPassword] = useState("")
    const [passwordConfirmation, setPasswordConfirmation] = useState("")

    const toggleStatus = () =>
        setUser((prev) => ({ ...prev, status: !prev.status }))

    const handleSave = () => {
        Alert.alert("Usuário salvo com sucesso!")
    }

    const handleCancel = () => {
        router.back()
    }

    const permissionOptions = [
        "Recursos Humanos",
        "Administrativo",
        "Financeiro",
    ]

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={{ flex: 1 }}
        >
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
                            user.status
                                ? styles.activeStatus
                                : styles.inactiveStatus,
                        ]}
                    >
                        {user.status ? "Ativo" : "Inativo"}
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

                <FormField label="Permissão do Usuário">
                    <Picker
                        selectedValue={user.permission}
                        onValueChange={(itemValue) =>
                            setUser((prev) => ({
                                ...prev,
                                permission: itemValue,
                            }))
                        }
                        style={styles.picker}
                    >
                        {permissionOptions.map((option, index) => (
                            <Picker.Item
                                key={index}
                                label={option}
                                value={option}
                            />
                        ))}
                    </Picker>
                </FormField>

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
                    <Switch value={user.status} onValueChange={toggleStatus} />
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
                        <Text style={styles.cancelButtonText}>Cancelar</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </KeyboardAvoidingView>
    )
}

const styles = StyleSheet.create({
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
    formField: {
        marginBottom: 15,
        width: "100%",
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

export default UserForm
