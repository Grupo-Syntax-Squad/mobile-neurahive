import { Image, StyleSheet, Platform, Button, View } from 'react-native';

import { HelloWave } from '@/components/HelloWave';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import React from 'react';

export default function HomeScreen() {
  return (
    <ThemedView>
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Olá, Usuário!</ThemedText>
        <ThemedText type="title">bem-vindo(a) ao NeuraHive!</ThemedText>
      </ThemedView>
        <ThemedText>O que você deseja fazer hoje?</ThemedText>
        <ThemedText>v1.0.0</ThemedText>
        <ThemedView style={styles.notasContainer}>
          CLIQUE AQUI E VEJA AS NOTÍCIAS DA ÚLTIMA SESSÃO
          <Image 
        source={require('../../assets/images/apicultores.png')} // Caminho relativo para a imagem local
        style={styles.image}
      />
        </ThemedView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  notasContainer: {
    backgroundColor: 'E1E3E5',
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
