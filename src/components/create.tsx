import {
    StyleSheet,
    Image,
    Platform,
    Text,
    TextInput,
    Button,
    View,
    TouchableOpacity,
} from "react-native"

import React from "react"
import { Link } from "expo-router"

export default function Create() {
    return (
        <View>
            <Text>Chegou aqui</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    middleButton: {
        flexDirection: "column",
        width: 100,
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
        backgroundColor: "white",
        padding: 10,
        borderRadius: 10,
    },
    userDetail: {
        backgroundColor: "#FC801F",
        padding: 10,
        margin: 10,
        borderRadius: 5,
        width: 100,
    },
    headerImage: {
        color: "#808080",
        bottom: -90,
        left: -35,
        position: "absolute",
    },
    inputContainer: {
        padding: 10,
        margin: 1,
    },
    titleContainer: {
        flexDirection: "row",
        gap: 8,
    },
    header: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
    },
    input: {
        padding: 10,
        borderWidth: 1,
    },
    borderEmail: {
        borderRadius: 10,
        borderColor: "orange",
        borderWidth: 2,
        height: 30,
        padding: 1,
    },
})
