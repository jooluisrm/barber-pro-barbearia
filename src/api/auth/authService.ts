import { useAuth } from '@/contexts/AuthContext';
import axiosInstance from '../../utils/axiosInstance';
import { toast } from 'sonner';

export interface RegisterData {
    nome: string;
    email: string;
    senha: string;
    celular: string;
    telefone?: string;
    endereco: string;
    latitude: string;
    longitude: string;
}

export const registerUser = async (data: RegisterData) => {
    try {
        const response = await axiosInstance.post("/barbearia/registrar", data);

        toast.success(response.data.message, {
            action: {
                label: "Fechar",
                onClick: () => console.log("Fechar"),
            },
        });

        return response.data;
    } catch (error: any) {
        const errorMessage = error.response?.data?.error || "Erro ao registrar usuário";

        toast.error(errorMessage, {
            action: {
                label: "Fechar",
                onClick: () => console.log("Fechar"),
            },
        });

        throw new Error(errorMessage);
    }
};

type PagamentoData = {
    nome: string,
    email: string,
    telefone?: string,
    taxId: string,
    plano: string,
    valorCentavos: number,
    celular: string,
    senha: string,
    endereco: string,
    latitude: string,
    longitude: string
}

export const criarPagamento = async (data: PagamentoData) => {
    console.log(data)
    try {
        const response = await axiosInstance.post("/pagamento/barbearia", data);
        console.log(data)
        console.log(response.data);
        return response.data;
    } catch (error: any) {
        const errorMessage = error.response?.data?.error || "Erro ao criar pagamento";

        toast.error(errorMessage, {
            action: {
                label: "Fechar",
                onClick: () => console.log("Fechar"),
            },
        });

        throw new Error(errorMessage);
    }
}

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