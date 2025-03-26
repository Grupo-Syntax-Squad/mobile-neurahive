import { api_route } from '..';

interface Usuario {
  id: number;
  email: string;
  password: string;
}

export const atualizarUsuario = async (usuario: Usuario): Promise<any> => {
  try {

    const response = await fetch(`${api_route}/usuarios/${usuario.id}`, {
      method: 'PUT',
      body: JSON.stringify(usuario),
    });

    if (!response.ok) {
      throw new Error(`Erro ao atualizar o usuario: ${response.statusText}`);
    }

    const data = await response.json();
    return data as Usuario[];
  } catch (error) {
    console.error('Erro na requisição:', error);
    throw error;
  }
};