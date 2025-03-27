import { Image, StyleSheet, View, Text, ScrollView, TouchableOpacity } from 'react-native';
import React from 'react';
import { router } from 'expo-router';
import { globalStyles } from "./styles/globalStyles";
import { NewsSection } from '@/components/NewsSection';
import { ConfigurationAlert } from '@/components/ConfigurationAlert';

type HomeActionButton = {
  id: string;
  title: string;
  icon: any;
  route: string;
  testID?: string;
};

export function HomeScreen() {
  const actionButtons: HomeActionButton[] = [
    {
      id: '1',
      title: 'Usuários',
      icon: require('../assets/images/user-icon.png'),
      route: '/users',
      testID: 'users-button'
    },
    {
      id: '2',
      title: 'Agentes',
      icon: require('../assets/images/user-icon.png'),
      route: '/Agents/page',
      testID: 'agents-button'
    },
    {
      id: '3',
      title: 'Chat',
      icon: require('../assets/images/chat.png'),
      route: '/Chat/page',
      testID: 'chat-button'
    },
    {
      id: '4',
      title: 'Configurações Iniciais',
      icon: require('../assets/images/settings.png'),
      route: '/InicialSettings',
      testID: 'settings-button'
    },
    {
      id: '5',
      title: 'Permissões',
      icon: require('../assets/images/permission-icon.png'),
      route: '/Permissions/page',
      testID: 'permissions-button'
    },
    {
      id: '6',
      title: 'Acessos',
      icon: require('../assets/images/permission-icon.png'),
      route: '/accesses/page',
      testID: 'permissions-button'
    },
  ];

  return (
    <ScrollView 
      keyboardShouldPersistTaps="handled"
      contentContainerStyle={styles.scrollContainer}
    >
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

      <View style={styles.actionsSection}>
        <Text style={styles.sectionTitle}>O que você deseja fazer hoje?</Text>
        <View style={styles.actionsGrid}>
          {actionButtons.map((button) => (
            <ActionButton
              key={button.id}
              title={button.title}
              icon={button.icon}
              onPress={() => router.push(button.route as any)}
              testID={button.testID}
            />
          ))}
        </View>
      </View>

      <ConfigurationAlert />
      <NewsSection />
    </ScrollView>
  );
}


const ActionButton: React.FC<{
  title: string;
  icon: any;
  onPress: () => void;
  testID?: string;
}> = ({ title, icon, onPress, testID }) => (
  <TouchableOpacity
    style={styles.actionButton}
    onPress={onPress}
    testID={testID}
  >
    <Image source={icon} style={styles.actionIcon} />
    <Text style={styles.actionText}>{title}</Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  flexColumn: {
    flexDirection: 'column',
    alignItems: 'center',
  },
  grayText: {
    color: '#8A8888',
  },
  division: {
    backgroundColor: '#FC801F',
    padding: 9
  },
  scrollContainer: {
    paddingBottom: 30,
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    position: 'relative',
  },
  headerTextContainer: {
    flex: 1,
  },
  greetingText: {
    color: '#8A8888',
    fontSize: 16,
    marginBottom: 10,
  },
  welcomeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
  },
  welcomeText: {
    color: '#8A8888',
    marginLeft: 8,
  },
  apicultoraImage: {
    width: 100,
    height: 150,
    resizeMode: 'contain',
    marginLeft: 10,
  },
  titleContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    padding: 20
  },
  versionText: {
    textAlign: 'center',
    color: '#8A8888',
    fontSize: 12,
    marginVertical: 5,
  },
  divider: {
    height: 9,
    backgroundColor: '#FC801F',
    marginVertical: 10,
  },
  actionsSection: {
    padding: 20,
  },
  sectionTitle: {
    ...globalStyles.orangeText,
    marginBottom: 20,
    fontSize: 18,
  },
  actionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: 5,
  },
  actionButton: {
    width: '48%',
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 15,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  actionIcon: {
    width: 40,
    height: 40,
    marginBottom: 10,
  },
  actionText: {
    textAlign: 'center',
    fontSize: 14,
    color: '#333',
  },
});

export default HomeScreen;