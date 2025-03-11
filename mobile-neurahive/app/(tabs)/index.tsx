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
        <ThemedText style={styles.grayText}>Olá, Usuário!</ThemedText>
        <Image 
        source={require('../../assets/images/apicultora.png')} // Caminho relativo para a imagem local
        style={styles.image}
      />
        <ThemedText style={styles.grayText}>bem-vindo(a) ao <span style={styles.orangeText}>NeuraHive!</span></ThemedText>
      </ThemedView>
        <ThemedText>v1.0.0</ThemedText>
      <ThemedView style={styles.division}>
      </ThemedView>
        <ThemedText style={styles.orangeText}>O que você deseja fazer hoje?</ThemedText>
        <Button 
          title="Configurações Iniciais"
          />
          <Button 
          title="Adicionar Usuário"
          />
          <Button 
          title="Permissões"
          />
          <ThemedText>Faça as configurações iniciais para liberar todos os conteúdos</ThemedText>
        <ThemedView style={styles.notasContainer}>
          CLIQUE AQUI E VEJA AS NOTÍCIAS DA ÚLTIMA SESSÃO
          <Image 
        source={require('../../assets/images/apicultores.png')}
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
    justifyContent: 'space-around',
    padding: 40
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
    flexDirection: 'row'
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
