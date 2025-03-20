import { StyleSheet, Image, Text, View, TouchableOpacity, ScrollView } from 'react-native';

import React from 'react';
import { Link } from 'expo-router';
import { globalStyles } from "../styles/globalStyles";


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
        <Link href="/accesses/accesses">
          <Text style={globalStyles.WhiteText}>Acessos</Text>
        </Link>
        </TouchableOpacity>
      <TouchableOpacity style={styles.orangeButton} >
      <Link href="/users/create">
        <Text style={globalStyles.WhiteText}>Novo Usuário</Text>
      </Link>
      </TouchableOpacity>
      <Link href="/#" style={globalStyles.middleButton}>
        <Text>Permissões dos Usuários</Text>
        <Image source={require('../../assets/images/permission-icon.png')}/>
      </Link>
      <View style={styles.userContainer}>
        <Text>Usuário</Text>
        <Text style={styles.borderEmail}>usuario@email.com</Text>
        <TouchableOpacity style={styles.userDetail} >
        <Link href="/users/1">
        <Text style={globalStyles.WhiteText}>Detalhes</Text>
      </Link>
        </TouchableOpacity>
      </View>
      <View style={styles.userContainer}>
        <Text>Usuário</Text>
        <Text style={styles.borderEmail}>usuario@email.com</Text>
        <TouchableOpacity style={styles.userDetail} >
          <Text style={globalStyles.WhiteText}>Detalhes</Text>
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
