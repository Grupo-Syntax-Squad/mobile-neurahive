import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View, Image } from 'react-native';
import { useRouter } from 'expo-router';
import CustomInput from '../../components/CustomInput';
import { globalStyles } from "../styles/globalStyles";
import { Picker } from '@react-native-picker/picker';


export default function CreateUser() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');
  const [selectedValue, setSelectedValue] = useState('Escolha uma permissão');
  const router = useRouter();

  const handleSignUp = () => {
    console.log('Usuário cadastrado:', { name, email, password });
    alert('Cadastro realizado com sucesso!');
  };

  return (
    <View style={globalStyles.container}>
      <Text style={globalStyles.textCenter}>Novo Usuário</Text>
      <View style={globalStyles.imageContainer}>
        <Image source={require('../../assets/images/bees-background.png')}/>
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
      <TouchableOpacity style={globalStyles.orangeButton} onPress={() => handleSignUp()}>
        <Text style={globalStyles.WhiteText}>Criar Usuário</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
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
  button: {
    width: '100%',
    height: 50,
    backgroundColor: '#007bff',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});