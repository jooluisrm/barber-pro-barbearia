import axiosInstance from "@/utils/axiosInstance"

export const getBarbeiros = async (barbeariaId: string) => {
    try {
        const response = await axiosInstance.get(`/barbearia/${barbeariaId}/profissionais`);
        return response.data;
    } catch (error: any) {
        throw error.response?.data?.error;
    }
}