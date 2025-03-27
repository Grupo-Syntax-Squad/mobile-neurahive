import { StyleSheet, Image, Text, View, TouchableOpacity, ScrollView, Button } from 'react-native';

import React from 'react';
import { Link, useRouter } from 'expo-router';
import { globalStyles } from "./styles/globalStyles";
import { RootStackParamList } from './navigation/types';


export default function Users() {
  
  const router = useRouter();
  return (
    <ScrollView keyboardShouldPersistTaps="handled">
      <View style={globalStyles.header}>
        <Text>Seus Usuários</Text>
      <Image source={require('../assets/images/usuarios.png')}></Image>
      </View>
      <TouchableOpacity 
      style={globalStyles.orangeButton} 
      onPress={() => router.push("/accesses/page")}
    >
      <Text style={globalStyles.WhiteText}>Acessos</Text>
    </TouchableOpacity>
      <TouchableOpacity style={globalStyles.orangeButton} onPress={() => router.push("/users/create")}>
        <Text style={globalStyles.WhiteText}>Criar novo usuário</Text>
      </TouchableOpacity>
      <TouchableOpacity style={globalStyles.orangeButton} onPress={() => router.push("/Permissions/page")}>
        <Text style={globalStyles.WhiteText}>Permissões dos Usuários</Text>
      </TouchableOpacity>
      <View style={globalStyles.userContainer}>
        <Text>Usuário</Text>
        <Text style={styles.borderEmail}>usuario@email.com</Text>
        <TouchableOpacity style={styles.userDetail} >
          <Link href="/users/1">
            <Text style={globalStyles.WhiteText}>Detalhes</Text>
          </Link>
        </TouchableOpacity>
      </View>
      <View style={globalStyles.userContainer}>
        <Text>Usuário</Text>
        <Text style={styles.borderEmail}>usuario@email.com</Text>
        <TouchableOpacity style={styles.userDetail} >
          <Link href="/users/1">
            <Text style={globalStyles.WhiteText}>Detalhes</Text>
          </Link>
        </TouchableOpacity>
      </View>
      <View style={globalStyles.userContainer}>
        <Text>Usuário</Text>
        <Text style={styles.borderEmail}>usuario@email.com</Text>
        <TouchableOpacity style={styles.userDetail} >
          <Link href="/users/1">
            <Text style={globalStyles.WhiteText}>Detalhes</Text>
          </Link>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  userContainer: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    padding: 10,
    margin: 10,
    borderWidth: 1,
    borderRadius: 5,
  },
  userDetail: {
    backgroundColor: '#FC801F',
    padding: 10,
    margin: 10,
    borderRadius: 5,
    width: 100,
  },
  headerImage: {
    color: '#808080',
    bottom: -90,
    left: -35,
    position: 'absolute',
  },
  inputContainer: {
    padding: 10,
    margin: 1
  },
  titleContainer: {
    flexDirection: 'row',
    gap: 8,
  },
  
  input: {
    padding: 10,
    borderWidth: 1,
  },
  borderEmail: {
    borderRadius: 10,
    borderColor: 'orange',
    borderWidth: 2,       
    height: 30,
    padding: 5
  }
});
