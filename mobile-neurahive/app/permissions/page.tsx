import { StyleSheet, Text, TextInput, View, TouchableOpacity, ScrollView } from 'react-native';
import Checkbox from 'expo-checkbox';
import React, { useState } from 'react';
import { Link } from 'expo-router';
import { globalStyles } from "../styles/globalStyles";

export default function Permissions() {
    const [permissionTitle, setPermissionTitle] = useState("");
    const [selectedAccesses, setSelectedAccesses] = useState<string[]>([]);
    
    const accesses = [
        "Recursos Humanos",
        "Estoque",
        "Gerência",
        "Administrativo",
        "Laboratório",
        "SAC",
        "Financeiro",
        "Comercial",
        "Manutenção"
    ];

    const toggleAccess = (access: string) => {
        if (selectedAccesses.includes(access)) {
            setSelectedAccesses(selectedAccesses.filter(item => item !== access));
        } else {
            setSelectedAccesses([...selectedAccesses, access]);
        }
    };

    return (
        <ScrollView 
            keyboardShouldPersistTaps="handled"
            contentContainerStyle={styles.scrollContainer}
        >
            <Text style={globalStyles.orangeText}>Título</Text>
            <TextInput
                style={globalStyles.input}
                placeholder="Digite o título da permissão"
                value={permissionTitle}
                onChangeText={setPermissionTitle}
                autoCapitalize="none"
            />

            <View style={styles.accessSection}>
                <Text style={globalStyles.orangeText}>Selecione os acessos da permissão</Text>
                <Text style={styles.selectedText}>Selecionados: {selectedAccesses.length}</Text>
            </View>

            <View style={styles.accessList}>
                {accesses.map((access, index) => (
                    <View key={index} style={styles.accessItem}>
                        <Checkbox
                            value={selectedAccesses.includes(access)}
                            onValueChange={() => toggleAccess(access)}
                            color={selectedAccesses.includes(access) ? '#4630EB' : undefined}
                        />
                        <Text style={styles.accessText}>{access}</Text>
                    </View>
                ))}
            </View>

            <TouchableOpacity style={[globalStyles.orangeButton, styles.createButton]}>
                <Text style={globalStyles.WhiteText}>Criar Permissão</Text>
            </TouchableOpacity>
        </ScrollView>
    );
}
const styles = StyleSheet.create({
    boxTitle: {
        fontWeight: 'bold',
        marginBottom: 5,
    },
    boxText: {
        marginBottom: 10,
    },
    divider: {
        height: 1,
        backgroundColor: '#ccc',
        marginVertical: 20,
    },
    accessSection: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 15,
    },
    selectedText: {
        color: '#666',
    },
    accessList: {
        marginBottom: 20,
    },
    accessItem: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
    },
    accessText: {
        marginLeft: 10,
    },
    createButton: {
        marginTop: 20,
        marginBottom: 40,
    },
    scrollContainer: {
        padding: 20,
    },
});