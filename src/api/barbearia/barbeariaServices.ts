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

export type DataProducts = {
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

export const putProduct = async (barbeariaId: string, produtoId: string, data: DataProducts) => {
    try {
        const response = await axiosInstance.put(`/barbearia/${barbeariaId}/produtos/${produtoId}`, data);
        toast.success(response.data.message, {
            action: {
                label: "Fechar",
                onClick: () => console.log("Fechar"),
            },
        });
        return response.data.produto;
    } catch (error: any) {
        const errorMessage = error.response?.data?.error || "Erro ao editar produto";
        toast.error(errorMessage, {
            action: {
                label: "Fechar",
                onClick: () => console.log("Fechar"),
            },
        });
    }
}

export const deleteProduct = async (barbeariaId: string, produtoId: string) => {
    try {
        const response = await axiosInstance.delete(`/barbearia/${barbeariaId}/produtos/${produtoId}`);
        toast.success(response.data.message, {
            action: {
                label: "Fechar",
                onClick: () => console.log("Fechar"),
            },
        });
    } catch (error: any) {
        const errorMessage = error.response?.data?.error || "Erro ao editar produto";
        toast.error(errorMessage, {
            action: {
                label: "Fechar",
                onClick: () => console.log("Fechar"),
            },
        });
    }
}

export const getSocialMedia = async (barbeariaId: string) => {
    try {
        const response = await axiosInstance.get(`/barbearia/${barbeariaId}/redes-sociais`);
        return response.data;
    } catch (error: any) {
        const errorMessage = error.response?.data?.error || "Erro ao carregar Redes Sociais";
        toast.error(errorMessage, {
            action: {
                label: "Fechar",
                onClick: () => console.log("Fechar"),
            },
        });
    }
}

export type DataSocialMedia = {
    link: string;
    rede?: string;
}

export const postSocialMedia = async (barbeariaId: string, data: DataSocialMedia) => {
    try {
        const response = await axiosInstance.post(`/barbearia/${barbeariaId}/redes-sociais`, data);
        toast.success(response.data.message, {
            action: {
                label: "Fechar",
                onClick: () => console.log("Fechar"),
            },
        });
        return response.data;
    } catch (error: any) {
        const errorMessage = error.response?.data?.error || "Erro ao criar Rede Social";
        toast.error(errorMessage, {
            action: {
                label: "Fechar",
                onClick: () => console.log("Fechar"),
            },
        });
    }
}

export const putSocialMedia = async (barbeariaId: string, socialMediaId: string, data: DataSocialMedia) => {
    try {
        const response = await axiosInstance.put(`/barbearia/${barbeariaId}/redes-sociais/${socialMediaId}`, data);
        toast.success(response.data.message, {
            action: {
                label: "Fechar",
                onClick: () => console.log("Fechar"),
            },
        });
    } catch (error: any) {
        const errorMessage = error.response?.data?.error || "Erro ao editar Rede Social";
        toast.error(errorMessage, {
            action: {
                label: "Fechar",
                onClick: () => console.log("Fechar"),
            },
        });
    }
}

export const deleteSocialMedia = async (barbeariaId: string, socialMediaId: string) => {
    try {
        const response = await axiosInstance.delete(`/barbearia/${barbeariaId}/redes-sociais/${socialMediaId}`);
        toast.success(response.data.message, {
            action: {
                label: "Fechar",
                onClick: () => console.log("Fechar"),
            },
        });
    } catch (error: any) {
        const errorMessage = error.response?.data?.error || "Erro ao deletar Rede Social";
        toast.error(errorMessage, {
            action: {
                label: "Fechar",
                onClick: () => console.log("Fechar"),
            },
        });
    }
}

export const getPayment = async (barbeariaId: string) => {
    try {
        const response = await axiosInstance.get(`/barbearia/${barbeariaId}/formas-pagamento`);
        return response.data;
    } catch (error: any) {
        const errorMessage = error.response?.data?.error || "Erro ao carregar Forma de pagamento";
        toast.error(errorMessage, {
            action: {
                label: "Fechar",
                onClick: () => console.log("Fechar"),
            },
        });
    }
}