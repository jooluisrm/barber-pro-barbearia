import axiosInstance from "@/utils/axiosInstance"
import { toast } from "sonner";

export const getServices = async (barbeariaId: string) => {
    try {
        const response = await axiosInstance.get(`/barbearia/${barbeariaId}/adm/servicos`);
        return response.data;
    } catch (error: any) {
        const errorMessage = error.response?.data?.error || "Erro ao Carregar Serviços";
    }
}

type DataService = {
    nome: string;
    duracao: number;
    preco?: string;
    imagem?: File; 
}

export const postService = async (barbeariaId: string, data: FormData) => {
    try {
        // Passamos o FormData diretamente para o axios
        const response = await axiosInstance.post(`/barbearia/${barbeariaId}/servicos`, data, {
            // É crucial dizer ao axios que o conteúdo é multipart/form-data
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        
        toast.success(response.data.message || "Serviço criado com sucesso!");
        return response.data.servico;

    } catch (error: any) {
        const errorMessage = error.response?.data?.error || "Erro ao criar novo serviço";
        toast.error(errorMessage);
        // Lançar o erro novamente para que o componente possa tratá-lo se necessário
        throw error;
    }
}

export const putService = async (barbeariaId: string, servicoId: string, data: FormData) => {
    try {
        // A rota para editar um serviço específico
        const response = await axiosInstance.put(`/barbearia/${barbeariaId}/servicos/${servicoId}`, data, {
            // Novamente, especificamos o Content-Type para o upload de arquivos
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        
        toast.success(response.data.message || "Serviço atualizado com sucesso!");
        return response.data;

    } catch (error: any) {
        const errorMessage = error.response?.data?.error || "Erro ao editar serviço";
        toast.error(errorMessage);
        throw error;
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
        // A URL não precisa mais do barbeariaId, pois o backend usa o do token
        const response = await axiosInstance.get(`/barbearia/qualquer-coisa/adm/produtos`);
        return response.data;
    } catch (error: any) {
        const errorMessage = error.response?.data?.error || "Erro ao Carregar produtos";
        // É bom retornar o erro para que a interface possa reagir
        throw new Error(errorMessage);
    }
}

export const postProduct = async (barbeariaId: string, data: FormData) => {
    try {
        // A rota que você pediu para não mudar
        const response = await axiosInstance.post(`/barbearia/${barbeariaId}/produtos`, data, {
            // Cabeçalho para informar o backend sobre o tipo de conteúdo
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });

        toast.success(response.data.message || "Produto criado com sucesso!");
        return response.data.produto;

    } catch (error: any) {
        const errorMessage = error.response?.data?.error || "Erro ao criar novo produto";
        toast.error(errorMessage);
        throw error;
    }
}

export const putProduct = async (barbeariaId: string, produtoId: string, data: FormData) => {
    try {
        // 2. A rota do backend para editar o produto
        const response = await axiosInstance.put(`/barbearia/${barbeariaId}/produtos/${produtoId}`, data, {
            // 3. Define o cabeçalho para 'multipart/form-data'
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });

        toast.success(response.data.message || "Produto atualizado com sucesso!");
        return response.data.produto;

    } catch (error: any) {
        const errorMessage = error.response?.data?.error || "Erro ao editar produto";
        toast.error(errorMessage);
        throw error;
    }
}

export const deleteProduct = async (barbeariaId: string, produtoId: string) => {
    try {
        const response = await axiosInstance.delete(`/barbearia/${barbeariaId}/produtos/${produtoId}`);
        toast.success(response.data.message || "Produto arquivado com sucesso!");
    } catch (error: any) {
        // CORRIGINDO A MENSAGEM DE ERRO
        const errorMessage = error.response?.data?.error || "Erro ao arquivar o produto";
        toast.error(errorMessage);
        throw error; // Lança o erro para que o componente possa saber que falhou
    }
}

export const getSocialMedia = async (barbeariaId: string) => {
    try {
        const response = await axiosInstance.get(`/barbearia/${barbeariaId}/adm/redes-sociais`);
        return response.data;
    } catch (error: any) {
        const errorMessage = error.response?.data?.error || "Erro ao carregar Redes Sociais";
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
        return response.data;
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
        const response = await axiosInstance.get(`/barbearia/${barbeariaId}/adm/formas-pagamento`);
        return response.data;
    } catch (error: any) {
        const errorMessage = error.response?.data?.error || "Erro ao carregar Forma de pagamento";
    }
}

type DataPayment = {
    tipo: string;
}

export const postPayment = async (barbeariaId: string, data: DataPayment) => {
    try {
        const response = await axiosInstance.post(`/barbearia/${barbeariaId}/formas-pagamento`, data);
        toast.success(response.data.message, {
            action: {
                label: "Fechar",
                onClick: () => console.log("Fechar"),
            },
        });
        return response.data;
    } catch (error: any) {
        const errorMessage = error.response?.data?.error || "Erro ao criar Forma de pagamento";
        toast.error(errorMessage, {
            action: {
                label: "Fechar",
                onClick: () => console.log("Fechar"),
            },
        });
    }
}

export const deletePayment = async (barbeariaId: string, formaPagamentoId: string) => {
    try {
        const response = await axiosInstance.delete(`/barbearia/${barbeariaId}/formas-pagamento/${formaPagamentoId}`);
        toast.success(response.data.message, {
            action: {
                label: "Fechar",
                onClick: () => console.log("Fechar"),
            },
        });
    } catch (error: any) {
        const errorMessage = error.response?.data?.error || "Erro ao deletar Forma de pagamento";
        toast.error(errorMessage, {
            action: {
                label: "Fechar",
                onClick: () => console.log("Fechar"),
            },
        });
    }
}

export const getOpeningHours = async (barbeariaId: string) => {
    try {
        const response = await axiosInstance.get(`/barbearia/${barbeariaId}/adm/horarios-funcionamento`);
        return response.data;
    } catch (error: any) {
        const errorMessage = error.response?.data?.error || "Erro ao carregar Horario de funcionamento";
    }
}

export type DataOpeningHours = {
    diaSemana?: number;
    horaInicio: string;
    horaFim: string;
}

export const postOpeningHours = async (barbeariaId: string, data: DataOpeningHours) => {
    try {
        const response = await axiosInstance.post(`/barbearia/${barbeariaId}/horario-funcionamento`, data);
        toast.success(response.data.message, {
            action: {
                label: "Fechar",
                onClick: () => console.log("Fechar"),
            },
        });
        return response.data;
    } catch (error: any) {
        const errorMessage = error.response?.data?.error || "Erro ao criar Horario de funcionamento";
        toast.error(errorMessage, {
            action: {
                label: "Fechar",
                onClick: () => console.log("Fechar"),
            },
        });
    }
}

export const putOpeningHours = async (barbeariaId: string, horarioId: string, data: DataOpeningHours) => {
    try {
        const response = await axiosInstance.put(`/barbearia/${barbeariaId}/horario-funcionamento/${horarioId}`, data);
        toast.success(response.data.message, {
            action: {
                label: "Fechar",
                onClick: () => console.log("Fechar"),
            },
        });
        return response.data;
    } catch (error: any) {
        const errorMessage = error.response?.data?.error || "Erro ao editar Horario de funcionamento";
        toast.error(errorMessage, {
            action: {
                label: "Fechar",
                onClick: () => console.log("Fechar"),
            },
        });
    }
}

export const deleteOpeningHours = async (barbeariaId: string, horarioId: string) => {
    try {
        const response = await axiosInstance.delete(`/barbearia/${barbeariaId}/horario-funcionamento/${horarioId}`);
        toast.success(response.data.message, {
            action: {
                label: "Fechar",
                onClick: () => console.log("Fechar"),
            },
        });
    } catch (error: any) {
        const errorMessage = error.response?.data?.error || "Erro ao deletar Horario de funcionamento";
        toast.error(errorMessage, {
            action: {
                label: "Fechar",
                onClick: () => console.log("Fechar"),
            },
        });
    }
}

export const getBarberShop = async (barbeariaId: string) => {
    try {
        const response = await axiosInstance.get(`/barbearia/barbershop/${barbeariaId}`);
        return response.data;
    } catch (error: any) {
        
    }
}

export const putBarberShop= async (data: FormData) => {
    try {
        const response = await axiosInstance.put('/barbearia/barbershop', data, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        toast.success(response.data.message || "Barbearia atualizada com sucesso!");
        return response.data;
    } catch (error: any) {
        const errorMessage = error.response?.data?.error || "Erro ao atualizar a barbearia.";
        toast.error(errorMessage);
        throw error;
    }
};