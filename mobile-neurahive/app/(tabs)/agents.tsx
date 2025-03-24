import { Link } from 'expo-router';
import { Image, StyleSheet, Platform, Button, View, Alert, Text, TouchableOpacity } from 'react-native';
import { globalStyles } from '../styles/globalStyles';


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
        <TouchableOpacity style={globalStyles.orangeButton} >
            <Text style={styles.WhiteText}>Criar Novo Agente</Text>
        </TouchableOpacity>
        <View style={globalStyles.boxContainer}>
            <View style={globalStyles.box}>
                <Image 
                    source={require('../../assets/images/apicultora.png')}
                />
                <Text>Ive</Text>
            </View>
            <View style={globalStyles.box}>
                <Image 
                    source={require('../../assets/images/apicultora.png')}
                />
                <Text>Bea</Text>
            </View>
            <View style={globalStyles.box}>
                <Image 
                    source={require('../../assets/images/apicultora.png')}
                />
                <Text>Lil</Text>
            </View>
        </View>
    </View>
  );
}

const styles = StyleSheet.create({
    WhiteText: {
      color: 'white',
      textAlign: 'center',
    },
    middleButton: {
        flexDirection: 'column', 
        justifyContent: 'center', 
        alignItems: 'center',
        textAlign: 'center',
        backgroundColor: 'white',
        padding: 10,
        borderRadius: 10
      },
      header: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
      },
});
