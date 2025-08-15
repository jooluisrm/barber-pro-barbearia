import axiosInstance from "@/utils/axiosInstance"
import { format } from "date-fns";
import { toast } from "sonner";

interface AgendamentoFilters {
    data?: Date | null;
    barbeiroId?: string | null;
    status?: string | null;
}

// Função UNIFICADA para buscar agendamentos
export const getAgendamentos = async (barbeariaId: string, filters: AgendamentoFilters) => {
    const queryParams = new URLSearchParams();

    if (filters.data) {
        queryParams.append('data', format(filters.data, 'yyyy-MM-dd'));
    }
    if (filters.barbeiroId && filters.barbeiroId !== 'todos') {
        queryParams.append('barbeiroId', filters.barbeiroId);
    }
    if (filters.status && filters.status !== 'todos') {
        // O backend espera o status capitalizado
        const statusCapitalized = filters.status.charAt(0).toUpperCase() + filters.status.slice(1);
        queryParams.append('status', statusCapitalized);
    }

    try {
        // A rota que busca todos os agendamentos da barbearia
        const response = await axiosInstance.get(`/barbearia/agendamentos/${barbeariaId}?${queryParams.toString()}`);
        return response.data;
    } catch (error: any) {
        console.error("Erro ao buscar agendamentos:", error);
        throw error.response?.data?.error || "Erro ao carregar agendamentos";
    }
}

export const getAgendamentosBarbeiro = async (barbeiroId: string) => {
    try {
        const response = await axiosInstance.get(`/barbearia/agendamentos/barbeiro/${barbeiroId}`);
        return response.data;
    } catch (error: any) {
        throw error.response?.data?.error;
    }
}

export const editarAgendamento = async (agendamentoId: string, status: "Confirmado" | "Feito" | "Cancelado") => {
    try {
        const response = await axiosInstance.put(`/barbearia/agendamento/status/${agendamentoId}`, { status });
        toast.success(`O status do agendamento foi atualizado.`, {
            action: {
                label: "Fechar",
                onClick: () => console.log("Fechar"),
            }
        });
        return response.data;
    } catch (error: any) {
        throw error.response?.data?.error || "Erro ao atualizar o agendamento";
    }
};

export type DataNewAgendamento = {
    barbeariaId: string;
    barbeiroId: string;
    servicoId: string;
    data: string;
    hora: string;
}

export const postAgendamento = async (data: DataNewAgendamento) => {
    try {
        const response = await axiosInstance.post(`/barbearia/agendamentos/visitante`, data);
        toast.success(`O agendamento foi feito com sucesso!.`, {
            action: {
                label: "Fechar",
                onClick: () => console.log("Fechar"),
            }
        });
    } catch (error: any) {
        const errorMessage = error.response?.data?.error || "Erro ao criar novo agendamento!";
        toast.error(errorMessage, {
            action: {
                label: "Fechar",
                onClick: () => console.log("Fechar"),
            },
        });
    }
}

export const getAgendamentosPendentes = async (barbeariaId: string) => {
    try {
        const response = await axiosInstance.get(`/barbearia/agendamentos/pendente/${barbeariaId}`);
        return response.data;
    } catch (error: any) {
        throw error.response?.data?.error;
    }
}

export const getAgendamentosPendentesBarbeiro = async (barbeiroId: string) => {
    try {
        const response = await axiosInstance.get(`/barbearia/agendamentos/pendente/barbeiro/${barbeiroId}`);
        return response.data;
    } catch (error: any) {
        throw error.response?.data?.error;
    }
}

export const patchConcluirAgendamento = async (barbeariaId: string, agendamentoId: string) => {
    try {
        const response = await axiosInstance.patch(`/barbearia/${barbeariaId}/agendamentos/${agendamentoId}/concluir`);
        toast.success(`O status do agendamento foi atualizado.`, {
            action: {
                label: "Fechar",
                onClick: () => console.log("Fechar"),
            }
        });
        return response.data;
    } catch (error: any) {
        throw error.response?.data?.error || "Erro ao concluir o agendamento";
    }
};

export const patchCancelarAgendamento = async (barbeariaId: string, agendamentoId: string) => {
    try {
        const response = await axiosInstance.patch(`/barbearia/${barbeariaId}/agendamentos/${agendamentoId}/cancelar`);
        toast.success(`O status do agendamento foi atualizado.`, {
            action: {
                label: "Fechar",
                onClick: () => console.log("Fechar"),
            }
        });
        return response.data;
    } catch (error: any) {
        throw error.response?.data?.error || "Erro ao cancelar o agendamento";
    }
};