import { globalStyles } from "@/app/styles/globalStyles"
import { useState } from "react"
import { Alert, StyleSheet, Text, TouchableOpacity, View } from "react-native"
import * as DocumentPicker from "expo-document-picker"
import { useAxios } from "@/context/axiosContext"
import { UploadingOverlay } from "./UploadingOverlay"
import { Feather } from '@expo/vector-icons'
import { UploadedFile } from "@/types/UploadedFile"

interface Props {
    onPress?: () => void
    setKnowledgeBase?: (knowledgeBase: number | null) => void
    uploadedFile?: UploadedFile
    setUploadedFile?: (uploadedFile: UploadedFile | undefined) => void
}

export const DocumentSelect = ({ uploadedFile, setUploadedFile, setKnowledgeBase, ...rest }: Props) => {
    const [uploading, setUploading] = useState<boolean>(false)
    
    const { post } = useAxios()

    const handlePickDocument = async () => {
        if(uploading) return
        try {
            const result = await DocumentPicker.getDocumentAsync({
                type: ["text/comma-separated-values", "text/csv", "text/plain"],
                multiple: false,
                copyToCacheDirectory: true,
            })
            console.log(result)
            
            if (result.assets) {
                const file = result.assets[0]
                uploadDocument(file)
            }
        } catch (error) {
            console.log('erro:', error)
            Alert.alert("Carregar documento", "Erro ao carregar documento")
        } finally {
            setUploading(false)
        }
    }

    const uploadDocument = async (file: DocumentPicker.DocumentPickerAsset) => {

        const fileType = file.mimeType === "text/comma-separated-values" ?  "text/csv" : file.mimeType

        const fileBlob = {
            uri: file.uri,
            name: file.name,
            type: fileType,
        }

        const formData = new FormData()
        formData.append("file", fileBlob as any)

        try{
            setUploading(true)
            const response = await post('/knowledge-base', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            })
            console.log(response)
            setUploadedFile?.(response.data)
        } catch (err) {
            console.log("Erro na requisição:", err)
        } finally {
            setUploading(false)
        }
    }

    return (
        <TouchableOpacity style={styles.container} {...rest} onPress={handlePickDocument}>
            {   uploading ? 
                    <UploadingOverlay visible={uploading} />
                : <>
                    { uploadedFile &&
                        <View style={styles.uploadedFileContainer}>
                            <Feather name="check-circle" size={16} color="#4CAF50" />
                            <Text style={styles.uploadedFileText}>Arquivo enviado: {uploadedFile?.name}</Text>
                        </View>
                    }
                    <Text style={globalStyles.textMuted}>
                        Carregue o arquivo de temas e respostas
                    </Text>
                    {/* Ícone upload */}
                    <Text style={globalStyles.orangeText}>
                        formatos válidos .csv .txt
                    </Text>
                </>
            }
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
        flexDirection: 'row',
        alignItems: 'center',
        gap: 6,
        marginTop: 8,
      },
      uploadedFileText: {
        color: '#4CAF50',
        fontWeight: 'bold',
        fontSize: 14,
      },
})
