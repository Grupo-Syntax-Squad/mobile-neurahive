import { Stack } from 'expo-router';

export default function Layout() {
  return (
    <Stack initialRouteName="login">
      <Stack.Screen name="login" options={{ headerShown: false }}/>
      <Stack.Screen name="index" options={{ headerShown: false }}/>
      <Stack.Screen name="users" options={{ title: "Usuários" }}/>
      <Stack.Screen name="agents" options={{ title: "Agents" }}/>
      <Stack.Screen name="accesses/page" options={{ title: "Acessos" }}/>
      <Stack.Screen name="Permissions/page" options={{ title: "Permissões" }}/>
      <Stack.Screen name="Agents/page" options={{ title: "Agentes" }}/>
      <Stack.Screen name="Agents/[id]" options={{ title: "Agente" }}/>
      <Stack.Screen name="Chat/page" options={{ title: "Selecione o Agente" }}/>
      <Stack.Screen name="Chat/[id]" options={{ title: "",}}/>
      <Stack.Screen name="users/create" options={{ title: "Criar Usuário" }}/>
      <Stack.Screen name="users/[id]" options={{ title: "Detalhes do Usuário" }}/>
      <Stack.Screen name="Permissions/[id]" options={{ title: "Permissões" }}/>
    </Stack>
  );
}