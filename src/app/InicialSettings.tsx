import { Image, StyleSheet, View, Text, ScrollView, TouchableOpacity, Switch } from "react-native"
import React from "react"
import { NavigationProp, useNavigation } from "@react-navigation/native"
import { RootStackParamList } from "./navigation/types"
import CustomInput from "@/components/CustomInput"
import { useState } from "react"
import Checkbox from "expo-checkbox"
import globalStyles from "./styles/globalStyles"

export default function InicialSettings() {
    const [acesso, setAcesso] = useState("")
    const [clearChats, setClearChats] = useState({
        week: false,
        month: false,
    })
    const [backup, setBackup] = useState({
        weekly: false,
        monthly: false,
    })
    const [knowledgeBase, setKnowledgeBase] = useState(false)
    const [isEnabled, setIsEnabled] = useState(false)

    const toggleSwitch = () => setIsEnabled((previousState) => !previousState)

    const navigation = useNavigation<NavigationProp<RootStackParamList>>()

    return (
        <ScrollView keyboardShouldPersistTaps="handled" contentContainerStyle={styles.container}>
            <View style={styles.content}>
                <Text style={styles.title}>
                    Olá Usuário, vamos configurar o sistema antes de prosseguir?
                </Text>

                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Acesso</Text>
                    <CustomInput
                        placeholder="Digite o nome do acesso"
                        value={acesso}
                        onChangeText={setAcesso}
                    />
                    <Text style={styles.description}>
                        O Acesso será utilizado para definir a área de atuação dos agentes e as
                        permissões para acessá-los, você poderá criar novos acessos posteriormente.
                    </Text>
                </View>

                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Chat e Iterações</Text>
                    <View style={styles.sectionSwitch}>
                        <Text style={styles.subtitle}>Limpar conversas inativas?</Text>
                        <Switch value={isChatEnabled} onValueChange={toggleChatSwitch} />
                    </View>
                    <View style={styles.checkboxContainer}>
                        <Checkbox
                            style={styles.checkbox}
                            value={clearChats.week}
                            onValueChange={(value) => setClearChats({ ...clearChats, week: value })}
                            color={clearChats.week ? "#4630EB" : undefined}
                        />
                        <Text style={styles.checkboxLabel}>após 1 semana</Text>
                    </View>
                    <View style={styles.checkboxContainer}>
                        <Checkbox
                            style={styles.checkbox}
                            value={clearChats.month}
                            onValueChange={(value) =>
                                setClearChats({ ...clearChats, month: value })
                            }
                            color={clearChats.month ? "#4630EB" : undefined}
                        />
                        <Text style={styles.checkboxLabel}>após 1 mês</Text>
                    </View>
                </View>

                {/* Seção Backup */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Backup</Text>
                    <View style={styles.sectionSwitch}>
                        <Text style={styles.subtitle}>Fazer um backup dos chats?</Text>
                        <Switch value={isEnabled} onValueChange={toggleSwitch} />
                    </View>
                    <View style={styles.checkboxContainer}>
                        <Checkbox
                            style={styles.checkbox}
                            value={backup.weekly}
                            onValueChange={(value) => setBackup({ ...backup, weekly: value })}
                            color={backup.weekly ? "#4630EB" : undefined}
                        />
                        <Text style={styles.checkboxLabel}>semanalmente</Text>
                    </View>
                    <View style={styles.checkboxContainer}>
                        <Checkbox
                            style={styles.checkbox}
                            value={backup.monthly}
                            onValueChange={(value) => setBackup({ ...backup, monthly: value })}
                            color={backup.monthly ? "#4630EB" : undefined}
                        />
                        <Text style={styles.checkboxLabel}>mensalmente</Text>
                    </View>
                </View>

                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Base de conhecimento</Text>
                    <View style={styles.checkboxContainer}>
                        <Text style={styles.checkboxLabel}>
                            Carregue o arquivo de temas e respostas
                        </Text>
                    </View>
                    <Text style={styles.fileInfo}>formatos válidos: tls.csv</Text>
                    <Text style={styles.description}>
                        A Base de conhecimento é de onde estas agentes irão se basear para fornecer
                        respostas para os usuários, carregue uma base válida para continuar, você
                        poderá carregar novas posteriormente.
                    </Text>
                </View>

                <TouchableOpacity style={[globalStyles.orangeButton, styles.saveButton]}>
                    <Text style={globalStyles.WhiteText}>Salvar e Prosseguir</Text>
                </TouchableOpacity>

                <View style={styles.footer}>
                    <Text style={styles.footerText}>
                        Início | Agentes | Usuários | Questores | Perfil
                    </Text>
                </View>
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    sectionSwitch: {
        display: "flex",
        flexDirection: "row",
    },
    container: {
        flexGrow: 1,
        backgroundColor: "#fff",
        paddingHorizontal: 20,
    },
    content: {
        paddingVertical: 20,
    },
    title: {
        fontSize: 18,
        fontWeight: "bold",
        marginBottom: 30,
        textAlign: "center",
    },
    section: {
        marginBottom: 30,
    },
    sectionTitle: {
        fontSize: 16,
        fontWeight: "bold",
        marginBottom: 10,
    },
    subtitle: {
        fontSize: 14,
        marginBottom: 10,
    },
    description: {
        fontSize: 12,
        color: "#666",
        marginTop: 10,
        lineHeight: 18,
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
    fileInfo: {
        fontSize: 12,
        color: "#666",
        marginLeft: 30,
        marginBottom: 10,
    },
    saveButton: {
        marginTop: 20,
        alignSelf: "center",
        width: "100%",
        maxWidth: 200,
    },
    footer: {
        marginTop: 40,
        borderTopWidth: 1,
        borderTopColor: "#eee",
        paddingTop: 15,
    },
    footerText: {
        textAlign: "center",
        color: "#666",
    },
})
