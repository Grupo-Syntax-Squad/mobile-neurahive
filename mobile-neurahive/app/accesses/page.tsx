import {
    StyleSheet,
    Text,
    TextInput,
    View,
    TouchableOpacity,
    ScrollView,
} from "react-native"
import React, { useState } from "react"
import { globalStyles } from "../styles/globalStyles"

export default function Accesses() {
    const [accessTitle, setAccessTitle] = useState("")
    const [showMore, setShowMore] = useState(false)

    const accessData = [
        { name: "Recursos Humanos", permissions: 4, agents: 4 },
        { name: "Financeiro", permissions: 2, agents: 2 },
        { name: "Administrativo", permissions: 10, agents: 7 },
        { name: "Comercial", permissions: 5, agents: 3 },
        { name: "Estoque", permissions: 15, agents: 1 },
        { name: "Laboratório", permissions: 2, agents: 1 },
    ]

    const visibleAccesses = showMore ? accessData : accessData.slice(0, 4)

    const handleCreateAccess = () => {
        console.log("Novo acesso criado:", accessTitle)
    }

    return (
        <ScrollView
            keyboardShouldPersistTaps="handled"
            contentContainerStyle={styles.scrollContainer}
        >
            <View style={styles.section}>
                <Text style={globalStyles.orangeText}>Título</Text>
                <TextInput
                    style={globalStyles.input}
                    placeholder="Digite o título do acesso"
                    value={accessTitle}
                    onChangeText={setAccessTitle}
                    autoCapitalize="none"
                />
            </View>

            <TouchableOpacity
                style={[globalStyles.orangeButton, styles.createButton]}
                onPress={handleCreateAccess}
            >
                <Text style={globalStyles.WhiteText}>Criar acesso</Text>
            </TouchableOpacity>

            <View style={styles.divider} />

            <View style={styles.accessHeader}>
                <Text style={globalStyles.orangeText}>Seus acessos</Text>
                <TouchableOpacity onPress={() => setShowMore(!showMore)}>
                    <Text style={styles.showMoreText}>
                        {showMore ? "Mostrar menos" : "Exibir mais"}
                    </Text>
                </TouchableOpacity>
            </View>

            <View style={styles.accessList}>
                {visibleAccesses.map((access, index) => (
                    <View
                        key={index}
                        style={[
                            globalStyles.accessBox,
                            access.permissions === 0 && styles.specialAccessBox,
                        ]}
                    >
                        <Text style={styles.accessName}>{access.name}</Text>
                        {access.permissions > 0 ? (
                            <>
                                <Text style={styles.permissionsDetail}>
                                    Permissões: {access.permissions}
                                </Text>
                                <Text style={styles.agentsDetail}>
                                    Agentes: {access.agents}
                                </Text>
                            </>
                        ) : null}
                    </View>
                ))}
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    scrollContainer: {
        padding: 20,
    },
    section: {
        marginBottom: 20,
    },
    divider: {
        height: 1,
        backgroundColor: "#ccc",
        marginVertical: 20,
    },
    createButton: {
        marginBottom: 20,
    },
    accessHeader: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 15,
    },
    showMoreText: {
        color: globalStyles.orangeText.color,
        textDecorationLine: "underline",
    },
    accessList: {
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "space-between",
    },
    accessName: {
        fontWeight: "bold",
        marginBottom: 5,
    },
    permissionsDetail: {
        color: "#fff",
        fontSize: 14,
        marginBottom: 3,
        backgroundColor: "#FF9500",
        padding: 5,
        borderRadius: 5,
    },
    agentsDetail: {
        color: "#fff",
        fontSize: 14,
        marginBottom: 3,
        backgroundColor: "#474B52",
        padding: 5,
        borderRadius: 5,
    },
    specialAccessBox: {
        borderStyle: "dashed",
        borderColor: "#999",
        alignItems: "center",
        justifyContent: "center",
    },
})
