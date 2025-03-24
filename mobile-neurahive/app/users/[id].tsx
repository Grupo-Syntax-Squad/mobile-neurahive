import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View, Image, Switch } from 'react-native';
import { useRouter } from 'expo-router';
import CustomInput from '../../components/CustomInput';
import { globalStyles } from "../styles/globalStyles";
import { Picker } from '@react-native-picker/picker';


export default function User() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');

  const [isEnabled, setIsEnabled] = useState(false);

  const toggleSwitch = () => setIsEnabled(previousState => !previousState);

  const router = useRouter();
  const [selectedValue, setSelectedValue] = useState('Escolha uma permissão');
  return (
    <View style={globalStyles.container}>
      <View style={globalStyles.imageContainer}>
      <Text style={globalStyles.textCenter}>Thiago</Text>
        <Image source={require('../../assets/images/bees-background.png')}/>
      </View>
      <View style={styles.userDetail}>
        <Text style={styles.userStatus}>Ativo</Text>
        <Text style={styles.DetailContainer}>Criado em: 12/12/2024</Text>
        <Text style={styles.DetailContainer}>Atualizado em: 12/12/2024</Text>
      </View>
      <Text style={globalStyles.orangeText}>Nome</Text>
      <CustomInput
        placeholder="Nome"
        value={name}
        onChangeText={setName}
      />
      <Text style={globalStyles.orangeText}>E-mail</Text>
      <CustomInput
        placeholder="E-mail"
        keyboardType="email-address"
        value={email}
        onChangeText={setEmail}
      />
      <Text style={globalStyles.orangeText}>Permissão do Usuário</Text>
      <Picker style={styles.input}
        selectedValue={selectedValue}
        onValueChange={(itemValue) => setSelectedValue(itemValue)}
      >
        <Picker.Item label="Recursos Humanos"/>
        <Picker.Item label="Administrativo"/>
        <Picker.Item label="Financeiro"/>
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
        <Switch
          value={isEnabled}
          onValueChange={toggleSwitch}
        />
      </View>
      <TouchableOpacity style={styles.saveButton}>
        <Text style={styles.saveButtonText}>Salvar</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.cancelButton}>
        <Text style={styles.cancelButtonText}>Cancelar</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  DetailContainer: {
    backgroundColor: 'gray',
    padding: 5,
    borderRadius: 5,
    color: 'white',
  },
  userStatus: {
    backgroundColor: 'green',
    padding: 5,
    color: 'white',
  },
  userDetail: {
    flexDirection: 'row',
    gap: 3,
    justifyContent: 'space-around',
    marginBottom: 20,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    width: '100%',
    height: 50,
    backgroundColor: '#fff',
    borderRadius: 10,
    paddingHorizontal: 15,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#ccc',
  },
  saveButton: {
    width: '100%',
    height: 50,
    backgroundColor: '#28a745',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    marginBottom: 10,
  },
  cancelButton: {
    width: '100%',
    height: 50,
    backgroundColor: '#dc3545',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
  saveButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  cancelButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
