import axiosInstance from "@/utils/axiosInstance"

export const getAgendamentos = async (barbeariaId: string) => {
    try {
        const response = await axiosInstance.get(`/agendamento/${barbeariaId}`);
        return response.data;
    } catch (error: any) {
        throw error.response?.data?.error;
    }
}