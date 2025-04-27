import React, { useEffect, useState } from "react"
import {
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    Switch,
    Alert,
} from "react-native"
import { router, useLocalSearchParams } from "expo-router"
import CustomInput from "../../components/CustomInput"
import { globalStyles } from "../styles/globalStyles"
import { Picker } from "@react-native-picker/picker"
import { useAxios } from "@/context/axiosContext"
import { KnowledgeBase } from "@/interfaces/Services/KnowledgeBase"
import { DocumentSelect } from "@/components/DocumentSelect"
import { UploadedFile } from "@/types/UploadedFile"

type AgentData = {
    name: string
    theme: string
    behavior: string
    knowledge_base_id?: number
}

export default function Agent() {
    const { id } = useLocalSearchParams()
    const { get, put } = useAxios()
    
    //const [isEnabled, setIsEnabled] = useState<boolean>()
    const [uploadedFile, setUploadedFile] = useState<UploadedFile>()
    const [useExistingKnowledge, setUseExistingKnowledge] = useState<boolean>(true)
    const [knowledgeBases, setKnowledgebases] = useState<KnowledgeBase[]>([])
    const [agentData, setAgentData] = useState<AgentData>({
        name: '',
        theme: '',
        behavior: ''
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
            Alert.alert(
                "Erro",
                error.response?.data?.message || "Erro ao salvar agente"
            )
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

    return (
        <View style={globalStyles.container}>
            <Text style={globalStyles.orangeText}>Nome</Text>
            <CustomInput
                placeholder="Nome"
                value={agentData.name}
                onChangeText={(text) =>
                    setAgentData((prev) => ({ ...prev, name: text }))
                }
            />
            <Text style={globalStyles.orangeText}>Tema</Text>
            <CustomInput
                placeholder="Tema"
                value={agentData.theme}
                onChangeText={(text) =>
                    setAgentData((prev) => ({ ...prev, theme: text }))
                }
            />
            <Text style={globalStyles.orangeText}>Comportamento</Text>
            <CustomInput
                placeholder="Comportamento"
                value={agentData.behavior}
                multiline
                numberOfLines={3}
                onChangeText={(text) =>
                    setAgentData((prev) => ({ ...prev, behavior: text }))
                }
            />
            <Text style={globalStyles.orangeText}>Base de conhecimento</Text>
            <View
                style={[
                    globalStyles.flexRow,
                    styles.gap_10,
                    styles.align_center,
                ]}
            >
                <Text>Utilizar base de conhecimento já existente?</Text>
                <Switch
                    value={useExistingKnowledge}
                    onValueChange={toggleUseExistingKnowledge}
                    thumbColor="#FF9500"
                    trackColor={{ true: "#FF9500", false: "#aaa" }}
                />
            </View>
            {!useExistingKnowledge && (
                <DocumentSelect 
                    uploadedFile={uploadedFile}
                    setUploadedFile={setUploadedFile}
                />
            )}
            {useExistingKnowledge && (
                            <Picker
                                style={styles.input}
                                selectedValue={agentData.knowledge_base_id}
                                onValueChange={(value) => setAgentData((prev) => ({ ...prev, knowledgeBaseId: value}))}
                            >
                                <Picker.Item
                                    label="Selecione a base de conhecimento"
                                    value={undefined}
                                />
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
    DetailContainer: {
        backgroundColor: "gray",
        padding: 5,
        borderRadius: 5,
        color: "white",
    },
    userStatus: {
        backgroundColor: "green",
        padding: 5,
        color: "white",
    },
    userDetail: {
        flexDirection: "row",
        gap: 3,
        justifyContent: "space-around",
        marginBottom: 20,
    },
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        padding: 20,
        backgroundColor: "#f5f5f5",
    },
    title: {
        fontSize: 24,
        fontWeight: "bold",
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
