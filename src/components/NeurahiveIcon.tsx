import React from "react"
import { Image } from "react-native"
import globalStyles from "../app/styles/globalStyles"

export function NeurahiveIcon() {
    return (
        <Image
            source={require("../assets/images/neurahive-icon.png")}
            style={globalStyles.neuhiveIcon}
        />
    )
}
