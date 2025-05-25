import {
    Alert,
    StyleSheet,
    Switch,
    Text,
    View,
    ScrollView,
    TouchableOpacity,
    Image,
} from "react-native"
import globalStyles from "../styles/globalStyles"
import CustomInput from "@/components/CustomInput"
import { useEffect, useState } from "react"
import * as FileSystem from "expo-file-system"
import * as DocumentPicker from "expo-document-picker"
import Slider from "@react-native-community/slider"

import { KnowledgeBase, KnowledgeBaseKeys } from "@/interfaces/Services/KnowledgeBase"
import { useAxios } from "@/contexts/axiosContext"
import { router } from "expo-router"
import { Picker } from "@react-native-picker/picker"
import { DocumentSelect } from "@/components/DocumentSelect"
import { getErrorMessage } from "@/utils/getErrorMessage"
import { useAuth } from "@/contexts/authContext"

enum FormKeys {
    NAME = "name",
    THEME = "theme",
    BEHAVIOR = "behavior",
    TEMPERATURE = "temperature",
    TOP_P = "top_p",
    ACCESS = "access",
    EXISTENT_KNOWLEDGE = "existentKnowledge",
    KNOWLEDGE_BASE_NAME = "knowledge_base_name",
    KNOWLEDGE_BASE_URI = "knowledge_base_uri",
    KNOWLEDGE_BASE_ID = "knowledge_base_id",
}

interface Form {
    [FormKeys.NAME]: string
    [FormKeys.THEME]: string
    [FormKeys.BEHAVIOR]: string
    [FormKeys.TEMPERATURE]: number
    [FormKeys.TOP_P]: number
    [FormKeys.ACCESS]?: number
    [FormKeys.EXISTENT_KNOWLEDGE]: boolean
    [FormKeys.KNOWLEDGE_BASE_NAME]?: string
    [FormKeys.KNOWLEDGE_BASE_URI]?: string
    [FormKeys.KNOWLEDGE_BASE_ID]?: number
}

const defaultForm: Form = {
    [FormKeys.NAME]: "",
    [FormKeys.THEME]: "",
    [FormKeys.BEHAVIOR]: "",
    [FormKeys.TEMPERATURE]: 0.5,
    [FormKeys.TOP_P]: 0.5,
    [FormKeys.ACCESS]: undefined,
    [FormKeys.EXISTENT_KNOWLEDGE]: false,
    [FormKeys.KNOWLEDGE_BASE_NAME]: undefined,
    [FormKeys.KNOWLEDGE_BASE_URI]: undefined,
    [FormKeys.KNOWLEDGE_BASE_ID]: undefined,
}

const defaultFormErrors: Record<FormKeys, string> = {
    [FormKeys.ACCESS]: "",
    [FormKeys.EXISTENT_KNOWLEDGE]: "",
    [FormKeys.KNOWLEDGE_BASE_ID]: "",
    [FormKeys.KNOWLEDGE_BASE_NAME]: "",
    [FormKeys.KNOWLEDGE_BASE_URI]: "",
    [FormKeys.NAME]: "",
    [FormKeys.THEME]: "",
    [FormKeys.BEHAVIOR]: "",
    [FormKeys.TEMPERATURE]: "",
    [FormKeys.TOP_P]: "",
}

