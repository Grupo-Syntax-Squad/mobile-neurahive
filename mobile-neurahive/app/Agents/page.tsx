import { Link, router } from 'expo-router';
import { Image, StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { globalStyles } from '../styles/globalStyles';


export default function Agents() {
  return (
    <View>
        <View style={globalStyles.header}>
            <Text>Área de Agentes</Text>
            <Image 
                source={require('../../assets/images/agente1.png')}
            />
        </View>
        <Link href="/#" style={globalStyles.middleButton}>
            <Image source={require('../../assets/images/base-de-conhecimento.png')}/>
            <Text>Base de Conhecimento</Text>
        </Link>
        <TouchableOpacity style={globalStyles.orangeButton} >
            <Text style={globalStyles.WhiteText}>Criar Novo Agente</Text>
        </TouchableOpacity>
        <View style={globalStyles.agentContainer}>
            <TouchableOpacity style={globalStyles.agentBox} onPress={() => router.push("/Agents/[id]")}>
                <Image 
                    source={require('../../assets/images/apicultora.png')}
                />
                <Text>Ive</Text>
            </TouchableOpacity>
        </View>
    </View>
  );
}

const styles = StyleSheet.create({
});
