import axiosInstance from "@/utils/axiosInstance"
import { toast } from "sonner";

export const getAgendamentos = async (barbeariaId: string) => {
    try {
        const response = await axiosInstance.get(`/barbearia/agendamentos/${barbeariaId}`);
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