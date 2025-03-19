import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View, Image } from 'react-native';
import { useRouter } from 'expo-router';
import CustomInput from '../../components/CustomInput';

export default function CreateUser() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleSignUp = () => {
    console.log('Usuário cadastrado:', { name, email, password });
    alert('Cadastro realizado com sucesso!');
    router.push('/(tabs)/usuarios');
  };

  return (
    <View style={styles.container}>
        <Text>Novo Usuário</Text>
        <Image source={require('../../assets/images/bees-background.png')}/>
      <CustomInput
        placeholder="Nome"
        value={name}
        onChangeText={setName}
      />
      <CustomInput
        placeholder="E-mail"
        keyboardType="email-address"
        value={email}
        onChangeText={setEmail}
      />
      <CustomInput
        placeholder="Permissão do Usuário"
        value={email}
        onChangeText={setEmail}
      />
      <CustomInput
        placeholder="Senha"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      <CustomInput
        placeholder="Repita a Senha"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      <TouchableOpacity style={styles.button} onPress={handleSignUp}>
        <Text style={styles.buttonText}>Cadastrar</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
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