import axiosInstance from "@/utils/axiosInstance"
import { toast } from "sonner";

export const getServices = async (barbeariaId: string) => {
    try {
        const response = await axiosInstance.get(`/barbearia/${barbeariaId}/servicos`);
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
}

type DataPostService = {
    nome: string;
    duracao: number;
    preco?: string;
}

export const postService = async (barbeariaId: string, data: DataPostService) => {
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
        const errorMessage = error.response?.data?.error || "Erro ao deletar horários";
        toast.error(errorMessage, {
            action: {
                label: "Fechar",
                onClick: () => console.log("Fechar"),
            },
        });
    }
}