import { api_route } from "..";


interface Usuario {
    id: number;
    email: string;
    password: string;
    criado: string;
    alterado: string;
  }

  export const obterUsuarios = async (token: string): Promise<Usuario[]> => {
    try {
      const response = await fetch(`${api_route}usuarios`, {
        method: "GET",
        headers: {
          "Authorization": `Token ${token}`,
          "Content-Type": "application/json",
        },
      });
  
      if (!response.ok) {
        throw new Error(`Erro ao obter usuarios: ${response.statusText}`);
      }
  
      const data = await response.json();
      return data as Usuario[];
    } catch (error) {
      console.error("Erro na requisição:", error);
      throw error;
    }
  };
  
  export const obterUsuarioPorId = async (id: number): Promise<Usuario> => {
  
  
    try {
      const response = await fetch(`${api_route}usuarios/${id}`, {
        method: "GET",
      });
      
      if (!response.ok) {
        throw new Error(`Erro ao obter usuario: ${response.statusText}`);
      }
  
      const data = await response.json();
      return data as Usuario;
    } catch (error) {
      console.error("Erro na requisição:", error);
      throw error;
    }
  };