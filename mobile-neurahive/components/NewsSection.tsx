
import { StyleSheet, Text } from 'react-native';

import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import React from 'react';
import { Image } from 'react-native';

export function NewsSection() {
  return (
    <ThemedView style={styles.notasContainer}>
        <ThemedText style={styles.grayText}><Text style={styles.orangeText}>CLIQUE AQUI</Text> E VEJA AS NOTÍCIAS DA ÚLTIMA SESSÃO</ThemedText>
        <Image 
            source={require('../assets/images/apicultores.png')}
         />
    </ThemedView>
  );
}

const styles = StyleSheet.create({
    notasContainer: {
        backgroundColor: '#E1E3E5',
        display: 'flex',
        color: '#444444',
        fontWeight: 'bold',
        flexDirection: 'row',
        alignItems: 'center',
      },
      grayText: {
        color: '#8A8888',
        fontWeight: 'bold',
      },
      orangeText: {
        color: '#FF9500',
        fontWeight: 'bold',
      },
});
