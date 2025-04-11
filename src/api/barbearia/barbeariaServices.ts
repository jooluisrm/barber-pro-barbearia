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