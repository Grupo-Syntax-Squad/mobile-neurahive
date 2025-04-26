import { globalStyles } from "@/app/styles/globalStyles"
import { GestureResponderEvent, StyleSheet, Text, View } from "react-native"

interface Props {
    onTouchStart?: ((event: GestureResponderEvent) => void) | undefined
}

export const DocumentSelect = ({ ...rest }: Props) => {
    return (
        <View style={styles.container} {...rest}>
            <Text style={globalStyles.textMuted}>Carregue o arquivo de temas e respostas</Text>
            {/* Ícone upload */}
            <Text style={globalStyles.orangeText}>formatos válidos .xls .csv</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        borderRadius: 20,
        borderWidth: 4,
        borderColor: "#8A8888",
        borderStyle: "dashed",
        width: "100%",
        height: 300,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        gap: 30,
        marginBottom: 10,
    },
})
