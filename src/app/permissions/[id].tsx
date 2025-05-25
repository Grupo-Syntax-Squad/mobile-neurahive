import { StyleSheet, Text, TextInput, View, TouchableOpacity, ScrollView } from "react-native"
import Checkbox from "expo-checkbox"
import React, { useState } from "react"

import globalStyles from "../styles/globalStyles"

export default function Permission() {
    const [isChecked, setChecked] = useState(false)
    
    return (
        <ScrollView
            keyboardShouldPersistTaps="handled"
            contentContainerStyle={styles.scrollContainer}
        >

            <View style={styles.accessSection}>
                <Text style={globalStyles.orangeText}>Selecione as permissões do usuário</Text>
                <Text style={styles.selectedText}>Selecionados: {selectedAccesses.length}</Text>
            </View>

            <View style={styles.accessList}>
                {accesses.map((access, index) => (
                    <View key={index} style={styles.accessItem}>
                        <Checkbox
                            value={selectedAccesses.includes(access)}
                            onValueChange={() => toggleAccess(access)}
                            color={selectedAccesses.includes(access) ? "#4630EB" : undefined}
                        />
                        <Text style={styles.accessText}>{access}</Text>
                    </View>
                ))}
            </View>

            <TouchableOpacity style={styles.saveButton}>
                <Text style={{ color: "#fff" }}>Salvar</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.cancelButton}>
                <Text style={{ color: "#FC801F" }}>Cancelar</Text>
            </TouchableOpacity>
        </ScrollView>
    )
}
const styles = StyleSheet.create({
    boxTitle: {
        fontWeight: "bold",
        marginBottom: 5,
    },
    boxText: {
        marginBottom: 10,
    },
    divider: {
        height: 1,
        backgroundColor: "#ccc",
        marginVertical: 20,
    },
    accessSection: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 15,
    },
    selectedText: {
        color: "#666",
    },
    accessList: {
        marginBottom: 20,
    },
    accessItem: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 10,
    },
    accessText: {
        marginLeft: 10,
    },
    createButton: {
        marginTop: 20,
        marginBottom: 40,
    },
    saveButton: {
        backgroundColor: "#FC801F",
        paddingVertical: 12,
        borderRadius: 8,
        alignItems: "center",
        marginBottom: 10,
    },
    scrollContainer: {
        padding: 20,
    },
    cancelButton: {
        backgroundColor: "#fff",
        paddingVertical: 12,
        borderRadius: 8,
        alignItems: "center",
        borderWidth: 1,
        borderColor: "#FC801F",
        marginBottom: 10,
    },
})
