import { Image, StyleSheet, View, Text, TouchableOpacity } from 'react-native';

export default function Chat() {
    return (
      <View style={styles.container}>
      <View style={styles.header}>
        <Image
          source={{ uri: 'https://cdn-icons-png.flaticon.com/512/4712/4712038.png' }}
          style={styles.avatar}
        />
        <Text style={styles.headerTitle}>Agente IA</Text>
      </View>
        <View style={[styles.message, styles.iaMessage]}>
          <Text style={styles.iaText}>Olá! Como posso te ajudar?</Text>
        </View>
  
        <View style={[styles.message, styles.myMessage]}>
          <Text style={styles.myText}>Oi! Quero ajuda com....</Text>
        </View>
      </View>
    );
  }

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#f2f2f2',
    },
    header: {
      flexDirection: 'row',
      alignItems: 'center',
      padding: 15,
      backgroundColor: '#FCAF1F',
    },
    avatar: {
      width: 40,
      height: 40,
      borderRadius: 20,
    },
    headerTitle: {
      color: 'white',
      fontSize: 18,
      fontWeight: 'bold',
      marginLeft: 10,
    },
    messagesContainer: {
      flex: 1,
      padding: 10,
    },
    message: {
      maxWidth: '70%',
      padding: 10,
      borderRadius: 10,
      marginVertical: 5,
    },
    myMessage: {
      backgroundColor: '#E1E3E5',
      alignSelf: 'flex-end',
    },
    iaMessage: {
      backgroundColor: '#FCAF1F',
      alignSelf: 'flex-start',
    },
    myText: {
      color: 'black',
    },
    iaText: {
      color: 'black',
    },
  });