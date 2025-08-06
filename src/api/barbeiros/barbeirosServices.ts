import axiosInstance from "@/utils/axiosInstance"
import { toast } from "sonner";

export type RegisterBarbeiro = {
    nome: string;
    email: string;
    senha: string;
    telefone: string;
    fotoPerfil?: File; // Opcional, para tipar o que o formulário monta
    barbeariaId: string;
}

// 1. O tipo do parâmetro 'data' agora é FormData
export const registerBarbeiro = async (data: FormData) => {
    try {
        // 2. A rota do backend para registrar barbeiro
        const response = await axiosInstance.post(`/barbearia/barbeiro/register`, data, {
            // 3. É crucial definir o cabeçalho como 'multipart/form-data'
            // Isso avisa ao backend que estamos enviando arquivos junto com o texto.
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });

        toast.success(response.data.message || "Barbeiro cadastrado com sucesso!");

        return response.data;
    } catch (error: any) {
        const errorMessage = error.response?.data?.error || "Erro ao registrar barbeiro";

        toast.error(errorMessage, {
            action: {
                label: "Fechar",
                onClick: () => console.log("Fechar"),
            },
        });
        
        // É uma boa prática relançar o erro para que o componente possa tratá-lo se necessário
        throw error;
    }
}

export const getBarbeiros = async (barbeariaId: string) => {
    try {
        const response = await axiosInstance.get(`/barbearia/${barbeariaId}/profissionais`);
        return response.data;
    } catch (error: any) {
        throw error.response?.data?.error;
    }
}

export const deleteBarbeiro = async (barbeiroId: string) => {
    try {
        const response = await axiosInstance.delete(`/barbearia/barbeiro/${barbeiroId}`);
        toast.success(response.data.message, {
            action: {
                label: "Fechar",
                onClick: () => console.log("Fechar"),
            },
        });
        return response.data;
    } catch (error: any) {
        const errorMessage = error.response?.data?.error || "Erro ao deletar barbeiro";

        toast.error(errorMessage, {
            action: {
                label: "Fechar",
                onClick: () => console.log("Fechar"),
            },
        });
    }
}

export const editBarbeiro = async (barbeiroId: string, data: FormData) => {
    try {
        // 2. A rota do backend para editar o barbeiro
        const response = await axiosInstance.put(`/barbearia/barbeiro/${barbeiroId}`, data, {
            // 3. Definimos o cabeçalho para 'multipart/form-data'
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });

        toast.success(response.data.message || "Barbeiro atualizado com sucesso!");
        return response.data;

    } catch (error: any) {
        const errorMessage = error.response?.data?.error || "Erro ao editar barbeiro";
        toast.error(errorMessage);
        throw error; // Re-lança o erro para o componente poder tratar se necessário
    }
}

export const getHorariosDisponiveis = async (barbeiroId: string, data: string, hora: string) => {
    try {
        const response = await axiosInstance.get(`/barbeiro/${barbeiroId}/horarios/${data}/${hora}`);
        return response.data;
    } catch (error: any) {
        const errorMessage = error.response?.data?.error || "Erro ao carregar horários Disponíveis";
    }
}

export const getHorarioTrabalho = async (barbeiroId: string, diaSemana: string) => {
    try {
        const response = await axiosInstance.get(`/barbearia/barbeiro/${barbeiroId}/horarios/${diaSemana}`);
        return response.data;
    } catch (error: any) {
        const errorMessage = error.response?.data?.error || "Erro ao carregar horários";
        toast.error(errorMessage, {
            action: {
                label: "Fechar",
                onClick: () => console.log("Fechar"),
            },
        });
    }
}

type DataAddHorario = {
    diaSemana: number;
    hora: string;
}

export const addNewHorarioTrabalho = async (barbeiroId: string, data: DataAddHorario) => {
    try {
        const response = await axiosInstance.post(`/barbeiro/${barbeiroId}/horarios`, data);
        toast.success(response.data.message, {
            action: {
                label: "Fechar",
                onClick: () => console.log("Fechar"),
            },
        });
        return response.data;
    } catch (error: any) {
        const errorMessage = error.response?.data?.error || "Erro ao adicionar horario novo!";
        toast.error(errorMessage, {
            action: {
                label: "Fechar",
                onClick: () => console.log("Fechar"),
            },
        });
    }
}

type DataDeleteWorkTime = {
    horarios: {
      diaSemana: number;
      hora: string;
    }[];
  };
  
  export const deleteWorkTime = async (barbeiroId: string, data: DataDeleteWorkTime) => {
    try {
      const response = await axiosInstance.delete(`/barbeiro/${barbeiroId}/horarios`, {
        data,
      });
  
      toast.success(response.data.message, {
        action: {
          label: "Fechar",
          onClick: () => console.log("Fechar"),
        },
      });
  
      return response.data;
    } catch (error: any) {
      const errorMessage = error.response?.data?.error || "Erro ao deletar horários";
      toast.error(errorMessage, {
        action: {
          label: "Fechar",
          onClick: () => console.log("Fechar"),
        },
      });
    }
  };
  