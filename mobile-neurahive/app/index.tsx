import { Image, StyleSheet, View, Text, ScrollView, TouchableOpacity } from 'react-native';
import React from 'react';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { NewsSection } from '@/components/NewsSection';
import { globalStyles } from "./styles/globalStyles";
import { RootStackParamList } from './navigation/types';
import { router } from 'expo-router';


export default function HomeScreen() {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  return (
    <ScrollView keyboardShouldPersistTaps="handled">
      <View style={styles.titleContainer}>
        <Text style={styles.grayText}>Olá, Usuário!</Text>
        <Image 
          source={require('../assets/images/apicultora.png')}
          style={styles.apicultoraImage}
        />
        <View style={styles.flexColumn}>
          <Image 
            source={require('../assets/images/neurahive-icon.png')}
            style={globalStyles.neuhiveIcon}
          />
          <Text style={styles.grayText}>bem-vindo(a) ao </Text>
          <Text style={globalStyles.orangeText}>NeuraHive!</Text>
        </View>
      </View>
      <Text>v1.0.0</Text>
      <View style={styles.division}></View>
      <View style={styles.homeOptions}>
        <Text style={globalStyles.orangeText}>O que você deseja fazer hoje?</Text>
        <View style={styles.centeredContainer}>
          <TouchableOpacity 
            style={styles.middleButton} 
            onPress={() => router.push("/users")}
          >
            <Image source={require('../assets/images/user-icon.png')} />
            <Text>Usuários</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={styles.middleButton} 
            onPress={() => router.push("/Agents/page")}
          >
            <Image source={require('../assets/images/user-icon.png')} />
            <Text>Agentes</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={styles.middleButton} 
            onPress={() => router.push("/Chat/page")}
          >
            <Image source={require('../assets/images/chat.png')} />
            <Text>Chat</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.middleButton} 
            onPress={() => router.push("/Permissions/page")}
          >
            <Image source={require('../assets/images/permission-icon.png')} />
            <Text>Permissões</Text>
          </TouchableOpacity>
        </View>
      </View>
      <NewsSection />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  ConfigurationAlert: {
    padding: 20,
    backgroundColor: '#E1E3E5',
  },
  flexColumn: {
    flexDirection: 'column',
    alignItems: 'center',
  },
  homeOptions: {
    padding: 20
  },
  centeredContainer: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    gap: 5,
  },
  middleButton: {
    display: 'flex',
    flexDirection: 'row', 
    flexWrap: 'wrap',
    justifyContent: 'center', 
    alignItems: 'center',
    textAlign: 'center',
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 10
  },
  titleContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    padding: 20
  },
  grayText: {
    color: '#8A8888',
  },
  division: {
    backgroundColor: '#FC801F',
    padding: 9
  },
  notasContainer: {
    backgroundColor: '#E1E3E5',
    display: 'flex',
    color: '#444444',
    fontWeight: 'bold',
    flexDirection: 'row',
    alignItems: 'center',
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: 'absolute',
  },
  apicultoraImage: {
    position: 'relative',
    zIndex: 2,
    marginBottom: -55
  },
  
});
