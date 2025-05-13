import globalStyles from "@/app/styles/globalStyles"
import { Alert, StyleSheet, Text, TouchableOpacity, View } from "react-native"
import * as DocumentPicker from "expo-document-picker"
import { Feather } from "@expo/vector-icons"

interface Props {
    onPress?: () => void
    selectedFile?: DocumentPicker.DocumentPickerAsset
    setSelectedFile: (selectedFile: DocumentPicker.DocumentPickerAsset | undefined) => void
}

export const DocumentSelect = ({ selectedFile, setSelectedFile, ...rest }: Props) => {

    const handlePickDocument = async () => {
        try {
            const result = await DocumentPicker.getDocumentAsync({
                type: ["text/comma-separated-values", "text/csv", "text/plain"],
                multiple: false,
                copyToCacheDirectory: true,
            })

            if (result.assets) {
                setSelectedFile(result.assets[0])
            }
        } catch (error) {
            console.log("erro:", error)
            Alert.alert("Carregar documento", "Erro ao carregar documento")
        }
    }

    return (
        <TouchableOpacity style={styles.container} {...rest} onPress={handlePickDocument}>
            <>
                {selectedFile && (
                    <View style={styles.uploadedFileContainer}>
                        <Feather name="check-circle" size={16} color="#4CAF50" />
                        <Text style={styles.uploadedFileText}>
                            Arquivo enviado: {selectedFile?.name}
                        </Text>
                    </View>
                )}
                <Text style={globalStyles.textMuted}>
                    Carregue o arquivo de temas e respostas
                </Text>
                <Text style={globalStyles.orangeText}>formatos válidos .csv .txt</Text>
            </>
        </TouchableOpacity>
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
    uploadedFileContainer: {
        flexDirection: "row",
        alignItems: "center",
        gap: 6,
        marginTop: 8,
    },
    uploadedFileText: {
        color: "#4CAF50",
        fontWeight: "bold",
        fontSize: 14,
    },
})