export default function CreateAgent() {
    const [selectedFile, setSelectedFile] = useState<DocumentPicker.DocumentPickerAsset>()
    const [form, setForm] = useState<Form>(defaultForm)
    const [knowledgeBases, setKnowledgeBases] = useState<KnowledgeBase[]>([])
    const [formErrors, setFormErrors] = useState<Record<FormKeys, string>>(defaultFormErrors)
    const { get, post } = useAxios()
    const { token } = useAuth()

    const [selectedImage, setSelectedImage] = useState<number | null>(null)
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

    const setName = (value: string): void => {
        setForm({ ...form, [FormKeys.NAME]: value })
    }
    const setTheme = (value: string): void => {
        setForm({ ...form, [FormKeys.THEME]: value })
    }
    const setBehavior = (value: string): void => {
        setForm({ ...form, [FormKeys.BEHAVIOR]: value })
    }
    const setTemperature = (value: number): void => {
        setForm({ ...form, [FormKeys.TEMPERATURE]: value })
    }
    const setTopP = (value: number): void => {
        setForm({ ...form, [FormKeys.TOP_P]: value })
    }

    const setExistentKnowledgeBase = (value: boolean): void => {
        setForm({ ...form, [FormKeys.EXISTENT_KNOWLEDGE]: value })
    }

    const setKnowledgeBase = (value: number): void => {
        setForm({ ...form, [FormKeys.KNOWLEDGE_BASE_ID]: value })
    }

    const fetchKnowledgeBases = async () => {
        try {
            const response = await get("/knowledge-base")
            setKnowledgeBases(response.data)
        } catch (err) {
            console.log("Erro ao buscar bases de conhecimento:", getErrorMessage(err))
        }
    }

    useEffect(() => {
        fetchKnowledgeBases()
    }, [form[FormKeys.EXISTENT_KNOWLEDGE]])

    const validateForm = () => {
        let customFormErrors: Partial<Record<FormKeys, string>> = {}
        if (!form[FormKeys.NAME]) customFormErrors[FormKeys.NAME] = "O nome do agente é obrigatório"
        else customFormErrors[FormKeys.NAME] = ""
        setFormErrors({ ...formErrors, ...customFormErrors })
        return customFormErrors
    }

    const submitWithFile = async (file: DocumentPicker.DocumentPickerAsset) => {
        try {
            const response = await FileSystem.uploadAsync(
                `${process.env.EXPO_PUBLIC_API_URL}/agents/`,
                file.uri,
                {
                    fieldName: "file",
                    httpMethod: "POST",
                    uploadType: FileSystem.FileSystemUploadType.MULTIPART,
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                    parameters: {
                        knowledge_base_name: file.name,
                        name: form[FormKeys.NAME],
                        theme: form[FormKeys.THEME],
                        behavior: form[FormKeys.BEHAVIOR],
                        temperature: String(form[FormKeys.TEMPERATURE]),
                        top_p: String(form[FormKeys.TOP_P]),
                        image_id: String(selectedImage),
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

    const handleSubmit = () => {
        if (selectedFile && !form[FormKeys.EXISTENT_KNOWLEDGE]) {
            submitWithFile(selectedFile)
        } else {
            submitWithoutFile()
        }
    }

    const submitWithoutFile = async () => {
        const customFormErrors = validateForm()
        if (Object.values(customFormErrors).some((value) => value !== "")) {
            return
        }

        try {
            const formData = new FormData()
            formData.append("name", form[FormKeys.NAME])
            formData.append("theme", form[FormKeys.THEME])
            formData.append("behavior", form[FormKeys.BEHAVIOR])
            formData.append("temperature", String(form[FormKeys.TEMPERATURE]))
            formData.append("top_p", String(form[FormKeys.TOP_P]))
            formData.append("image_id", String(selectedImage))
            if (form[FormKeys.KNOWLEDGE_BASE_ID]) {
                formData.append("knowledge_base_id", String(form[FormKeys.KNOWLEDGE_BASE_ID]))
            }

            const response = await post("/agents/", formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            })
            Alert.alert("Sucesso", response.data.message)
        } catch (error) {
            Alert.alert("Cadastrar agente", String(error))
        } finally {
            router.replace("/Agents/page")
        }
    }

    return (
        <ScrollView contentContainerStyle={[styles.scrollContainer]}>
            <Text style={styles.selectImageText}>Selecione uma Imagem:</Text>
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
                placeholder="Digite o nome do agente"
                value={form[FormKeys.NAME]}
                onChangeText={setName}
                error={formErrors[FormKeys.NAME]}
            />

            <Text style={[globalStyles.orangeText, styles.inputText]}>Tema</Text>
            <CustomInput
                placeholder="Digite o tema do agente"
                value={form[FormKeys.THEME]}
                onChangeText={setTheme}
                error={formErrors[FormKeys.THEME]}
            />

            <Text style={[globalStyles.orangeText, styles.inputText]}>Base de conhecimento</Text>
            <View style={[globalStyles.flexRow, styles.gap_10, styles.align_center]}>
                <Text>Utilizar base de conhecimento já existente?</Text>
                <Switch
                    value={form[FormKeys.EXISTENT_KNOWLEDGE]}
                    onValueChange={setExistentKnowledgeBase}
                    thumbColor="#FF9500"
                    trackColor={{ true: "#FF9500", false: "#aaa" }}
                />
            </View>
            {!form[FormKeys.EXISTENT_KNOWLEDGE] && (
                <DocumentSelect selectedFile={selectedFile} setSelectedFile={setSelectedFile} />
            )}
            {form[FormKeys.EXISTENT_KNOWLEDGE] && (
                <Picker
                    style={styles.input}
                    selectedValue={form[FormKeys.KNOWLEDGE_BASE_ID]}
                    onValueChange={(value) => setKnowledgeBase(value)}
                >
                    <Picker.Item label="Selecione a base de conhecimento" value={undefined} />
                    {knowledgeBases.map((knowledgeBase) => (
                        <Picker.Item
                            key={knowledgeBase[KnowledgeBaseKeys.ID]}
                            label={knowledgeBase[KnowledgeBaseKeys.NAME]}
                            value={knowledgeBase[KnowledgeBaseKeys.ID]}
                        />
                    ))}
                </Picker>
            )}
            <Text style={[globalStyles.orangeText, styles.inputText]}>
                Comportamento do agente <Text style={globalStyles.textMuted}>(Opcional)</Text>
            </Text>
            <CustomInput
                placeholder="Digite o comportamento do agente"
                value={form[FormKeys.BEHAVIOR]}
                onChangeText={setBehavior}
                error={formErrors[FormKeys.BEHAVIOR]}
                multiline
                numberOfLines={3}
            />
            <Text style={[globalStyles.orangeText, styles.inputText]}>
                Temperature: {form[FormKeys.TEMPERATURE].toFixed(1)}
            </Text>
            <Text style={styles.sliderTip}>
                Controla a criatividade da resposta. Valores baixos geram respostas mais
                conservadoras, altos geram mais variedade.
            </Text>
            <Slider
                style={styles.slider}
                minimumValue={0.1}
                maximumValue={1}
                step={0.1}
                value={form[FormKeys.TEMPERATURE]}
                onSlidingComplete={(value) => setTemperature(value)}
                minimumTrackTintColor="#FF7F50"
                maximumTrackTintColor="#000000"
                thumbTintColor="#FF7F50"
            />
            <Text style={[globalStyles.orangeText, styles.inputText]}>
                Top-p: {form[FormKeys.TOP_P].toFixed(1)}
            </Text>
            <Text style={styles.sliderTip}>
                Controla a diversidade das palavras usadas. Valores baixos geram respostas mais
                focadas, altos geram respostas mais diversas.
            </Text>
            <Slider
                style={styles.slider}
                minimumValue={0.1}
                maximumValue={1}
                step={0.1}
                value={form[FormKeys.TOP_P]}
                onSlidingComplete={(value) => setTopP(value)}
                minimumTrackTintColor="#FF7F50"
                maximumTrackTintColor="#000000"
                thumbTintColor="#FF7F50"
            />
            <View style={globalStyles.orangeButton} onTouchStart={handleSubmit}>
                <Text style={[globalStyles.WhiteText, styles.inputText]}>Criar</Text>
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    inputText: {
        fontWeight: "bold",
        fontSize: 18,
    },
    scrollContainer: {
        flexGrow: 1,
        padding: 20,
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
        padding: 5,
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
})
