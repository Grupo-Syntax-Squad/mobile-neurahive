import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View, Image } from 'react-native';
import { useRouter } from 'expo-router';
import { globalStyles } from "../styles/globalStyles";
import Checkbox from 'expo-checkbox';

export default function Permission() {
  const [isChecked, setChecked] = useState(false);
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Text>Total</Text>
      <View >
            <Text style={globalStyles.orangeText}>Título</Text>
            <TextInput
                style={globalStyles.input}
                placeholder="Digite o título da permissão"
                autoCapitalize="none"
                value={"Total"}
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
      <TouchableOpacity style={styles.saveButton}>
        <Text style={styles.saveButtonText}>Salvar</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.cancelButton}>
        <Text style={styles.cancelButtonText}>Cancelar</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  checkbox: {
    margin: 8,
  },
  section: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  userStatus: {
    backgroundColor: 'green',
    padding: 5,
    color: 'white',
  },
  userDetail: {
    flexDirection: 'row',
    gap: 3,
    justifyContent: 'space-between',
    marginBottom: 20,
  },
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
  saveButton: {
    width: '100%',
    height: 50,
    backgroundColor: '#28a745',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    marginBottom: 10,
  },
  cancelButton: {
    width: '100%',
    height: 50,
    backgroundColor: '#dc3545',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
  saveButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  cancelButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
