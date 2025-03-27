import OrangeButton from "@/components/orangeButton";
import { Link } from "expo-router";
import React, { useState } from "react";
import { Image, View, Text, TextInput, TouchableOpacity, StyleSheet } from "react-native";
import { globalStyles } from "../styles/globalStyles";
import { NeurahiveIcon } from "@/components/NeurahiveIcon";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    console.log("Email:", email);
    console.log("Password:", password);
  };

  return (
    <View >
      <View style={globalStyles.imageContainer}>
        <NeurahiveIcon />
      </View>
      <Text style={globalStyles.textCenter}>Faça login em sua conta</Text>
      <Text style={globalStyles.formLabel}>E-mail</Text>
      <TextInput
        style={globalStyles.input}
        placeholder="Insira seu endereço de e-mail"
        keyboardType="email-address"
        autoCapitalize="none"
        value={email}
        onChangeText={setEmail}
      />
      <Text style={globalStyles.formLabel}>Senha</Text>
      <TextInput
        style={globalStyles.input}
        placeholder="Insira sua senha"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      <OrangeButton title={'Entrar'} onPress={handleLogin}/>
      <Text>Ainda não tem conta? 
        <Link href="/Auth/register" style={globalStyles.orangeText}>Cadastre-se</Link>
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f5f5f5",
    padding: 20,
  },
  title: {
    fontSize: 20,
    marginBottom: 20,
  },
  button: {
    width: "100%",
    height: 50,
    backgroundColor: "#007bff",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default Login;
