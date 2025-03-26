import { api_route } from '..';

export const deletarUsuario = async (id: number): Promise<void> => {

  try {
    const response = await fetch(`${api_route}/usuarios/${id}`, {
      method: 'DELETE',
    });

    if (!response.ok) {
      throw new Error(`Erro ao deletar o usuario: ${response.statusText}`);
    }

    console.log('Usuario deletado com sucesso');
  } catch (error) {
    console.error('Erro na requisição:', error);
    throw error;
  }
};