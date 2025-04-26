import { StyleSheet, Text } from "react-native"

import React from "react"
import { Image } from "react-native"
import { globalStyles } from "../app/styles/globalStyles"

export function NeurahiveIcon() {
    return (
        <Image
            source={require("../assets/images/neurahive-icon.png")}
            style={globalStyles.neuhiveIcon}
        />
    )
}

const styles = StyleSheet.create({
    notasContainer: {
        backgroundColor: "#E1E3E5",
        display: "flex",
        color: "#444444",
        fontWeight: "bold",
        flexDirection: "row",
        alignItems: "center",
        padding: 20,
    },
    grayText: {
        color: "#8A8888",
        fontWeight: "bold",
    },
    orangeText: {
        color: "#FF9500",
        fontWeight: "bold",
    },
})
