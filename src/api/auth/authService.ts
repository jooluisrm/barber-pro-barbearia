import { useAuth } from '@/contexts/AuthContext';
import axiosInstance from '../../utils/axiosInstance';
import { toast } from 'sonner';

export interface RegisterData {
    nome: string;
    email: string;
    senha: string;
    celular: string;
    telefone: string;
    endereco: string;
    latitude: string;
    lontitude: string;
}

export const registerUser = async (data: RegisterData) => {
    try {
        const response = await axiosInstance.post('/barbearia/register', data);
        return (
            toast(response.data.message, {
                action: {
                    label: "Fechar",
                    onClick: () => console.log("Undo")
                }
            })
        ); // Retorna a resposta de sucesso

    } catch (error: any) {
        // Verificando se a resposta do erro existe e acessando de forma segura
        const errorMessage = error.response?.data?.error || 'Erro ao registrar usuário';
        toast(errorMessage, {
            action: {
                label: "Fechar",
                onClick: () => console.log("Undo")
            }
        });
    }
};

export interface LoginData {
    email: string;
    senha: string;
}

export const loginUser = async (data: LoginData) => {
    try {
        const response = await axiosInstance.post('/barbearia/login', data);
        console.log("Resposta da API:", response.data);

        return response.data; // Retorna os dados diretamente
    } catch (error: any) {
        console.error("Erro ao fazer login:", error);
        throw new Error(error.response?.data?.error || "Erro ao fazer login");
    }
};