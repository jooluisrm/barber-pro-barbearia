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
