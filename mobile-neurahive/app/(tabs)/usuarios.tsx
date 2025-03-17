import { StyleSheet, Image, Platform, Text, TextInput, Button, View, TouchableOpacity } from 'react-native';

import React from 'react';
import { Link } from 'expo-router';

export default function TabTwoScreen() {
  return (
    <View>
      <View style={styles.header}>
        <Text>Seus Usuários</Text>
        <Image
          source={require('../../assets/images/usuarios.png')}
        />
      </View>
      <TouchableOpacity style={styles.orangeButton} >
          <Text>Acessos</Text>
        </TouchableOpacity>
      <TouchableOpacity style={styles.orangeButton} >
        <Text>Criar Novo Usuário</Text>
      </TouchableOpacity>
      <Link href="/#" style={styles.middleButton}>
        <Image source={require('../../assets/images/permission-icon.png')}/>
        <Text>Permissões dos Usuários</Text>
      </Link>
      <View style={styles.userContainer}>
        <Text>Usuário</Text>
        <Text style={styles.borderEmail}>usuario@email.com</Text>
        <TouchableOpacity style={styles.userDetail} >
          <Text>Detalhes</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.userContainer}>
        <Text>Usuário</Text>
        <Text style={styles.borderEmail}>usuario@email.com</Text>
        <TouchableOpacity style={styles.userDetail} >
          <Text>Detalhes</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.userContainer}>
        <Text>Usuário</Text>
        <Text>usuario@email.com</Text>
        <TouchableOpacity style={styles.userDetail} >
          <Text>Detalhes</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  middleButton: {
    flexDirection: 'column', 
    width: 100, 
    justifyContent: 'center', 
    alignItems: 'center',
    textAlign: 'center',
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 10
  },
  userContainer: {
    width: 200,
    flexDirection: 'column',
    justifyContent: 'space-between',
    padding: 10,
    margin: 10,
    borderWidth: 1,
    borderRadius: 5,
  },
  orangeButton: {
    backgroundColor: '#FC801F',
    padding: 10,
    margin: 10,
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
  header: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
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
    padding: 1
  }
});
