import { api_route } from "..";

interface Usuario {
    email: string;
    password: string;
  }
  
  export const criarUsuario = async (usuario: Usuario, token: any): Promise<any> => {
    try {

      const response = await fetch(`${api_route}usuarios`, {
        method: "POST",
        body: JSON.stringify(usuario),
      });
  
      if (!response.ok) {
        throw new Error(`Erro ao criar o usuario: ${response.statusText}`);
      }
  
      return await response.json();
    } catch (error) {
      console.error("Erro na requisição:", error);
      throw error; 
    }
  };