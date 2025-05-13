import { Alert, StyleSheet, Switch, Text, View, ScrollView } from "react-native"
import globalStyles from "../styles/globalStyles"
import CustomInput from "@/components/CustomInput"
import { useEffect, useState } from "react"
import * as FileSystem from "expo-file-system"
import * as DocumentPicker from "expo-document-picker"

//import { Access, AccessKeys } from "@/interfaces/Services/Access"
import { KnowledgeBase, KnowledgeBaseKeys } from "@/interfaces/Services/KnowledgeBase"
import { useAxios } from "@/contexts/axiosContext"
import { PostAgentRequest, PostAgentRequestKeys } from "@/interfaces/Services/Agent"
import { router } from "expo-router"
import { Picker } from "@react-native-picker/picker"
import { DocumentSelect } from "@/components/DocumentSelect"
import { getErrorMessage } from "@/utils/getErrorMessage"
import { useAuth } from "@/contexts/authContext"

enum FormKeys {
    NAME = "name",
    THEME = "theme",
    BEHAVIOR = "behavior",
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
    [FormKeys.ACCESS]: undefined,
    [FormKeys.EXISTENT_KNOWLEDGE]: false,
    [FormKeys.KNOWLEDGE_BASE_NAME]: undefined,
    [FormKeys.KNOWLEDGE_BASE_URI]: undefined,
    [FormKeys.KNOWLEDGE_BASE_ID]: undefined,
}

// const MockAccess: Access[] = [
//     {
//         [AccessKeys.ID]: 1,
//         [AccessKeys.NAME]: "Recursos humanos",
//     },
//     {
//         [AccessKeys.ID]: 2,
//         [AccessKeys.NAME]: "Estoque",
//     },
//     {
//         [AccessKeys.ID]: 3,
//         [AccessKeys.NAME]: "TI",
//     },
//     {
//         [AccessKeys.ID]: 4,
//         [AccessKeys.NAME]: "Vendas",
//     },
//     {
//         [AccessKeys.ID]: 5,
//         [AccessKeys.NAME]: "Administrativo",
//     },
// ]

const defaultFormErrors: Record<FormKeys, string> = {
    [FormKeys.ACCESS]: "",
    [FormKeys.EXISTENT_KNOWLEDGE]: "",
    [FormKeys.KNOWLEDGE_BASE_ID]: "",
    [FormKeys.KNOWLEDGE_BASE_NAME]: "",
    [FormKeys.KNOWLEDGE_BASE_URI]: "",
    [FormKeys.NAME]: "",
    [FormKeys.THEME]: "",
    [FormKeys.BEHAVIOR]: "",
}

export default function CreateAgent() {
    const [selectedFile, setSelectedFile] = useState<DocumentPicker.DocumentPickerAsset>()
    const [form, setForm] = useState<Form>(defaultForm)
    //const [accesses, setAccesses] = useState<Access[]>(MockAccess)
    const [knowledgeBases, setKnowledgeBases] = useState<KnowledgeBase[]>([])
    const [formErrors, setFormErrors] = useState<Record<FormKeys, string>>(defaultFormErrors)
    const { get, post } = useAxios()
    const { token } = useAuth()

    const setName = (value: string): void => {
        setForm({ ...form, [FormKeys.NAME]: value })
    }
    const setTheme = (value: string): void => {
        setForm({ ...form, [FormKeys.THEME]: value })
    }
    const setBehavior = (value: string): void => {
        setForm({ ...form, [FormKeys.BEHAVIOR]: value })
    }

    // const setAccess = (value: number | undefined): void => {
    //     setForm({ ...form, [FormKeys.ACCESS]: value })
    // }

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
                        behavior: form[FormKeys.BEHAVIOR]
                    },
                }
            )
            const json = JSON.parse(response.body)
            console.log(json)
        } catch (err) {
            console.log("Erro na requisição:", err)
        }
    }

    const handleSubmit = () => {
        if(selectedFile && !form[FormKeys.EXISTENT_KNOWLEDGE]) {
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
            const request: PostAgentRequest = {
                [PostAgentRequestKeys.NAME]: form[FormKeys.NAME],
                [PostAgentRequestKeys.THEME]: form[FormKeys.THEME],
                [PostAgentRequestKeys.BEHAVIOR]: form[FormKeys.BEHAVIOR]
                    ? form[FormKeys.BEHAVIOR]
                    : undefined,
                [PostAgentRequestKeys.KNOWLEDGE_BASE_ID]: form[FormKeys.KNOWLEDGE_BASE_ID]
                    ? form[FormKeys.KNOWLEDGE_BASE_ID]
                    : undefined,
            }

            const formData = new FormData()
            formData.append('name', form[FormKeys.NAME])
            formData.append('theme', form[FormKeys.THEME])
            formData.append('behavior', form[FormKeys.BEHAVIOR])
            if (form[FormKeys.KNOWLEDGE_BASE_ID]) {
                formData.append('knowledge_base_id', String(form[FormKeys.KNOWLEDGE_BASE_ID]))
            }

            await post("/agents/", request, {
                headers: {
                    "Content-Type": 'multipart/form-data'
                }
            })
        } catch (error) {
            Alert.alert("Cadastrar agente", `Erro ao cadastrar agente: ${getErrorMessage(error)}`)
        } finally {
            router.replace("/Agents/page")
        }
    }

    return (
        <ScrollView contentContainerStyle={[globalStyles.container, styles.scrollContainer]}>
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
})
