import { StyleSheet, Image, Platform, Text, TextInput, Button, View, TouchableOpacity, ScrollView } from 'react-native';

import Checkbox from 'expo-checkbox';

import React, { useState } from 'react';
import { Link, router } from 'expo-router';
import { globalStyles } from "../styles/globalStyles";


export default function Permissions() {
    const [name, setName] = useState("");
    const [isChecked, setChecked] = useState(false);

  return (
    <ScrollView keyboardShouldPersistTaps="handled">
      <Text style={globalStyles.orangeText}>Selecione uma permissão</Text>
     <View style={globalStyles.boxContainer}>
        <View style={globalStyles.box}>
            <Text>Total</Text>
            <Text>Usuários: 30</Text>
            <TouchableOpacity style={globalStyles.orangeButton}>
              <Link href="/Permissions/1">
                <Text style={globalStyles.WhiteText}>Detalhes</Text>
              </Link>
            </TouchableOpacity>
        </View>
        <View style={globalStyles.box}>
            <Text>Permissão 3</Text>
            <Text>Usuários: 60</Text>
            <TouchableOpacity style={globalStyles.orangeButton}>
              <Link href="/Permissions/1">
                <Text style={globalStyles.WhiteText}>Detalhes</Text>
              </Link>
            </TouchableOpacity>
        </View>
        <View style={globalStyles.box}>
            <Text>Acesso X</Text>
            <Text>Usuários: 10</Text>
            <TouchableOpacity style={globalStyles.orangeButton}>
              <Link href="/Permissions/1">
                <Text style={globalStyles.WhiteText}>Detalhes</Text>
              </Link>
            </TouchableOpacity>
        </View>
    </View>
    <View style={globalStyles.container}>
      <Text style={globalStyles.orangeText}>Título</Text>
      <TextInput
          style={globalStyles.input}
          placeholder="Digite o título da permissão"
          autoCapitalize="none"
      />
      <View style={globalStyles.spaceAround}>
        <Text style={globalStyles.orangeText}>Selecione os acessos da permissão</Text>
        <Text style={globalStyles.orangeText}>Selecionados: </Text>
      </View>
      <View style={styles.section}>
        <Checkbox
          style={styles.checkbox}
          value={isChecked}
          onValueChange={setChecked}
          color={isChecked ? '#4630EB' : undefined}
        />
        <Text>Recursos Humanos</Text>
        <Checkbox
          style={styles.checkbox}
          value={isChecked}
          onValueChange={setChecked}
          color={isChecked ? '#4630EB' : undefined}
        />
        <Text>Recursos Humanos</Text>
        </View>
    </View>
    <TouchableOpacity style={globalStyles.orangeButton}>
      <Text style={globalStyles.WhiteText}>Criar Permissão</Text>
    </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  section: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  checkbox: {
    margin: 8,
  },
});
