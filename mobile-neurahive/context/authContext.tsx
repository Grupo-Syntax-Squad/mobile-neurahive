import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import Token from '../types/token';
import UsuarioAuth from '../types/userAuth';
import { decode } from 'base-64';
import * as SecureStore from 'expo-secure-store';

interface AuthContextType {
  user: UsuarioAuth | null;
  token: string | null;
  decodedToken: Token | null;
  isAuthenticated: boolean;
  login: (token: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<UsuarioAuth | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [decodedToken, setDecodedToken] = useState<Token | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  const login = (token: string) => {
    try {
      const payload = token.split('.')[1];
      const decodedToken = JSON.parse(decode(payload));
      setDecodedToken(decodedToken);
      setUser({email: decodedToken.email, userId: decodedToken.sub, roles: decodedToken.roles});
      setToken(token);
      setIsAuthenticated(true);
    } catch(error) {
      console.error('Erro ao decodificar o token:', error);
    }
  };

  const logout = async () => {
    await SecureStore.deleteItemAsync("jwt_token")
    setUser(null);
    setIsAuthenticated(false);
  };

  const getToken = async () => {
    const token = await SecureStore.getItemAsync('jwt_token');
    return token;
  };

  useEffect(() => {
    const checkToken = async () => {
      const storedToken = await getToken();
      if (storedToken) {
        login(storedToken);
      }
    };

    checkToken();
  }, []);

  return (
    <AuthContext.Provider value={{ user, token, decodedToken, isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
