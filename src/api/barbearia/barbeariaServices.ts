import axiosInstance from "@/utils/axiosInstance"
import { toast } from "sonner";

export const getServices = async (barbeariaId: string) => {
    try {
        const response = await axiosInstance.get(`/barbearia/${barbeariaId}/servicos`);
        return response.data;
    } catch (error: any) {
        const errorMessage = error.response?.data?.error || "Erro ao Carregar Serviços";
        toast.error(errorMessage, {
            action: {
                label: "Fechar",
                onClick: () => console.log("Fechar"),
            },
        });
    }
}

type DataService = {
    nome: string;
    duracao: number;
    preco?: string;
}

export const postService = async (barbeariaId: string, data: DataService) => {
    try {
        const response = await axiosInstance.post(`/barbearia/${barbeariaId}/servicos`, data);
        toast.success(response.data.message, {
            action: {
                label: "Fechar",
                onClick: () => console.log("Fechar"),
            },
        });
        return response.data.servico
    } catch (error: any) {
        const errorMessage = error.response?.data?.error || "Erro ao criar novo serviço";
        toast.error(errorMessage, {
            action: {
                label: "Fechar",
                onClick: () => console.log("Fechar"),
            },
        });
    }
}

export const putService = async (barbeariaId: string, servicoId: string, data: DataService) => {
    try {
        const response = await axiosInstance.put(`/barbearia/${barbeariaId}/servicos/${servicoId}`, data);
        toast.success(response.data.message, {
            action: {
                label: "Fechar",
                onClick: () => console.log("Fechar"),
            },
        });
    } catch (error: any) {
        const errorMessage = error.response?.data?.error || "Erro ao editar serviço";
        toast.error(errorMessage, {
            action: {
                label: "Fechar",
                onClick: () => console.log("Fechar"),
            },
        });
    }
}

export const deleteService = async (barbeariaId: string, servicoId: string) => {
    try {
        const response = await axiosInstance.delete(`/barbearia/${barbeariaId}/servicos/${servicoId}`);
        toast.success(response.data.message, {
            action: {
                label: "Fechar",
                onClick: () => console.log("Fechar"),
            },
        });
    } catch (error: any) {
        const errorMessage = error.response?.data?.error || "Erro ao editar serviço";
        toast.error(errorMessage, {
            action: {
                label: "Fechar",
                onClick: () => console.log("Fechar"),
            },
        });
    }
}

export const getProducts = async (barbeariaId: string) => {
    try {
        const response = await axiosInstance.get(`/barbearia/${barbeariaId}/produtos`);
        return response.data;
    } catch (error: any) {
        const errorMessage = error.response?.data?.error || "Erro ao Carregar produtos";
        toast.error(errorMessage, {
            action: {
                label: "Fechar",
                onClick: () => console.log("Fechar"),
            },
        });
    }
}

type DataProducts = {
    nome: string;
    descricao?: string;
    preco: number;
    tipo: string;
    imagemUr?: string | null;
    estoque?: boolean;
}

export const postProduct = async (barbeariaId: string, data: DataProducts) => {
    try {
        const response = await axiosInstance.post(`/barbearia/${barbeariaId}/produtos`, data);
        toast.success(response.data.message, {
            action: {
                label: "Fechar",
                onClick: () => console.log("Fechar"),
            },
        });
        return response.data.produto;
    } catch (error: any) {
        const errorMessage = error.response?.data?.error || "Erro ao criar novo produto";
        toast.error(errorMessage, {
            action: {
                label: "Fechar",
                onClick: () => console.log("Fechar"),
            },
        });
    }
}