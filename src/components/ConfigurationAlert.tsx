import { StyleSheet, Text, View } from "react-native"

import React from "react"
import { Image } from "react-native"

export function ConfigurationAlert() {
    return (
        <View style={styles.ConfigurationAlert}>
            <Text style={styles.grayText}>
                Faça as configurações iniciais para liberar todos os conteúdos
            </Text>
        </View>
    )
}

const styles = StyleSheet.create({
    ConfigurationAlert: {
        padding: 20,
        backgroundColor: "#E1E3E5",
    },
    grayText: {
        color: "#8A8888",
    },
})
