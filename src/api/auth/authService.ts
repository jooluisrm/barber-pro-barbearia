import { useAuth } from '@/contexts/AuthContext';
import axiosInstance from '../../utils/axiosInstance';
import { toast } from 'sonner';

export interface RegisterData {
    nomeBarbearia: string;
    endereco: string;
    celular: string;
    telefone?: string; // <-- ADICIONE ESTA LINHA (com '?')
    latitude: string;
    longitude: string;
    nomeAdmin: string;
    emailAdmin: string;
    senhaAdmin: string;
}

// FUNÇÃO ATUALIZADA para registrar
export const registerUser = async (data: RegisterData) => {
    try {
        // A rota agora é a que criamos, ex: /registrar-barbershop ou /registrar
        const response = await axiosInstance.post("/barbearia/registrar", data);

        toast.success(response.data.message);
        return response.data;
    } catch (error: any) {
        const errorMessage = error.response?.data?.message || "Erro ao registrar barbearia";
        toast.error(errorMessage);
        throw new Error(errorMessage);
    }
};

// --- A PARTE DE LOGIN NÃO MUDA AQUI, MAS SIM NO CONTEXTO ---
export interface LoginData {
    email: string;
    senha: string;
}

export const loginUser = async (data: LoginData) => {
    try {
        const response = await axiosInstance.post('/barbearia/login', data);
        // A resposta agora é { message, usuario, token }
        return response.data;
    } catch (error: any) {
        const errorMessage = error.response?.data?.error || "Erro ao fazer login";
        // Lançamos o erro para ser tratado no componente que chama a função
        throw new Error(errorMessage);
    }
};