import { StyleSheet, Image, Platform, Text, TextInput, Button, View, TouchableOpacity, ScrollView } from 'react-native';

import React, { useState } from 'react';
import { Link, router } from 'expo-router';
import { globalStyles } from "../styles/globalStyles";
import OrangeButton from '@/components/orangeButton';


export default function Accesses() {
    const [name, setName] = useState("");
    
    const handleAccess = () => {
      console.log("Name:", name);
    };
  

  return (
    <ScrollView keyboardShouldPersistTaps="handled">
      <View>
        <Text style={globalStyles.orangeText}>Título</Text>
        <TextInput
            style={globalStyles.input}
            placeholder="Digite o título da permissão"
            autoCapitalize="none"
        />
      </View>
      <TouchableOpacity style={globalStyles.orangeButton}>
        <Text style={globalStyles.WhiteText}>Criar Acesso</Text>
      </TouchableOpacity>
        <View style={globalStyles.spaceAround}>
          <Text style={globalStyles.orangeText}>Seus Acessos</Text>
          <Text style={globalStyles.orangeText}>Exibir Mais </Text>
        </View>
      <View style={globalStyles.boxContainer}>
        <View style={globalStyles.accessBox}>
            <Text>Recursos Humanos</Text>
            <Text style={globalStyles.permissionContainer}>Permissões: 4</Text>
            <Text style={globalStyles.grayContainer}>Agentes: 4</Text>
        </View>
        <View style={globalStyles.accessBox}>
            <Text>Administrativo</Text>
            <Text style={globalStyles.permissionContainer}>Permissões: 4</Text>
            <Text style={globalStyles.grayContainer}>Agentes: 4</Text>
        </View>
        <View style={globalStyles.accessBox}>
            <Text>Financeiro</Text>
            <Text style={globalStyles.permissionContainer}>Permissões: 4</Text>
            <Text style={globalStyles.grayContainer}>Agentes: 4</Text>
        </View>
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
  headerImage: {
    color: '#808080',
    bottom: -90,
    left: -35,
    position: 'absolute',
  },
  header: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
