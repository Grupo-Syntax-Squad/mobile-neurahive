import globalStyles from "@/app/styles/globalStyles"
import { Alert, StyleSheet, Text, TouchableOpacity, View } from "react-native"
import * as DocumentPicker from "expo-document-picker"
import { Feather } from "@expo/vector-icons"
import { useAxios } from "@/contexts/axiosContext"
import { useState } from "react"

interface Props {
    onPress?: () => void
    selectedFile?: DocumentPicker.DocumentPickerAsset
    setSelectedFile: (selectedFile: DocumentPicker.DocumentPickerAsset | undefined) => void
}

export const DocumentSelect = ({ selectedFile, setSelectedFile, ...rest }: Props) => {
    const { get } = useAxios()
    const [filenameAvailable, setFilenameAvailable] = useState<boolean>(true)

    const handlePickDocument = async () => {
        try {
            const result = await DocumentPicker.getDocumentAsync({
                type: ["text/comma-separated-values", "text/csv", "text/plain"],
                multiple: false,
                copyToCacheDirectory: true,
            })

            if (result.assets) {
                setSelectedFile(result.assets[0])
                checkFilename(result.assets[0]?.name)
            }
        } catch (error) {
            console.log("erro:", error)
            Alert.alert("Carregar documento", "Erro ao carregar documento")
        }
    }

    const checkFilename = async (filename: string) => {
        get(`/knowledge-base/filenameAvailable`, {
            params: {
                filename: filename
            }
        }).then(response => {
            setFilenameAvailable(response.data)
        }).catch(err => {
            console.log(err)
        })
    }

    return (
        <TouchableOpacity style={styles.container} {...rest} onPress={handlePickDocument}>
            <>
                {selectedFile && (
                    <View style={styles.uploadedFileContainer}>
                        <Feather
                            name={filenameAvailable ? "check-circle" : "x-circle"}
                            size={16}
                            color={filenameAvailable ? styles.success.color : styles.error.color}
                        />
                        { filenameAvailable ? 
                            <Text style={[styles.uploadedFileText, styles.success]}>
                                Arquivo carregado: {selectedFile?.name}                          
                            </Text> : 
                            <Text style={[styles.uploadedFileText, styles.error]}>
                                Este nome de arquivo já está sendo usado.        
                            </Text>
                        }                        
                    </View>
                )}
                <Text style={globalStyles.textMuted}>
                    Carregue o arquivo de temas e respostas
                </Text>
                <Text style={globalStyles.orangeText}>Formatos válidos: .csv .txt</Text>
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
        fontWeight: "bold",
        fontSize: 14,
    },
    success: {
        color: "#4CAF50",
    },
    error: {
        color: "#d32f2f"
    }
})
