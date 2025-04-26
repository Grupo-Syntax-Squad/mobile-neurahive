import globalStyles from "@/app/styles/globalStyles"
import { View, StyleSheet, Text } from "react-native"

const FormField: React.FC<{ label: string; children: React.ReactNode }> = ({ label, children }) => (
    <View style={styles.formField}>
        <Text style={globalStyles.orangeText}>{label}</Text>
        {children}
    </View>
)

export default FormField

const styles = StyleSheet.create({
    formField: {
        marginBottom: 15,
        width: "100%",
    },
})
