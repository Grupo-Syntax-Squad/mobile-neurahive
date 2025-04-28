import { View, Text, StyleSheet, ActivityIndicator, Modal } from "react-native"

interface UploadingOverlayProps {
  visible: boolean
  message?: string
}

export const UploadingOverlay = ({ visible, message }: UploadingOverlayProps) => {
  return (
    <Modal transparent animationType="fade" visible={visible}>
      <View style={styles.overlay}>
        <View style={styles.box}>
          <ActivityIndicator size="large" color="#FFA500" />
          <Text style={styles.text}>{message || "Enviando arquivo..."}</Text>
        </View>
      </View>
    </Modal>
  )
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  box: {
    backgroundColor: "white",
    padding: 30,
    borderRadius: 15,
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    marginTop: 15,
    fontSize: 16,
    color: "#333",
  },
})
