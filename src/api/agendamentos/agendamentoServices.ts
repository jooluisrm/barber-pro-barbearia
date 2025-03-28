import axiosInstance from "@/utils/axiosInstance"

export const getAgendamentos = async (barbeariaId: string) => {
    try {
        const response = await axiosInstance.get(`/agendamento/${barbeariaId}`);
        return response.data;
    } catch (error: any) {
        throw error.response?.data?.error;
    }
}

export const editarAgendamento = async (agendamentoId: string, status: "Confirmado" | "Feito" | "Cancelado") => {
    try {
        const response = await axiosInstance.put(`/agendamento/status/${agendamentoId}`, { status });
        return response.data;
    } catch (error: any) {
        throw error.response?.data?.error || "Erro ao atualizar o agendamento";
    }
};
