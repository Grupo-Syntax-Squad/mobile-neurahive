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
            <Text style={styles.WhiteText}>Criar Novo Agente</Text>
        </TouchableOpacity>
        <View style={styles.boxContainer}>
            <View style={styles.box}>
                <Image 
                    source={require('../../assets/images/apicultora.png')}
                />
                <Text>Ive</Text>
            </View>
            <View style={styles.box}>
                <Image 
                    source={require('../../assets/images/apicultora.png')}
                />
                <Text>Bea</Text>
            </View>
            <View style={styles.box}>
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
      boxContainer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        flexWrap: 'wrap',
        padding: 10,
        gap: 10,
      },
      box: {
        width: 150,
        height: 150,
        backgroundColor: "white",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 10,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 5 },
        shadowOpacity: 0.3,
        shadowRadius: 10,

        elevation: 10,
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
