import React from 'react';
import { Image, StyleSheet, View, Text, TouchableOpacity } from "react-native"
import { HomeActionButton, HomeActionButtonKeys } from "@/types/HomeActionButton"
import { Role } from "@/enum/Role"
import WithRole from '@/components/WithRole';
import globalStyles from "../styles/globalStyles"
import { router } from "expo-router"

const DashboardPage: React.FC = () => {
    const actionButtons: HomeActionButton[] = [
            {
                [HomeActionButtonKeys.ID]: "1",
                [HomeActionButtonKeys.TITLE]: "Usuários",
                [HomeActionButtonKeys.ICON]: require("../../assets/images/user-icon.png"),
                [HomeActionButtonKeys.ROUTE]: "/Dashboard/Users/page",
                [HomeActionButtonKeys.TEST_ID]: "users-button",
                [HomeActionButtonKeys.ALLOWED_ROLES]: [Role.ADMIN],
            },
            {
                [HomeActionButtonKeys.ID]: "2",
                [HomeActionButtonKeys.TITLE]: "Agentes",
                [HomeActionButtonKeys.ICON]: require("../../assets/images/user-icon.png"),
                [HomeActionButtonKeys.ROUTE]: "/Dashboard/Agents/page",
                [HomeActionButtonKeys.TEST_ID]: "users-button",
                [HomeActionButtonKeys.ALLOWED_ROLES]: [Role.ADMIN],
            },
    ]
  return (
    <View style={styles.actionButtonsContainer}>
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
  );
};

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
    actionButtonsContainer: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-around",
        padding: 10,
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

export default DashboardPage;
