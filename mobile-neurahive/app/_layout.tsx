import { AuthProvider } from "@/context/authContext"
import { AxiosProvider } from "@/context/axiosContext"
import { Stack } from "expo-router"

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
                    <Stack.Screen
                        name="index"
                        options={{ headerShown: false }}
                    />
                    <Stack.Screen
                        name="InicialSettings"
                        options={{ title: "Configurações Iniciais" }}
                    />
                    <Stack.Screen
                        name="users/page"
                        options={{ title: "Usuários" }}
                    />
                    <Stack.Screen
                        name="accesses/page"
                        options={{ title: "Acessos" }}
                    />
                    <Stack.Screen
                        name="Permissions/page"
                        options={{ title: "Permissões dos Usuários" }}
                    />
                    <Stack.Screen
                        name="users/create"
                        options={{ title: "Criar Usuário" }}
                    />
                    <Stack.Screen
                        name="users/[id]"
                        options={{ title: "Detalhes do Usuário" }}
                    />
                    <Stack.Screen
                        name="Permissions/[id]"
                        options={{ title: "Permissões" }}
                    />
                    <Stack.Screen name="agents" options={{ title: "Agents" }} />
                    <Stack.Screen
                        name="Agents/page"
                        options={{ title: "Agentes" }}
                    />
                    <Stack.Screen
                        name="Agents/[id]"
                        options={{ title: "Agente" }}
                    />
                    <Stack.Screen
                        name="Agents/create"
                        options={{ title: "Nova agente de IA" }}
                    />
                    <Stack.Screen
                        name="Chat/page"
                        options={{ title: "Selecione o Agente" }}
                    />
                    <Stack.Screen name="Chat/[id]" options={{ title: "" }} />
                </Stack>
            </AxiosProvider>
        </AuthProvider>
    )
}
