import { Link } from 'expo-router';
import { Image, StyleSheet, Platform, Button, View, Alert, Text, TouchableOpacity } from 'react-native';


export default function Agentes() {
  return (
    <View>
        <View style={styles.header}>
            <Text>Área de Agentes</Text>
            <Image 
                source={require('../../assets/images/agente1.png')}
            />
        </View>
        <Link href="/#" style={styles.middleButton}>
            <Image source={require('../../assets/images/base-de-conhecimento.png')}/>
            <Text>Base de Conhecimento</Text>
        </Link>
        <TouchableOpacity style={styles.orangeButton} >
            <Text>Criar Novo Usuário</Text>
        </TouchableOpacity>
        <View>
            <Text>Selecione um Agente</Text>
            <View>
                <Image 
                    source={require('../../assets/images/apicultora.png')}
                />
                <Text>Ive</Text>
            </View>
        </View>
    </View>
  );
}

const styles = StyleSheet.create({
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
      orangeButton: {
        backgroundColor: '#FC801F',
        padding: 10,
        margin: 10,
        borderRadius: 5,
      },
      header: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
      },
});
