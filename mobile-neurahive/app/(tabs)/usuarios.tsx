import { StyleSheet, Image, Platform, Text, TextInput, Button } from 'react-native';

import { Collapsible } from '@/components/Collapsible';
import { ExternalLink } from '@/components/ExternalLink';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { IconSymbol } from '@/components/ui/IconSymbol';

export default function TabTwoScreen() {
  return (
    <ThemedView>
      <ThemedText>Seus Usuários</ThemedText>
      <Image 
              source={require('../../assets/images/usuarios.png')}
            />
            <Button title="Permissões de Usuários"/>
            <Button title="Acessos"/>
            <Button title="Criar novo usuário"/>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  headerImage: {
    color: '#808080',
    bottom: -90,
    left: -35,
    position: 'absolute',
  },
  inputContainer: {
    padding: 10,
    margin: 1
  },
  titleContainer: {
    flexDirection: 'row',
    gap: 8,
  },
  header: {
    backgroundColor: '#FC801F',
    padding: 30
  },
  input: {
    padding: 10,
    borderWidth: 1,
  }
});
