import { Image, StyleSheet, Platform, Button, View, Alert, Text } from 'react-native';

import { HelloWave } from '@/components/HelloWave';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import React from 'react';
import { Link } from 'expo-router';
import { NewsSection } from '@/components/newsSection'; 

export default function HomeScreen() {
  return (
    <ThemedView>
      <ThemedView style={styles.titleContainer}>
        <ThemedText style={styles.grayText}>Olá, Usuário!</ThemedText>
        <Image 
        source={require('../../assets/images/apicultora.png')}
        style={styles.image}
      />
        <ThemedText style={styles.grayText}>bem-vindo(a) ao <Text style={styles.orangeText}>NeuraHive!</Text></ThemedText>
      </ThemedView>
        <ThemedText>v1.0.0</ThemedText>
      <ThemedView style={styles.division}>
      </ThemedView>
        <ThemedText style={styles.orangeText}>O que você deseja fazer hoje?</ThemedText>
          <ThemedView style={styles.centeredContainer}>
            <Link href="/usuarios" style={styles.bigButton}>
              Usuários
              <Image source={require('../../assets/images/user-icon.png')}/>
            </Link>
            <Link href="/usuarios" style={styles.bigButton}>
              Permissões
              <Image source={require('../../assets/images/permission-icon.png')}/>
            </Link>
          </ThemedView>
       <NewsSection />
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  centeredContainer: {
    flex: 1,
    justifyContent: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    margin: 20,
    gap: 20,
  },
  bigButton: {
    width: 100,
    height: 80,
    shadowColor: "#000",
    shadowOffset: { width: 1, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 9,
    borderRadius: 8,
    color: '#444444',
    fontWeight: 'bold',
    fontSize: 10,
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  titleContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  grayText: {
    color: '#8A8888',
    fontWeight: 'bold',
  },
  orangeText: {
    color: '#FF9500',
    fontWeight: 'bold',
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
  image: {
    
  }
});
