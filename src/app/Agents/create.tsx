import { Alert, Button, StyleSheet, Switch, Text, View } from "react-native"
import { globalStyles } from "../styles/globalStyles"
import CustomInput from "@/components/CustomInput"
import { useState } from "react"
import * as DocumentPicker from "expo-document-picker"
import { Access, AccessKeys } from "@/interfaces/Services/Access"
import {
    KnowledgeBase,
    KnowledgeBaseKeys,
} from "@/interfaces/Services/KnowledgeBase"
import { useAxios } from "@/context/axiosContext"
import {
    PostAgentRequest,
    PostAgentRequestKeys,
} from "@/interfaces/Services/Agent"
import { router } from "expo-router"

enum FormKeys {
    NAME = "name",
    ACCESS = "access",
    EXISTENT_KNOWLEDGE = "existentKnowledge",
    KNOWLEDGE_BASE_NAME = "knowledge_base_name",
    KNOWLEDGE_BASE_URI = "knowledge_base_uri",
    KNOWLEDGE_BASE_ID = "knowledge_base_id",
}

interface Form {
    [FormKeys.NAME]: string
    [FormKeys.ACCESS]?: number
    [FormKeys.EXISTENT_KNOWLEDGE]: boolean
    [FormKeys.KNOWLEDGE_BASE_NAME]?: string
    [FormKeys.KNOWLEDGE_BASE_URI]?: string
    [FormKeys.KNOWLEDGE_BASE_ID]?: number
}

const defaultForm: Form = {
    [FormKeys.NAME]: "",
    [FormKeys.ACCESS]: undefined,
    [FormKeys.EXISTENT_KNOWLEDGE]: false,
    [FormKeys.KNOWLEDGE_BASE_NAME]: undefined,
    [FormKeys.KNOWLEDGE_BASE_URI]: undefined,
    [FormKeys.KNOWLEDGE_BASE_ID]: undefined,
}

const MockAccess: Access[] = [
    {
        [AccessKeys.ID]: 1,
        [AccessKeys.NAME]: "Recursos humanos",
    },
    {
        [AccessKeys.ID]: 2,
        [AccessKeys.NAME]: "Estoque",
    },
    {
        [AccessKeys.ID]: 3,
        [AccessKeys.NAME]: "TI",
    },
    {
        [AccessKeys.ID]: 4,
        [AccessKeys.NAME]: "Vendas",
    },
    {
        [AccessKeys.ID]: 5,
        [AccessKeys.NAME]: "Administrativo",
    },
]

const MockKnowledgeBase: KnowledgeBase[] = [
    {
        [KnowledgeBaseKeys.ID]: 1,
        [KnowledgeBaseKeys.NAME]: "Turnos",
    },
    {
        [KnowledgeBaseKeys.ID]: 2,
        [KnowledgeBaseKeys.NAME]: "Feriados",
    },
    {
        [KnowledgeBaseKeys.ID]: 3,
        [KnowledgeBaseKeys.NAME]: "Responsabilidades",
    },
]

const defaultFormErrors: Record<FormKeys, string> = {
    [FormKeys.ACCESS]: "",
    [FormKeys.EXISTENT_KNOWLEDGE]: "",
    [FormKeys.KNOWLEDGE_BASE_ID]: "",
    [FormKeys.KNOWLEDGE_BASE_NAME]: "",
    [FormKeys.KNOWLEDGE_BASE_URI]: "",
    [FormKeys.NAME]: "",
}

