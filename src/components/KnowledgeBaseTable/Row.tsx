import { StyleSheet, View } from "react-native"
import Column from "./Column"

export interface RowProps {
    [RowPropsKeys.QUESTION]: string
    [RowPropsKeys.ANSWER]: string
    [RowPropsKeys.IS_HEADER]?: boolean
}

export enum RowPropsKeys {
    QUESTION = "question",
    ANSWER = "answer",
    IS_HEADER = "isHeader",
}

export default function Row({ question, answer, isHeader }: RowProps) {
    return (
        <View style={styles.row}>
            <Column content={question} isHeader={isHeader} isFirst />
            <Column content={answer} isHeader={isHeader} />
        </View>
    )
}

const styles = StyleSheet.create({
    row: {
        display: "flex",
        flexDirection: "row",
        width: "100%",
        borderBottomColor: "black",
        borderBottomWidth: 2,
    },
})
