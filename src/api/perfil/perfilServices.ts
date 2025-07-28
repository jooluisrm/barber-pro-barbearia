import axiosInstance from "@/utils/axiosInstance";
import { toast } from "sonner";

type dataType = {
    nome: string;
    email: string;
}

export const editNomeEmail = async (usuarioId: string, data: dataType) => {
    try {
        const response = await axiosInstance.patch(`/barbearia/usuarios-sistema/${usuarioId}`, data);
        toast.success(response.data.message, {
            action: {
                label: "Fechar",
                onClick: () => console.log("Fechar"),
            },
        });
        return response.data;
    } catch (error: any) {
        const errorMessage = error.response?.data?.error || "Erro alterar nome/e-mail!";
        toast.error(errorMessage, {
            action: {
                label: "Fechar",
                onClick: () => console.log("Fechar"),
            },
        });
    }
}

type dataTypeSenha = {
    currentPassword: string;
    newPassword: string;
}

export const editSenha = async (usuarioId: string, data: dataTypeSenha) => {
    try {
        const response = await axiosInstance.patch(`/barbearia/usuarios-sistema/${usuarioId}/alterar-senha`, data);
        toast.success(response.data.message, {
            action: {
                label: "Fechar",
                onClick: () => console.log("Fechar"),
            },
        });
        return response.data;
    } catch (error: any) {
        const errorMessage = error.response?.data?.error || "Erro ao alterar senha!";
        toast.error(errorMessage, {
            action: {
                label: "Fechar",
                onClick: () => console.log("Fechar"),
            },
        });
    }
}