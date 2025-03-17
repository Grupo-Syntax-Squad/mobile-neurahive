import { Image, StyleSheet, Platform, Button, View, Alert, Text } from 'react-native';

import React from 'react';
import { Link } from 'expo-router';
import { NewsSection } from '@/components/NewsSection';
import { ConfigurationAlert } from '@/components/ConfigurationAlert';
import { InicialSettings } from '@/components/InicialSettings';

export default function HomeScreen() {
  return (
    <View>
      <View style={styles.titleContainer}>
        <Text style={styles.grayText}>Olá, Usuário!</Text>
        <Image 
        source={require('../../assets/images/apicultora.png')}
        style={styles.apicultoraImage}
      />
        <View style={styles.flexColumn}>
          <Image 
          source={require('../../assets/images/neurahive-icon.png')}
          style={styles.neuhiveIcon}
        />
          <Text style={styles.grayText}>bem-vindo(a) ao </Text>
          <Text style={styles.orangeText}>NeuraHive!</Text>
        </View>
      </View>
        <Text>v1.0.0</Text>
      <View style={styles.division}>
      </View>
        <View style={styles.homeOptions}>
          <Text style={styles.orangeText}>O que você deseja fazer hoje?</Text>
            <View style={styles.centeredContainer}>
              <Link href="/#" style={styles.middleButton}>
                <Image source={require('../../assets/images/settings.png')}/>
                <Text>Configurações Iniciais</Text>
              </Link>
              <Link href="/usuarios" style={styles.middleButton}>
                <Image source={require('../../assets/images/user-icon.png')}/>
                <Text>Usuários</Text>
              </Link>
              <Link href="/#" style={styles.middleButton}>
                <Image source={require('../../assets/images/permission-icon.png')}/>
                <Text>Permissões</Text>
              </Link>
              <Link href="/#" style={styles.middleButton}>
                <Image source={require('../../assets/images/user-icon.png')}/>
                <Text>Editar Perfil</Text>
              </Link>
              <Link href="/#" style={styles.middleButton}>
                <Image source={require('../../assets/images/base-de-conhecimento.png')}/>
                <Text>Base de Conhecimento</Text>
              </Link>
              <Link href="/#" style={styles.middleButton}>
                <Image source={require('../../assets/images/quadro.png')}/>
                <Text>Novo Quadro</Text>
              </Link>
              <Link href="/#" style={styles.middleButton}>
                <Image source={require('../../assets/images/agente.png')}/>
                <Text>Novo Agente</Text>
              </Link>
            </View>
        </View>
        <ConfigurationAlert/>
       <NewsSection />
    </View>
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
    alignItems: 'center',
    justifyContent: 'space-between',

  },
  middleButton: {
    flexDirection: 'column', 
    width: 100, 
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
  orangeText: {
    color: '#FF9500',
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
  neuhiveIcon: {
    width: 30,
    height: 30,
  }
});
