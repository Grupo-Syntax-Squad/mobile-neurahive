import { 
    Image, 
    StyleSheet, 
    View, 
    Text, 
    TouchableOpacity, 
    TextInput,
    KeyboardAvoidingView,
    Platform 
  } from "react-native"
  import { useLocalSearchParams } from "expo-router"
  
  export default function Chat() {
      const params = useLocalSearchParams()
      const agentName = params.agentName
      return (
        <View style={styles.container}>
              <View style={styles.messagesContainer}>
                  <View style={[styles.message, styles.iaMessage]}>
                      <Text style={styles.iaText}>Olá! Como posso te ajudar?</Text>
                  </View>
  
                  <View style={[styles.message, styles.myMessage]}>
                      <Text style={styles.myText}>Oi! Quero ajuda com....</Text>
                  </View>
              </View>
              
              {/* Barra de chat */}
              <KeyboardAvoidingView 
                  behavior={Platform.OS === "ios" ? "padding" : "height"}
                  style={styles.inputContainer}
              >
                  <TextInput
                      style={styles.input}
                      placeholder="Digite sua mensagem..."
                      placeholderTextColor="#999"
                  />
                  <TouchableOpacity style={styles.sendButton}>
                      <Text style={styles.sendButtonText}>Enviar</Text>
                  </TouchableOpacity>
              </KeyboardAvoidingView>
          </View>
      )
  }
  
  const styles = StyleSheet.create({
      container: {
          flex: 1,
          backgroundColor: "#f2f2f2",
      },
      header: {
          flexDirection: "row",
          alignItems: "center",
          padding: 15,
          backgroundColor: "#FCAF1F",
      },
      avatar: {
          width: 40,
          height: 40,
          borderRadius: 20,
      },
      headerTitle: {
          color: "white",
          fontSize: 18,
          fontWeight: "bold",
          marginLeft: 10,
      },
      messagesContainer: {
          flex: 1,
          padding: 10,
      },
      message: {
          maxWidth: "70%",
          padding: 10,
          borderRadius: 10,
          marginVertical: 5,
      },
      myMessage: {
          backgroundColor: "#E1E3E5",
          alignSelf: "flex-end",
      },
      iaMessage: {
          backgroundColor: "#FCAF1F",
          alignSelf: "flex-start",
      },
      myText: {
          color: "black",
      },
      iaText: {
          color: "black",
      },
      inputContainer: {
          flexDirection: "row",
          padding: 10,
          backgroundColor: "#fff",
          borderTopWidth: 1,
          borderTopColor: "#eee",
      },
      input: {
          flex: 1,
          backgroundColor: "#f5f5f5",
          borderRadius: 20,
          paddingHorizontal: 15,
          paddingVertical: 10,
          marginRight: 10,
      },
      sendButton: {
          backgroundColor: "#FCAF1F",
          borderRadius: 20,
          paddingHorizontal: 15,
          paddingVertical: 10,
          justifyContent: "center",
          alignItems: "center",
      },
      sendButtonText: {
          color: "white",
      },
  })