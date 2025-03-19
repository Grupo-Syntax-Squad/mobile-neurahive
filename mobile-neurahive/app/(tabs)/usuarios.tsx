import { StyleSheet, Image, Platform, Text, TextInput, Button, View, TouchableOpacity, ScrollView } from 'react-native';

import React from 'react';
import { Link } from 'expo-router';

export default function TabTwoScreen() {
  return (
    <ScrollView keyboardShouldPersistTaps="handled">
      <View style={styles.header}>
        <Text>Seus Usuários</Text>
        <Image
          source={require('../../assets/images/usuarios.png')}
        />
      </View>
      <TouchableOpacity style={styles.orangeButton} >
          <Text style={styles.WhiteText}>Acessos</Text>
        </TouchableOpacity>
      <TouchableOpacity style={styles.orangeButton} >
      <Link href="/users/create">
        <Text style={styles.WhiteText}>Novo Usuário</Text>
      </Link>
      </TouchableOpacity>
      <Link href="/#" style={styles.middleButton}>
        <Text>Permissões dos Usuários</Text>
        <Image source={require('../../assets/images/permission-icon.png')}/>
      </Link>
      <View style={styles.userContainer}>
        <Text>Usuário</Text>
        <Text style={styles.borderEmail}>usuario@email.com</Text>
        <TouchableOpacity style={styles.userDetail} >
        <Link href="/users/1">
        <Text>Detalhes</Text>
      </Link>
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
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  WhiteText: {
    color: 'white',
    textAlign: 'center',
  },
  middleButton: {
    flexDirection: 'column', 
    justifyContent: 'center', 
    alignItems: 'center',
    textAlign: 'center',
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 10,
    margin: 10,
  },
  userContainer: {
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
    padding: 5
  }
});