export default function CreateAgent() {
    const [form, setForm] = useState<Form>(defaultForm)
    const [accesses, setAccesses] = useState<Access[]>(MockAccess)
    const [knowledgeBases, setKnowledgeBases] =
        useState<KnowledgeBase[]>(MockKnowledgeBase)
    const [formErrors, setFormErrors] =
        useState<Record<FormKeys, string>>(defaultFormErrors)
    const { post } = useAxios()

    const setName = (value: string): void => {
        setForm({ ...form, [FormKeys.NAME]: value })
    }

    const setAccess = (value: number | undefined): void => {
        setForm({ ...form, [FormKeys.ACCESS]: value })
    }

    const setExistentKnowledgeBase = (value: boolean): void => {
        setForm({ ...form, [FormKeys.EXISTENT_KNOWLEDGE]: value })
    }

    const setKnowledgeBase = (value: number): void => {
        setForm({ ...form, [FormKeys.KNOWLEDGE_BASE_ID]: value })
    }

    const validateForm = () => {
        let customFormErrors: Partial<Record<FormKeys, string>> = {}
        if (!form[FormKeys.NAME])
            customFormErrors[FormKeys.NAME] = "O nome do agente é obrigatório"
        else customFormErrors[FormKeys.NAME] = ""
        setFormErrors({ ...formErrors, ...customFormErrors })
        return customFormErrors
    }
    const handleSubmit = async () => {
        const customFormErrors = validateForm()
        if (Object.values(customFormErrors).some((value) => value !== "")) {
            return
        }
        try {
            const request: PostAgentRequest = {
                [PostAgentRequestKeys.NAME]: form[FormKeys.NAME],
            }
            await post("/agents/", request)
        } catch (error) {
            Alert.alert(
                "Cadastrar agente",
                "Erro ao cadastrar agente tente novamente"
            )
        } finally {
            router.replace("/Agents/page")
        }
    }

    const handlePickDocument = async () => {
        try {
            const result = await DocumentPicker.getDocumentAsync({
                type: "/",
                multiple: false,
            })

            if (result.assets) {
                const file = result.assets[0]
                setForm({
                    ...form,
                    [FormKeys.KNOWLEDGE_BASE_NAME]: file.name,
                    [FormKeys.KNOWLEDGE_BASE_URI]: file.uri,
                })
            }
        } catch (error) {
            Alert.alert("Carregar documento", "Erro ao carregar documento")
        }
    }

    return (
        <View style={globalStyles.container}>
            <Text style={[globalStyles.orangeText, styles.inputText]}>
                Nome
            </Text>
            <CustomInput
                placeholder="Digite o nome do agente"
                value={form[FormKeys.NAME]}
                onChangeText={setName}
                error={formErrors[FormKeys.NAME]}
            />
            {/* <Text style={[globalStyles.orangeText, styles.inputText]}>
                Acesso
            </Text>
            <Picker
                style={styles.input}
                selectedValue={form[FormKeys.ACCESS]}
                onValueChange={(value) => setAccess(value)}
            >
                <Picker.Item
                    label="Selecione o acesso ao agente"
                    value={undefined}
                />
                {accesses.map((access) => (
                    <Picker.Item
                        key={access[AccessKeys.ID]}
                        label={access[AccessKeys.NAME]}
                        value={access[AccessKeys.ID]}
                    />
                ))}
            </Picker>
            <Text style={[globalStyles.orangeText, styles.inputText]}>
                Base de conhecimento
            </Text>
            <View
                style={[
                    globalStyles.flexRow,
                    styles.gap_10,
                    styles.align_center,
                ]}
            >
                <Text>Utilizar base de conhecimento já existente?</Text>
                <Switch
                    value={form[FormKeys.EXISTENT_KNOWLEDGE]}
                    onValueChange={setExistentKnowledgeBase}
                    thumbColor="#FF9500"
                    trackColor={{ true: "#FF9500", false: "#aaa" }}
                />
            </View>
            {!form[FormKeys.EXISTENT_KNOWLEDGE] && (
                <DocumentSelect onTouchStart={handlePickDocument} />
            )}
            {form[FormKeys.EXISTENT_KNOWLEDGE] && (
                <Picker
                    style={styles.input}
                    selectedValue={form[FormKeys.KNOWLEDGE_BASE_ID]}
                    onValueChange={(value) => setKnowledgeBase(value)}
                >
                    <Picker.Item
                        label="Selecione a base de conhecimento"
                        value={undefined}
                    />
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
                Cordialidade do agente{" "}
                <Text style={globalStyles.textMuted}>(Opcional)</Text>
            </Text>
            <Picker
                style={styles.input}
                selectedValue={undefined}
                onValueChange={(value) => console.log("Nível de cordialidade")}
            >
                <Picker.Item
                    label="Selecione o nível de cordialidade"
                    value={undefined}
                />
            </Picker> */}
            <View style={globalStyles.orangeButton} onTouchStart={handleSubmit}>
                <Text style={[globalStyles.WhiteText, styles.inputText]}>
                    Criar
                </Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    inputText: {
        fontWeight: "bold",
        fontSize: 18,
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
