import globalStyles from "@/app/styles/globalStyles"
import React from "react"
import { TextInput, StyleSheet, View, Text } from "react-native"

interface CustomInputProps {
    placeholder: string
    value: string
    onChangeText: (text: string) => void
    [key: string]: any
    error?: string
}

export default function CustomInput({
    placeholder,
    value,
    onChangeText,
    error,
    ...props
}: CustomInputProps) {
    return (
        <View style={styles.margin}>
            <TextInput
                style={styles.input}
                placeholder={placeholder}
                value={value}
                onChangeText={onChangeText}
                {...props}
            />
            {error && <Text style={globalStyles.textError}>{error}</Text>}
        </View>
    )
}

const styles = StyleSheet.create({
    input: {
        width: "100%",
        minHeight: 50,
        backgroundColor: "#fff",
        borderRadius: 10,
        paddingHorizontal: 15,
        borderWidth: 1,
        borderColor: "#ccc",
    },
    margin: {
        marginBottom: 15,
    },
})
