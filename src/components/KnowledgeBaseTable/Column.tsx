import { StyleSheet, Text, View } from "react-native"

interface ColumnProps {
    content: string
    isHeader?: boolean
    isFirst?: boolean
}

export default function Column({ content, isHeader, isFirst }: ColumnProps) {
    return (
        <View style={[styles.column, isFirst && styles.firstColumn]}>
            <Text style={isHeader ? styles.header : null}>{content}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    column: {
        width: 180,
        padding: 2,
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
    },
    firstColumn: {
        borderRightColor: "black",
        borderRightWidth: 2,
    },
    header: { fontWeight: "bold" },
})
