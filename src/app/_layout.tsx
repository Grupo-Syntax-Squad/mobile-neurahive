import { AuthProvider } from "@/context/authContext"
import { AxiosProvider } from "@/context/axiosContext"
import { Stack } from "expo-router"
import { View, Image, Text } from "react-native"
import WebSocketProvider from "./WebSocketContext"

export default function Layout() {
    return (
        <AuthProvider>
            <AxiosProvider>
            <WebSocketProvider>

                <Stack>
                    <Stack.Screen
                        name="Auth/login"
                        options={{ title: "Login", headerShown: false }}
                    />
                    <Stack.Screen
                        name="Auth/register"
                        options={{ title: "Cadastre-se", headerShown: false }}
                    />
                    <Stack.Screen name="index" options={{ headerShown: false }} />
                    <Stack.Screen
                        name="InicialSettings"
                        options={{ title: "Configurações Iniciais" }}
                    />
                    <Stack.Screen name="users/page" options={{ title: "Usuários" }} />
                    <Stack.Screen name="accesses/page" options={{ title: "Acessos" }} />
                    <Stack.Screen
                        name="permissions/page"
                        options={{ title: "Permissões dos Usuários" }}
                    />
                    <Stack.Screen name="users/create" options={{ title: "Criar Usuário" }} />
                    <Stack.Screen name="users/[id]" options={{ title: "Detalhes do Usuário" }} />
                    <Stack.Screen name="permissions/[id]" options={{ title: "Permissões" }} />
                    <Stack.Screen name="Agents/page" options={{ title: "Agentes" }} />
                    <Stack.Screen name="Agents/[id]" options={{ title: "Agente" }} />
                    <Stack.Screen name="Agents/create" options={{ title: "Nova agente de IA" }} />
                    <Stack.Screen name="Chat/page" options={{ title: "Minhas conversas" }} />
                    <Stack.Screen 
                        name="Chat/[id]" 
                        options={({ route }) => ({
                            headerTitle: () => (
                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                <Image
                                source={{ uri: "https://cdn-icons-png.flaticon.com/512/4712/4712038.png" }}
                                style={{ 
                                    width: 30, 
                                    height: 30, 
                                    borderRadius: 15, 
                                    marginRight: 10 
                                }}
                                />
                                <Text style={{ 
                                color: 'white', 
                                fontSize: 18, 
                                fontWeight: 'bold' 
                                }}>
                                {route.params?.agentName || 'Agente '}
                                </Text>
                            </View>
                            ),
                            headerStyle: {
                            backgroundColor: '#FCAF1F',
                            },
                            headerTintColor: '#fff',
                        })}
                        />
                    <Stack.Screen name="Chat/selectAgent" options={{ title: "Selecione o Agente" }} />
                </Stack>
                </WebSocketProvider>

            </AxiosProvider>
        </AuthProvider>
    )
}
