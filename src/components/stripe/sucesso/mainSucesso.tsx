// pages/sucesso.tsx (ou onde seu componente estiver)

"use client"

import { useEffect } from "react";
import { RightSection } from "./rightSection"; // Seu componente
import { useAuth } from "@/contexts/AuthContext";
import axiosInstance from "@/utils/axiosInstance";
import { useRouter } from "next/navigation";

export const MainSucesso = () => {
    // 1. Pegamos as duas funções de update do nosso contexto
    const { updateUsuario, updateBarbearia } = useAuth();
    const router = useRouter();

    useEffect(() => {
        const refreshUserData = async () => {
            console.log("Página de sucesso: buscando dados atualizados do usuário...");

            try {
                // 2. A chamada à API continua a mesma. A resposta é o objeto 'usuario' completo.
                const response = await axiosInstance.get('/api/auth/me');
                const updatedUsuario = response.data; // ex: { id, nome, email, role, barbearia: { nome, stripe... } }

                // 3. ATUALIZAMOS O ESTADO 'USUARIO' com os dados frescos e completos.
                // Esta é a nossa nova fonte da verdade.
                updateUsuario(updatedUsuario);

                // 4. CRIAMOS O OBJETO 'BARBEARIA' PARA COMPATIBILIDADE, assim como no login.
                const barbeariaCompativel = {
                    id: updatedUsuario.barbeariaId,
                    nome: updatedUsuario.barbearia.nome,
                    email: updatedUsuario.email,
                    telefone: updatedUsuario.perfilBarbeiro?.telefone || '', 
                    fotoPerfil: updatedUsuario.fotoPerfil,
                    endereco: updatedUsuario.endereco,
                    // A informação mais importante que veio do backend!
                    stripeCurrentPeriodEnd: updatedUsuario.barbearia.stripeCurrentPeriodEnd 
                };

                // 5. ATUALIZAMOS O ESTADO 'BARBEARIA' antigo com os novos dados.
                // Agora o seu botão que verifica `barbearia.stripeCurrentPeriodEnd` verá a data atualizada.
                updateBarbearia(barbeariaCompativel);

                console.log("Dados do usuário e da barbearia atualizados com sucesso!", { 
                    usuario: updatedUsuario, 
                    barbearia: barbeariaCompativel 
                });

                // Redireciona o usuário após a atualização bem-sucedida.
                setTimeout(() => {
                    router.push('/assinaturas'); 
                }, 3000); // 3 segundos

            } catch (error) {
                console.error("Falha ao buscar dados atualizados do usuário.", error);
                router.push('/');
            }
        };

        refreshUserData();
    }, []); // O array vazio [] garante que isso rode apenas uma vez

    return (
        <main className="grid grid-cols-1 lg:grid-cols-2 justify-center">
            <RightSection />
            <img src="./successful.svg" alt="Ilustração de sucesso no pagamento" className="flex-1" />
        </main>
    );
}