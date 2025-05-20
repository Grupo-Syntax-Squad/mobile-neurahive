import React, { useEffect, useState } from "react"
import {
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    Switch,
    Alert,
    Image,
    ScrollView
} from "react-native"
import { useLocalSearchParams, useRouter } from "expo-router"
import CustomInput from "../../components/CustomInput"
import globalStyles from "../styles/globalStyles"
import { Picker } from "@react-native-picker/picker"
import { useAxios } from "@/contexts/axiosContext"
import { KnowledgeBase } from "@/interfaces/Services/KnowledgeBase"
import { DocumentSelect } from "@/components/DocumentSelect"
import { getErrorMessage } from "@/utils/getErrorMessage"
import * as FileSystem from "expo-file-system"
import * as DocumentPicker from "expo-document-picker"
import { useAuth } from "@/contexts/authContext"
import Slider from "@react-native-community/slider"

type AgentData = {
    name: string
    theme: string
    behavior: string
    temperature: number
    top_p: number
    knowledge_base_id?: number | null
}

export default function Agent() {
    const [selectedImage, setSelectedImage] = useState<number | null>(null)
    const { token } = useAuth()
    const router = useRouter()

    const images = [
        require("../../assets/images/agente1.png"),
        require("../../assets/images/agente2.png"),
        require("../../assets/images/agente3.png"),
        require("../../assets/images/agente4.png"),
        require("../../assets/images/agente5.png"),
        require("../../assets/images/agente6.png"),
    ]

    const handleSelectImage = (index: number) => {
        setSelectedImage(index)
    }
    const { id } = useLocalSearchParams()
    const { get, put } = useAxios()

    //const [isEnabled, setIsEnabled] = useState<boolean>()
    const [selectedFile, setSelectedFile] = useState<DocumentPicker.DocumentPickerAsset>()
    const [useExistingKnowledge, setUseExistingKnowledge] = useState<boolean>(true)
    const [knowledgeBases, setKnowledgebases] = useState<KnowledgeBase[]>([])
    const [agentData, setAgentData] = useState<AgentData>({
        name: "",
        theme: "",
        behavior: "",
        temperature: 0.5,
        top_p: 0.5,
        knowledge_base_id: null
    })

    //const toggleSwitch = () => setIsEnabled((previousState) => !previousState)
    const toggleUseExistingKnowledge = () => {
        setUseExistingKnowledge(!useExistingKnowledge)
    }

    const fetchAgent = async () => {
        const response = await get(`/agents/${id}`)
        setAgentData(response.data)
        console.log(response.data.image_id)
        setSelectedImage(response.data.image_id)
    }
    const fetchKnowledgeBases = async () => {
        const response = await get(`/knowledge-base`)
        setKnowledgebases(response.data)
    }

    const handleSave = async () => {
        if(selectedFile && !useExistingKnowledge) {
            saveWithFile(selectedFile)
        } else {
            saveWithoutFile()
        }
    }

    const saveWithFile = async (file: DocumentPicker.DocumentPickerAsset) => {
        try {   
            const response = await FileSystem.uploadAsync(
                `${process.env.EXPO_PUBLIC_API_URL}/agents/${id}`,
                file.uri,
                {
                    fieldName: "file",
                    httpMethod: "PUT",
                    uploadType: FileSystem.FileSystemUploadType.MULTIPART,
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                    parameters: {
                        knowledge_base_name: file.name,
                        name: agentData.name,
                        theme: agentData.theme,
                        behavior: agentData.behavior,
                        temperature: String(agentData.temperature),
                        top_p: String(agentData.top_p),
                        image_id: String(selectedImage)
                    },
                }
            )
            const json = JSON.parse(response.body)
            Alert.alert("Sucesso", json.message)
            router.replace("/Agents/page")
        } catch (err) {
            console.log("Erro na requisição:", err)
        }
    }

    const saveWithoutFile = async () => {
        try {
            const formData = new FormData()
            formData.append('name', agentData.name)
            formData.append('theme', agentData.theme)
            formData.append('behavior', agentData.behavior)
            formData.append('temperature', String(agentData.temperature))
            formData.append('top_p', String(agentData.top_p))
            formData.append('image_id', String(selectedImage))
            agentData.knowledge_base_id ? formData.append('knowledge_base_id', String(agentData.knowledge_base_id)) : null            

            console.log(formData)

            const response = await put(`/agents/${id}`, formData, {
                headers: {
                    "Content-Type": 'multipart/form-data'
                }
            })
            Alert.alert("Sucesso", response.data.message)
        } catch (error) {
            console.log(error)
            console.log(`Erro ao cadastrar agente: ${getErrorMessage(error)}`)
            Alert.alert("Cadastrar agente", 'Erro ao cadastrar agente')
        } finally {
            router.replace("/Agents/page")
        }
    }

    const handleCancel = () => {
        router.back()
    }

    useEffect(() => {
        fetchAgent()
        fetchKnowledgeBases()
    }, [])

    return (
        <ScrollView style={styles.scrollContainer}>
            <View style={styles.imagesContainer}>
                {images.map((img, index) => (
                    <TouchableOpacity
                        key={index}
                        onPress={() => handleSelectImage(index)}
                        style={[
                            styles.imageWrapper,
                            selectedImage === index && styles.selectedImage,
                        ]}
                    >
                        <Image source={img} style={styles.agentImage} />
                    </TouchableOpacity>
                ))}
            </View>
            <Text style={[globalStyles.orangeText, styles.inputText]}>Nome</Text>
            <CustomInput
                placeholder="Nome"
                value={agentData.name}
                onChangeText={(text) => setAgentData((prev) => ({ ...prev, name: text }))}
            />
            <Text style={[globalStyles.orangeText, styles.inputText]}>Tema</Text>
            <CustomInput
                placeholder="Tema"
                value={agentData.theme}
                onChangeText={(text) => setAgentData((prev) => ({ ...prev, theme: text }))}
            />
            <Text style={[globalStyles.orangeText, styles.inputText]}>Comportamento <Text style={globalStyles.textMuted}>(Opcional)</Text></Text>
            <CustomInput
                placeholder="Comportamento"
                value={agentData.behavior}
                multiline
                numberOfLines={3}
                onChangeText={(text) => setAgentData((prev) => ({ ...prev, behavior: text }))}
            />
            <Text style={[globalStyles.orangeText, styles.inputText]}>Base de conhecimento</Text>
            <View style={[globalStyles.flexRow, styles.gap_10, styles.align_center]}>
                <Text>Utilizar base de conhecimento já existente?</Text>
                <Switch
                    value={useExistingKnowledge}
                    onValueChange={toggleUseExistingKnowledge}
                    thumbColor="#FF9500"
                    trackColor={{ true: "#FF9500", false: "#aaa" }}
                />
            </View>
            {!useExistingKnowledge && (
                <DocumentSelect selectedFile={selectedFile} setSelectedFile={setSelectedFile} />
            )}
            {useExistingKnowledge && (
                <Picker
                    style={styles.input}
                    selectedValue={agentData.knowledge_base_id}
                    onValueChange={(value: any) => {
                        const selectedValue = value === 'none' ? undefined : value
                        setAgentData((prev) => ({ ...prev, knowledge_base_id: selectedValue }))
                    }}
                >
                    <Picker.Item label="Selecione a base de conhecimento" value={'none'} />
                    {knowledgeBases.map((knowledgeBase) => (
                        <Picker.Item
                            key={knowledgeBase.id}
                            label={knowledgeBase.name}
                            value={knowledgeBase.id}
                        />
                    ))}
                </Picker>
            )}
            <Text style={[globalStyles.orangeText, styles.inputText]}>Temperature: {agentData.temperature.toFixed(1)}</Text>
            <Text style={styles.sliderTip}>
                Controla a criatividade da resposta. Valores baixos geram respostas mais conservadoras, altos geram mais variedade.
            </Text>
            <Slider
                style={styles.slider}
                minimumValue={0.1}
                maximumValue={1}
                step={0.1}
                value={agentData.temperature}
                onSlidingComplete={(value) => setAgentData((prev) => ({ ...prev, temperature: value }))}
                minimumTrackTintColor="#FF7F50"
                maximumTrackTintColor="#000000"
                thumbTintColor="#FF7F50"
            />
            <Text style={[globalStyles.orangeText, styles.inputText]}>Top-p: {agentData.top_p.toFixed(1)}</Text>
            <Text style={styles.sliderTip}>
                Controla a diversidade das palavras usadas. Valores baixos geram respostas mais focadas, altos geram respostas mais diversas.
            </Text>
            <Slider
                style={styles.slider}
                minimumValue={0.1}
                maximumValue={1}
                step={0.1}
                value={agentData.top_p}
                onSlidingComplete={(value) => setAgentData((prev) => ({ ...prev, top_p: value }))}
                minimumTrackTintColor="#FF7F50"
                maximumTrackTintColor="#000000"
                thumbTintColor="#FF7F50"
            />
            {/* <View style={globalStyles.flexRow}>
                <Text style={globalStyles.orangeText}>Status</Text>
                <Switch value={isEnabled} onValueChange={toggleSwitch} />
            </View> */}
            <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
                <Text style={styles.saveButtonText}>Salvar</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.cancelButton} onPress={handleCancel}>
                <Text style={styles.cancelButtonText}>Cancelar</Text>
            </TouchableOpacity>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    scrollContainer: {
        flexGrow: 1,
        padding: 20
    },
    inputText: {
        fontWeight: "bold",
        fontSize: 18,
    },
    imagesContainer: {
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "center",
        marginBottom: 20,
    },
    imageWrapper: {
        margin: 5,
        borderWidth: 2,
        borderColor: "transparent",
        borderRadius: 10,
        overflow: "hidden",
    },
    selectedImage: {
        borderColor: "#FFA500",
    },
    agentImage: {
        width: 80,
        height: 80,
        borderRadius: 10,
    },
    selectImageText: {
        color: "#FFA500",
        fontSize: 18,
        marginBottom: 10,
        fontWeight: "bold",
        textAlign: "center",
    },
    DetailContainer: {
        backgroundColor: "gray",
        padding: 5,
        borderRadius: 5,
        color: "white",
    },
    userStatus: {
        backgroundColor: "green",
        padding: 5,
        borderRadius: 5,
        color: "white",
    },
    userDetail: {
        flexDirection: "row",
        gap: 3,
        justifyContent: "space-around",
        marginBottom: 20,
    },
    input: {
        width: "100%",
        height: 50,
        backgroundColor: "#fff",
        borderRadius: 10,
        paddingHorizontal: 15,
        marginBottom: 15,
        borderWidth: 1,
        borderColor: "#ccc",
    },
    saveButton: {
        width: "100%",
        height: 50,
        backgroundColor: "#28a745",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 10,
        marginTop: 10,
        marginBottom: 10,
    },
    cancelButton: {
        width: "100%",
        height: 50,
        backgroundColor: "#dc3545",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 10,
    },
    saveButtonText: {
        color: "#fff",
        fontSize: 18,
        fontWeight: "bold",
    },
    cancelButtonText: {
        color: "#fff",
        fontSize: 18,
        fontWeight: "bold",
    },
    gap_10: {
        gap: 10,
    },
    align_center: {
        alignItems: "center",
    },
    slider: {
        width: "100%",
        height: 40,
    },
    sliderTip: {
        fontSize: 12,
        fontStyle: "italic",
        color: "#666",
        padding: 5
    },
})
