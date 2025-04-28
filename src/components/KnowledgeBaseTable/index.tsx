import { useEffect, useState } from "react"
import { StyleSheet, View } from "react-native"
import Row, { RowProps, RowPropsKeys } from "./Row"

interface Props {
    questions: string[]
    answers: string[]
}

export default function KnowledgeBaseTable({ questions, answers }: Props) {
    const [rows, setRows] = useState<RowProps[]>([])

    useEffect(() => {
        formatData()
    }, [])

    const formatData = () => {
        let formattedData: RowProps[] = []
        questions.forEach((question) =>
            formattedData.push({ question: question, answer: answers[getQuestionIndex(question)] })
        )
        setRows(formattedData)
    }

    const getQuestionIndex = (question: string): number => {
        return questions.indexOf(question)
    }

    return (
        <View style={styles.table}>
            <Row question="Pergunta" answer="Resposta" isHeader />
            {rows.map((row) => {
                return (
                    <Row
                        key={`${row[RowPropsKeys.QUESTION]}_${row[RowPropsKeys.ANSWER]}`}
                        question={row[RowPropsKeys.QUESTION]}
                        answer={row[RowPropsKeys.ANSWER]}
                    />
                )
            })}
        </View>
    )
}

const styles = StyleSheet.create({
    table: {
        width: "100%",
        display: "flex",
        flexDirection: "column",
        borderColor: "black",
        borderWidth: 2,
    },
})
