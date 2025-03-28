import { StyleSheet, Image, Text, View, TouchableOpacity, ScrollView } from 'react-native';
import { Link, useRouter } from 'expo-router';
import { globalStyles } from "./styles/globalStyles";
import React from 'react';
import ProtectedRoute from '@/components/ProtectedRoute';
import { Role } from '@/enum/Role';

type User = {
  id: string;
  name: string;
  email: string;
};

export function Users() {
  const router = useRouter();
  
  const users: User[] = [
    { id: '1', name: 'Usuário 1', email: 'usuario1@email.com' },
    { id: '2', name: 'Usuário 2', email: 'usuario2@email.com' },
    { id: '3', name: 'Usuário 3', email: 'usuario3@email.com' },
  ];

  const actionButtons = [
    { 
      text: 'Acessos', 
      onPress: () => router.push("/accesses/page"),
      testID: 'accesses-button'
    },
    { 
      text: 'Criar novo usuário', 
      onPress: () => router.push("/users/create"),
      testID: 'create-user-button'
    },
    { 
      text: 'Permissões dos Usuários', 
      onPress: () => router.push("/permissions/page"),
      testID: 'permissions-button'
    }
  ];

  return (
    <ProtectedRoute allowedRoles={[Role.ADMIN]}>
      <ScrollView 
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={styles.scrollContainer}
      >
        <View style={globalStyles.header}>
          <Text>Seus Usuários</Text>
        <Image source={require('../assets/images/usuarios.png')}></Image>
        </View>

        <View style={styles.actionsContainer}>
          {actionButtons.map((button, index) => (
            <TouchableOpacity
              key={index}
              style={globalStyles.orangeButton}
              onPress={button.onPress}
              testID={button.testID}
            >
              <Text style={globalStyles.WhiteText}>{button.text}</Text>
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.usersList}>
          {users.map((user) => (
            <UserCard key={user.id} user={user} />
          ))}
        </View>
      </ScrollView>
    </ProtectedRoute>
  );
}

const UserCard: React.FC<{ user: User }> = ({ user }) => (
  <View style={styles.userContainer}>
    <Text style={styles.userName}>{user.name}</Text>
    <Text style={styles.userEmail}>{user.email}</Text>
    <TouchableOpacity style={styles.userDetailButton}>
      <Link href={`/users/${user.id}`}>
        <Text style={globalStyles.WhiteText}>Detalhes</Text>
      </Link>
    </TouchableOpacity>
  </View>
);

const styles = StyleSheet.create({
  scrollContainer: {
    padding: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  headerText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  headerImage: {
    width: 40,
    height: 40,
  },
  actionsContainer: {
    gap: 12,
    marginBottom: 24,
  },
  usersList: {
    gap: 16,
  },
  userContainer: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 16,
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  userName: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 4,
  },
  userEmail: {
    backgroundColor: '#FFF8F2',
    borderColor: '#FC801F',
    borderWidth: 1,
    borderRadius: 6,
    padding: 8,
    marginBottom: 12,
    color: '#333',
  },
  userDetailButton: {
    backgroundColor: '#FC801F',
    padding: 10,
    borderRadius: 6,
    alignSelf: 'flex-start',
    minWidth: 100,
    alignItems: 'center',
  },
});

export default Users;