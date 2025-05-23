import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ScrollView } from "react-native";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { Picker } from '@react-native-picker/picker';
import { useAxios } from "@/contexts/axiosContext"
import { User } from "@/types/User"
import { Agent } from "@/types/Agent"
import { getErrorMessage } from '@/utils/getErrorMessage';

const ManageChats = () => {
    const [selectedUser, setSelectedUser] = useState('');
    const [selectedAgent, setSelectedAgent] = useState('');
    const [startDate, setStartDate] = useState<Date | null>(null);
    const [endDate, setEndDate] = useState<Date | null>(null);
    const [isStartDatePickerVisible, setStartDatePickerVisibility] = useState(false);
    const [isEndDatePickerVisible, setEndDatePickerVisibility] = useState(false);
    const [users, setUsers] = useState<User[]>([])
    const [agents, setAgents] = useState<Agent[]>([])
    const [statistics, setStatistics] = useState<any>({})
    const [error, setError] = useState<string | null>(null)
    const [loading, setLoading] = useState(true)
    const { get } = useAxios()

    const fetchUsers = async () => {
        try {
            setLoading(true)
            const response = await get(`/users/`)
            setUsers(response.data)
        } catch (err) {
            setError("Erro ao carregar usuários")
            console.error("Erro na requisição:", getErrorMessage(err))
        } finally {
            setLoading(false)
        }
    }

    const fetchAgents = async () => {
        try {
            setLoading(true)
            const response = await get(`/agents/`)
            setAgents(response.data)
        } catch (err) {
            setError("Erro ao carregar agentes")
            console.error("Erro na requisição:", getErrorMessage(err))
        } finally {
            setLoading(false)
        }
    }

    const fetchStatistics = async () => {
        try {
            setLoading(true)
            const response = await get(`/statistics/general`)
            setStatistics(response.data)
        } catch (err) {
            setError("Erro ao carregar estatísticas")
            console.error("Erro na requisição:", getErrorMessage(err))
        } finally {
            setLoading(false)
        }
    }

    React.useEffect(() => {
        fetchUsers()
        fetchAgents()
        fetchStatistics()
    }, [])

    const handleConfirmStart = (date: Date) => {
        setStartDate(date);
        setStartDatePickerVisibility(false);
    };

    const handleConfirmEnd = (date: Date) => {
        setEndDate(date);
        setEndDatePickerVisibility(false);
    };

    const handleFilter = async () => {
        try {
            setLoading(true);
                let user_id = selectedUser ? Number(selectedUser) : 0;
                let start_date = startDate || "string";
                let end_date = endDate || "string";
                let agent_id = selectedUser ? Number(selectedAgent) : 0;

                const response = await get('/statistics/general', {
                    params: {
                        start_date,
                        end_date,
                        user_id,
                        agent_id
                    }
        });
        console.log(response.data);

        } catch (err) {
            setError("Erro ao carregar estatísticas");
            console.error("Erro na requisição:", getErrorMessage(err));
        } finally {
            setLoading(false);
        }
    };

    return (
        <ScrollView
            keyboardShouldPersistTaps="handled"
            contentContainerStyle={styles.scrollContainer}
        >
            <View style={styles.filterContainer}>
                <Text style={styles.label}>Usuário:</Text>
                <View style={styles.pickerContainer}>
                    <Picker
                        selectedValue={selectedUser}
                        onValueChange={(itemValue) => setSelectedUser(itemValue)}
                    >
                        <Picker.Item label="Selecione um usuário" value="" />
                        {users.map((user) => (
                            <Picker.Item key={user.id} label={user.name} value={user.id} />
                        ))}
                    </Picker>
                </View>

                <Text style={styles.label}>Agente:</Text>
                <View style={styles.pickerContainer}>
                    <Picker
                        selectedValue={selectedAgent}
                        onValueChange={(itemValue) => setSelectedAgent(itemValue)}
                    >
                        <Picker.Item label="Selecione um agente" value="" />
                        {agents.map((agent) => (
                            <Picker.Item key={agent.id} label={agent.name} value={agent.id} />
                        ))}
                    </Picker>
                </View>

                <Text style={styles.label}>Data de Início:</Text>
                <TouchableOpacity style={styles.input} onPress={() => setStartDatePickerVisibility(true)}>
                    <Text>{startDate ? startDate.toLocaleDateString() : 'Selecionar Data de Início'}</Text>
                </TouchableOpacity>
                <DateTimePickerModal
                    isVisible={isStartDatePickerVisible}
                    mode="date"
                    onConfirm={handleConfirmStart}
                    onCancel={() => setStartDatePickerVisibility(false)}
                />

                <Text style={styles.label}>Data de Fim:</Text>
                <TouchableOpacity style={styles.input} onPress={() => setEndDatePickerVisibility(true)}>
                    <Text>{endDate ? endDate.toLocaleDateString() : 'Selecionar Data de Fim'}</Text>
                </TouchableOpacity>
                <DateTimePickerModal
                    isVisible={isEndDatePickerVisible}
                    mode="date"
                    onConfirm={handleConfirmEnd}
                    onCancel={() => setEndDatePickerVisibility(false)}
                />

                <TouchableOpacity style={styles.button} onPress={handleFilter}>
                    <Text style={styles.buttonText}>Filtrar</Text>
                </TouchableOpacity>
            </View>

            <View style={styles.statisticsContainer}>
                <Text>
                    <Text >Agente mais ativo: </Text>
                     <Text style={styles.textOrange}>{statistics?.most_active_agent_name ?? '-'} </Text>
                </Text>
                <Text>
                    <Text>Agentes com interações recentes: </Text>
                    <Text style={styles.textOrange}>{statistics?.total_agents_with_recent_iteractions ?? '-'}</Text>
                </Text>
                <Text>
                    <Text>Total de conversas: </Text>
                    <Text style={styles.textOrange}>{statistics?.total_conversations ?? '-'}</Text>
                </Text>
                <Text>
                    <Text>Usuários com interações recentes: </Text>
                    <Text style={styles.textOrange}>{statistics?.total_users_with_recent_iteractions ?? '-'}</Text>
                </Text>
            </View>

        </ScrollView>
    );
};

const styles = StyleSheet.create({
    scrollContainer: {
        padding: 16,
    },
    filterContainer: {
        backgroundColor: '#ffffff',
        padding: 16,
        borderRadius: 12,
        marginBottom: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    label: {
        fontSize: 16,
        fontWeight: 'bold',
        marginTop: 10,
    },
    pickerContainer: {
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 6,
        marginTop: 5,
    },
    input: {
        height: 40,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 6,
        paddingHorizontal: 10,
        justifyContent: 'center',
        marginTop: 5,
    },
    button: {
        marginTop: 20,
        backgroundColor: "#FF7700",
        paddingVertical: 12,
        borderRadius: 8,
        alignItems: 'center',
    },
    buttonText: {
        color: '#ffffff',
        fontSize: 16,
    },
    statisticsContainer: {
    backgroundColor: '#ffffff',
    padding: 16,
    borderRadius: 12,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    },
    textOrange: {
        color: '#FF7700',
        fontWeight: 'bold',
    },

    statisticsTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
    },
});

export default ManageChats;
