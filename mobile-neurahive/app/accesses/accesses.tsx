import { StyleSheet, Image, Platform, Text, TextInput, Button, View, TouchableOpacity, ScrollView } from 'react-native';

import React from 'react';
import { Link } from 'expo-router';
import { globalStyles } from "../styles/globalStyles";


export default function Accesses() {
  return (
    <ScrollView keyboardShouldPersistTaps="handled">
      <View style={styles.header}>
        <Text>Acessos</Text>
      </View>
      <TouchableOpacity style={styles.orangeButton} >
      <Link href="/users/create">
        <Text style={globalStyles.WhiteText}>Novo Acesso</Text>
      </Link>
      </TouchableOpacity>
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
