import { Link, router } from "expo-router"
import { Image, StyleSheet, View, Text, TouchableOpacity } from "react-native"
import { globalStyles } from "../styles/globalStyles"

export default function Agentes() {
    return (
        <View>
            <View style={globalStyles.agentContainer}>
                <TouchableOpacity
                    style={globalStyles.agentBox}
                    onPress={() => router.push("/Chat/[id]")}
                >
                    <Image
                        source={require("../../assets/images/apicultora.png")}
                    />
                    <Text>Ive</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({})
