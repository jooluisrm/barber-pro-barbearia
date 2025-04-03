import axiosInstance from "@/utils/axiosInstance"
import { toast } from "sonner";

export type RegisterBarbeiro = {
    nome: string;
    email: string;
    senha: string;
    telefone: string;
    fotoPerfil?: string;
    barbeariaId: string;
}

export const registerBarbeiro = async (data: RegisterBarbeiro) => {
    try {
        const response = await axiosInstance.post(`/barbearia/barbeiro/register`, data);

        toast.success(response.data.message, {
            action: {
                label: "Fechar",
                onClick: () => console.log("Fechar"),
            },
        });

        return response.data;
    } catch (error: any) {
        const errorMessage = error.response?.data?.error || "Erro ao registrar barbeiro";

        toast.error(errorMessage, {
            action: {
                label: "Fechar",
                onClick: () => console.log("Fechar"),
            },
        });

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

type DataEdit = {
    nome: string;
    telefone: string;
    email: string;
}

export const editBarbeiro = async (barbeiroId: string, data: DataEdit) => {
    try {
        const response = await axiosInstance.put(`/barbearia/barbeiro/${barbeiroId}`, data);
        toast.success(response.data.message, {
            action: {
                label: "Fechar",
                onClick: () => console.log("Fechar"),
            },
        });
        return response.data;
    } catch (error: any) {
        const errorMessage = error.response?.data?.error || "Erro ao editar barbeiro";
        toast.error(errorMessage, {
            action: {
                label: "Fechar",
                onClick: () => console.log("Fechar"),
            },
        });
    }
}