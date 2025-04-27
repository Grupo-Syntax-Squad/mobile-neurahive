import { globalStyles } from "@/app/styles/globalStyles"
import { useState } from "react"
import { Alert, StyleSheet, Text, TouchableOpacity, View } from "react-native"
import * as DocumentPicker from "expo-document-picker"
import { UploadingOverlay } from "./UploadingOverlay"
import { Feather } from '@expo/vector-icons'
import { UploadedFile } from "@/types/UploadedFile"
import { useAuth } from "@/context/authContext"
import * as FileSystem from 'expo-file-system';

interface Props {
    onPress?: () => void
    uploadedFile?: UploadedFile
    setUploadedFile?: (uploadedFile: UploadedFile | undefined) => void
}

export const DocumentSelect = ({ uploadedFile, setUploadedFile, ...rest }: Props) => {
    const [uploading, setUploading] = useState<boolean>(false)
    
    const { token } = useAuth()

    const handlePickDocument = async () => {
        if(uploading) return
        try {
            const result = await DocumentPicker.getDocumentAsync({
                type: ["text/comma-separated-values", "text/csv", "text/plain"],
                multiple: false,
                copyToCacheDirectory: true,
            })
            
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
        try{
            setUploading(true)    
            const response = await FileSystem.uploadAsync(
                `${process.env.EXPO_PUBLIC_API_URL}/knowledge-base`,
                file.uri, {
                    fieldName: 'file',
                    httpMethod: 'POST',
                    uploadType: FileSystem.FileSystemUploadType.MULTIPART,
                    headers: {
                        "Authorization": `Bearer ${token}`
                    },
                    parameters: {
                        "name": file.name
                    }
                }
            )
            const json = JSON.parse(response.body)
            setUploadedFile?.(json)
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
