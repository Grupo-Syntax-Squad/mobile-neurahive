import { AuthProvider } from "@/contexts/authContext"
import { AxiosProvider } from "@/contexts/axiosContext"
import { Stack } from "expo-router"
import { View, Image, Text } from "react-native"

export default function Layout() {
    
    return (
        <AuthProvider>
            <AxiosProvider>
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
                    <Stack.Screen name="Agents/[id]" options={{ title: "Editar Agente" }} />
                    <Stack.Screen name="Agents/create" options={{ title: "Nova agente de IA" }} />
                    <Stack.Screen name="Chat/page" options={{ title: "Minhas conversas" }} />
                    <Stack.Screen name="Dashboard/page" options={{ title: "Dashboard" }} />
                    <Stack.Screen name="Dashboard/Users/page" options={{ title: "Dashboard | Usuários" }} />
                    <Stack.Screen name="Dashboard/Agents/page" options={{ title: "Dashboard | Agentes" }} />
                    <Stack.Screen name="Dashboard/Chats/page" options={{ title: "Dashboard | Conversas" }} />

                    <Stack.Screen
                        name="Chat/[id]"
                        options={({ route }: { route: any }) => ({
                            headerTitle: () => (
                                <View style={{ flexDirection: "row", alignItems: "center" }}>
                                    <Image
                                        source={require("../assets/images/agente4.png")}
                                        style={{
                                            width: 50,
                                            height: 50,
                                            borderRadius: 25,
                                            marginRight: 10,
                                        }}
                                    />
                                    <Text
                                        style={{
                                            color: "white",
                                            fontSize: 18,
                                            fontWeight: "bold",
                                        }}
                                    >
                                        {route.params?.agentName || "Agente "}
                                    </Text>
                                </View>
                            ),
                            headerStyle: {
                                backgroundColor: "#FCAF1F",
                            },
                            headerTintColor: "#fff",
                        })}
                    />
                    <Stack.Screen
                        name="Chat/selectAgent"
                        options={{ title: "Selecione o Agente" }}
                    />
                    <Stack.Screen
                        name="KnowledgeBase/page"
                        options={{ title: "Bases de conhecimento" }}
                    />
                    <Stack.Screen
                        name="KnowledgeBase/[id]"
                        options={{ title: "Detalhes da base de conhecimento" }}
                    />
                </Stack>
            </AxiosProvider>
        </AuthProvider>
    )
}
