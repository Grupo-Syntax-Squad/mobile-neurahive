import { Image, StyleSheet, View, Text, ScrollView, TouchableOpacity } from "react-native"
import React, { useEffect } from "react"
import { router } from "expo-router"
import globalStyles from "./styles/globalStyles"
import { NewsSection } from "@/components/NewsSection"
import { ConfigurationAlert } from "@/components/ConfigurationAlert"
import { useAuth } from "@/contexts/authContext"
import WithRole from "@/components/WithRole"
import { Role } from "@/enum/Role"
import { HomeActionButton, HomeActionButtonKeys } from "@/types/HomeActionButton"
import * as SecureStore from "expo-secure-store"
import { Division } from "@/components/Division"
import { MaterialIcons } from "@expo/vector-icons"

export function HomeScreen() {
    const { logout, isAuthenticated, login } = useAuth()
    console.log(useAuth())
    const actionButtons: HomeActionButton[] = [
        {
            [HomeActionButtonKeys.ID]: "1",
            [HomeActionButtonKeys.TITLE]: "Usuários",
            [HomeActionButtonKeys.ICON]: require("../assets/images/user-icon.png"),
            [HomeActionButtonKeys.ROUTE]: "/users/page",
            [HomeActionButtonKeys.TEST_ID]: "users-button",
            [HomeActionButtonKeys.ALLOWED_ROLES]: [Role.ADMIN],
        },
        {
            [HomeActionButtonKeys.ID]: "2",
            [HomeActionButtonKeys.TITLE]: "Agentes",
            [HomeActionButtonKeys.ICON]: require("../assets/images/user-icon.png"),
            [HomeActionButtonKeys.ROUTE]: "/Agents/page",
            [HomeActionButtonKeys.TEST_ID]: "agents-button",
            [HomeActionButtonKeys.ALLOWED_ROLES]: [Role.ADMIN, Role.CURATOR],
        },
        {
            [HomeActionButtonKeys.ID]: "7",
            [HomeActionButtonKeys.TITLE]: "Bases de conhecimento",
            [HomeActionButtonKeys.ICON]: require("../assets/images/base-de-conhecimento.png"),
            [HomeActionButtonKeys.ROUTE]: "/KnowledgeBase/page",
            [HomeActionButtonKeys.TEST_ID]: "knowledge-bases-button",
            [HomeActionButtonKeys.ALLOWED_ROLES]: [Role.ADMIN],
        },
        {
            [HomeActionButtonKeys.ID]: "3",
            [HomeActionButtonKeys.TITLE]: "Chat",
            [HomeActionButtonKeys.ICON]: require("../assets/images/chat.png"),
            [HomeActionButtonKeys.ROUTE]: "/Chat/page",
            [HomeActionButtonKeys.TEST_ID]: "chat-button",
            [HomeActionButtonKeys.ALLOWED_ROLES]: [Role.ADMIN, Role.CLIENT],
        },
        {
            [HomeActionButtonKeys.ID]: "8",
            [HomeActionButtonKeys.TITLE]: "Dashboard",
            [HomeActionButtonKeys.ICON]: require("../assets/images/dashboard-icon.png"),
            [HomeActionButtonKeys.ROUTE]: "/Dashboard/page",
            [HomeActionButtonKeys.TEST_ID]: "chat-button",
            [HomeActionButtonKeys.ALLOWED_ROLES]: [Role.ADMIN, Role.ADMIN],
        },
        // {
        //     [HomeActionButtonKeys.ID]: "4",
        //     [HomeActionButtonKeys.TITLE]: "Configurações Iniciais",
        //     [HomeActionButtonKeys.ICON]: require("../assets/images/settings.png"),
        //     [HomeActionButtonKeys.ROUTE]: "/InicialSettings",
        //     [HomeActionButtonKeys.TEST_ID]: "settings-button",
        //     [HomeActionButtonKeys.ALLOWED_ROLES]: [Role.ADMIN],
        // },
        // {
        //     [HomeActionButtonKeys.ID]: "5",
        //     [HomeActionButtonKeys.TITLE]: "Permissões",
        //     [HomeActionButtonKeys.ICON]: require("../assets/images/permission-icon.png"),
        //     [HomeActionButtonKeys.ROUTE]: "/permissions/page",
        //     [HomeActionButtonKeys.TEST_ID]: "permissions-button",
        //     [HomeActionButtonKeys.ALLOWED_ROLES]: [Role.ADMIN],
        // },
        // {
        //     [HomeActionButtonKeys.ID]: "6",
        //     [HomeActionButtonKeys.TITLE]: "Acessos",
        //     [HomeActionButtonKeys.ICON]: require("../assets/images/permission-icon.png"),
        //     [HomeActionButtonKeys.ROUTE]: "/accesses/page",
        //     [HomeActionButtonKeys.TEST_ID]: "permissions-button",
        //     [HomeActionButtonKeys.ALLOWED_ROLES]: [Role.ADMIN],
        // },
    ]

    useEffect(() => {
        const verify_token = async () => {
            const token = await SecureStore.getItem("jwt_token")
            if (token) login(token)
            else router.replace("/Auth/login")
        }

        verify_token()
    }, [])

    return (
        <ScrollView
            keyboardShouldPersistTaps="handled"
            contentContainerStyle={styles.scrollContainer}
        >
            <View style={styles.titleContainer}>
                <Text style={styles.grayText}>Olá, Usuário!</Text>
                <Image
                    source={require("../assets/images/apicultora.png")}
                    style={styles.apicultoraImage}
                />
                <View style={styles.flexColumn}>
                    <Image
                        source={require("../assets/images/neurahive-icon.png")}
                        style={globalStyles.neuhiveIcon}
                    />
                    <Text style={styles.grayText}>bem-vindo(a) ao </Text>
                    <Text style={globalStyles.orangeText}>NeuraHive!</Text>
                </View>
            </View>
            <Text>v1.0.0</Text>
            {isAuthenticated ? (
                <TouchableOpacity style={styles.logoutButton} onPress={() => logout()}>
                    <MaterialIcons name="exit-to-app" size={24} color="white" />
                </TouchableOpacity>
            ) : (
                <ActionButton
                    title={"Login"}
                    onPress={() => router.push("/Auth/login")}
                    icon={require("../assets/images/permission-icon.png")}
                />
            )}
            <Division />

            <View style={styles.actionsSection}>
                <Text style={styles.sectionTitle}>O que você deseja fazer hoje?</Text>
                <View style={styles.actionsGrid}>
                    {actionButtons.map((button) => (
                        <WithRole
                            allowedRoles={button[HomeActionButtonKeys.ALLOWED_ROLES]}
                            key={button[HomeActionButtonKeys.ID]}
                        >
                            <ActionButton
                                title={button[HomeActionButtonKeys.TITLE]}
                                icon={button[HomeActionButtonKeys.ICON]}
                                onPress={() =>
                                    router.push(button[HomeActionButtonKeys.ROUTE] as any)
                                }
                                testID={button[HomeActionButtonKeys.TEST_ID]}
                            />
                        </WithRole>
                    ))}
                </View>
            </View>

            <ConfigurationAlert />
            <NewsSection />
        </ScrollView>
    )
}

const ActionButton: React.FC<{
    title: string
    icon: any
    onPress: () => void
    testID?: string
}> = ({ title, icon, onPress, testID }) => (
    <TouchableOpacity style={styles.actionButton} onPress={onPress} testID={testID}>
        <Image source={icon} style={styles.actionIcon} />
        <Text style={styles.actionText}>{title}</Text>
    </TouchableOpacity>
)

const styles = StyleSheet.create({
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
        padding: 15,
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
        fontSize: 14,
        color: "#333",
    },
})

export default HomeScreen
