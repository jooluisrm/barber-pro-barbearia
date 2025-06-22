"use client"

import { useEffect } from "react";
import { RightSection } from "./rightSection";
import { useAuth } from "@/contexts/AuthContext";
import axiosInstance from "@/utils/axiosInstance";
import { useRouter } from "next/navigation";

export const MainSucesso = () => {

    const auth = useAuth();
    const router = useRouter();

    useEffect(() => {
        // Esta função será executada assim que a página carregar
        const refreshUserData = async () => {
            console.log("Página de sucesso: buscando dados atualizados do usuário...");

            try {
                // Chama o nosso novo endpoint /api/auth/me
                const response = await axiosInstance.get('/api/auth/me');
                const updatedBarbearia = response.data;

                // Atualiza o AuthContext e o localStorage com os novos dados
                auth.updateBarbearia(updatedBarbearia);

                console.log("Dados do usuário atualizados com sucesso!", updatedBarbearia);

                // Opcional: redireciona o usuário para a página de assinaturas ou dashboard após a atualização
                setTimeout(() => {
                    router.push('/assinaturas');
                }, 5000); // Espera 5 segundos antes de redirecionar

            } catch (error) {
                console.error("Falha ao buscar dados atualizados do usuário.", error);
                // Se falhar, talvez redirecionar para a home mesmo assim
                router.push('/');
            }
        };

        refreshUserData();
    }, []); // O array vazio [] garante que isso rode apenas uma vez

    return (
        <main className="grid grid-cols-1 lg:grid-cols-2 justify-center">
            <RightSection />
            <img src="./successful.svg" alt="" className="flex-1" />
        </main>
    );
}