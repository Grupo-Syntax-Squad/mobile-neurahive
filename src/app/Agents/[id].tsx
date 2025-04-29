import React, { useEffect, useState } from "react"
import {
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    Switch,
    Alert,
    ScrollView,
    Image,
} from "react-native"
import { router, useLocalSearchParams, useRouter } from "expo-router"
import CustomInput from "../../components/CustomInput"
import globalStyles from "../styles/globalStyles"
import { Picker } from "@react-native-picker/picker"
import { useAxios } from "@/contexts/axiosContext"
import { KnowledgeBase } from "@/interfaces/Services/KnowledgeBase"
import { DocumentSelect } from "@/components/DocumentSelect"
import { UploadedFile } from "@/types/UploadedFile"
import { getErrorMessage } from "@/utils/getErrorMessage"

type AgentData = {
    name: string
    theme: string
    behavior: string
    knowledge_base_id?: number
}

export default function Agent() {
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [passwordConfirmation, setPasswordConfirmation] = useState("")
    const [isEnabled, setIsEnabled] = useState(false)
    const [selectedImage, setSelectedImage] = useState<number | null>(null)
    const [selectedValue, setSelectedValue] = useState("Escolha uma permissão")

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
    const [uploadedFile, setUploadedFile] = useState<UploadedFile>()
    const [useExistingKnowledge, setUseExistingKnowledge] = useState<boolean>(true)
    const [knowledgeBases, setKnowledgebases] = useState<KnowledgeBase[]>([])
    const [agentData, setAgentData] = useState<AgentData>({
        name: "",
        theme: "",
        behavior: "",
    })

    //const toggleSwitch = () => setIsEnabled((previousState) => !previousState)
    const toggleUseExistingKnowledge = () => {
        setUseExistingKnowledge(!useExistingKnowledge)
    }

    const fetchAgent = async () => {
        const response = await get(`/agents/${id}`)
        setAgentData(response.data)
    }
    const fetchKnowledgeBases = async () => {
        const response = await get(`/knowledge-base`)
        setKnowledgebases(response.data)
    }

    const handleSave = async () => {
        try {
            await put(`/agents/${id}`, agentData)
            Alert.alert("Sucesso", "Agente atualizado com sucesso!")
            router.replace("/Agents/")
        } catch (error: any) {
            Alert.alert("Erro", getErrorMessage(error))
            console.error(error)
        }
    }

    const handleCancel = () => {
        router.back()
    }

    useEffect(() => {
        fetchAgent()
        fetchKnowledgeBases()
    }, [])

    function toggleSwitch(value: boolean): void | Promise<void> {
        throw new Error("Function not implemented.")
    }

    return (
        <View style={globalStyles.container}>
            <ScrollView
                contentContainerStyle={{ paddingBottom: 40 }}
                showsVerticalScrollIndicator={false}
            >
                <View style={globalStyles.imageContainer}>
                    <Text style={globalStyles.textCenter}>Thiago</Text>
                    <Image source={require("../../assets/images/bees-background.png")} />
                </View>

                <View style={styles.userDetail}>
                    <Text style={styles.userStatus}>Ativo</Text>
                    <Text style={styles.DetailContainer}>Criado em: 12/12/2024</Text>
                    <Text style={styles.DetailContainer}>Atualizado em: 12/12/2024</Text>
                </View>

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

                <Text style={globalStyles.orangeText}>Nome</Text>
                <CustomInput placeholder="Nome" value={name} onChangeText={setName} />

                <Text style={globalStyles.orangeText}>E-mail</Text>
                <CustomInput
                    placeholder="E-mail"
                    keyboardType="email-address"
                    value={email}
                    onChangeText={setEmail}
                />

                <Text style={globalStyles.orangeText}>Permissão do Usuário</Text>
                <Picker
                    style={styles.input}
                    selectedValue={selectedValue}
                    onValueChange={(itemValue) => setSelectedValue(itemValue)}
                >
                    <Picker.Item label="Recursos Humanos" value="RH" />
                    <Picker.Item label="Administrativo" value="Admin" />
                    <Picker.Item label="Financeiro" value="Financeiro" />
                </Picker>

                <Text style={globalStyles.orangeText}>Senha</Text>
                <CustomInput
                    placeholder="Senha"
                    secureTextEntry
                    value={password}
                    onChangeText={setPassword}
                />

                <Text style={globalStyles.orangeText}>Repita a Senha</Text>
                <CustomInput
                    placeholder="Repita a Senha"
                    secureTextEntry
                    value={passwordConfirmation}
                    onChangeText={setPasswordConfirmation}
                />

                <View style={globalStyles.flexRow}>
                    <Text style={globalStyles.orangeText}>Status</Text>
                    <Switch value={isEnabled} onValueChange={toggleSwitch} />
                </View>

                <TouchableOpacity style={styles.saveButton}>
                    <Text style={styles.saveButtonText}>Salvar</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.cancelButton}>
                    <Text style={styles.cancelButtonText}>Cancelar</Text>
                </TouchableOpacity>
            </ScrollView>
            <Text style={globalStyles.orangeText}>Nome</Text>
            <CustomInput
                placeholder="Nome"
                value={agentData.name}
                onChangeText={(text) => setAgentData((prev) => ({ ...prev, name: text }))}
            />
            <Text style={globalStyles.orangeText}>Tema</Text>
            <CustomInput
                placeholder="Tema"
                value={agentData.theme}
                onChangeText={(text) => setAgentData((prev) => ({ ...prev, theme: text }))}
            />
            <Text style={globalStyles.orangeText}>Comportamento</Text>
            <CustomInput
                placeholder="Comportamento"
                value={agentData.behavior}
                multiline
                numberOfLines={3}
                onChangeText={(text) => setAgentData((prev) => ({ ...prev, behavior: text }))}
            />
            <Text style={globalStyles.orangeText}>Base de conhecimento</Text>
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
                <DocumentSelect uploadedFile={uploadedFile} setUploadedFile={setUploadedFile} />
            )}
            {useExistingKnowledge && (
                <Picker
                    style={styles.input}
                    selectedValue={agentData.knowledge_base_id}
                    onValueChange={(value) =>
                        setAgentData((prev) => ({ ...prev, knowledge_base_id: value }))
                    }
                >
                    <Picker.Item label="Selecione a base de conhecimento" value={undefined} />
                    {knowledgeBases.map((knowledgeBase) => (
                        <Picker.Item
                            key={knowledgeBase.id}
                            label={knowledgeBase.name}
                            value={knowledgeBase.id}
                        />
                    ))}
                </Picker>
            )}
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
        </View>
    )
}

const styles = StyleSheet.create({
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
})
