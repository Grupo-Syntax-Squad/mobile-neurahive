import { Link, useRouter } from "expo-router"
import {
    StyleSheet,
    View,
    Text,
    TouchableOpacity,
} from "react-native"
import { globalStyles } from "../styles/globalStyles"
import { MaterialIcons } from '@expo/vector-icons'; 
import React from "react";
import { Division } from '@/components/Division';

export default function NewChat() {
    const router = useRouter()

    return (
        <View>
            <Division/>
            <View style={styles.container}>
                <TouchableOpacity
                    style={[globalStyles.agentBox, styles.buttonContainer]}
                    onPress={() => router.push({ pathname: "/Chat/selectAgent" })}
                >
                    <Text style={styles.buttonText}>Novo Chat</Text>
                    <MaterialIcons name="add" size={24} color="orange" />
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    buttonContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 10,
        paddingVertical: 15,
        borderRadius: 10,
    },
    buttonText: {
        color: 'gray',
        fontSize: 18,
        fontWeight: 'bold',
    }
})