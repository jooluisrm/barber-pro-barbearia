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

export const updateProfilePicture = async (imageFile: File) => {
    // 1. Criar o FormData
    const formData = new FormData();
    formData.append('fotoPerfil', imageFile); // 'fotoPerfil' corresponde ao upload.single() no backend

    try {
        // 2. Chamar a nova rota com o FormData
        const response = await axiosInstance.post('barbearia/usuarios-sistema/picture', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });

        toast.success(response.data.message || "Foto de perfil atualizada!");
        return response.data; // Retorna { message, fotoPerfilUrl }

    } catch (error: any) {
        const errorMessage = error.response?.data?.error || "Erro ao atualizar a foto.";
        toast.error(errorMessage);
        throw error;
    }
};