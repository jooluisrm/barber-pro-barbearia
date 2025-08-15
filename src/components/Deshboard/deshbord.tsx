"use client";

import { useAuth } from "@/contexts/AuthContext";
import { DeshboardMobile } from "./deshbordMobile";
import { DeshboardPc } from "./deshbordPc";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
// Importe a função da API que criamos
import { getPendingAppointments } from "@/api/agendamentos/agendamentoServices"; 

export const Deshboard = () => {
    // REMOVIDO: const {agendamentosPendentes} = usePendingScheduleContext();
    
    // NOVO: Estado local apenas para a contagem
    const [pendingCount, setPendingCount] = useState(0);

    const [rotaAtual, setRotaAtual] = useState("");
    const { token, usuario, barbearia } = useAuth(); // Adicione barbearia aqui
    const pathname = usePathname();

    useEffect(() => {
        setRotaAtual(pathname);
    }, [pathname]);
    
    // NOVO: useEffect para buscar a contagem de pendentes
    useEffect(() => {
        // Função para buscar e atualizar a contagem
        const fetchPendingCount = async () => {
            if (!barbearia || !usuario) return;
            try {
                const pendingData = await getPendingAppointments(barbearia.id, usuario);
                setPendingCount(pendingData.length || 0);
            } catch (error) {
                console.error(error);
                setPendingCount(0); // Zera a contagem em caso de erro
            }
        };

        fetchPendingCount();
        
        // Opcional: Recarrega a contagem a cada X minutos para manter a notificação atualizada
        const interval = setInterval(fetchPendingCount, 5 * 60000); // A cada 5 minutos
        return () => clearInterval(interval); // Limpa o intervalo ao sair da página

    }, [barbearia, usuario, pathname]);

    return (
        <div className={`flex w-full flex-col bg-muted/40`}>
            {/* Passe a contagem (pendingCount) em vez da lista completa */}
            <DeshboardPc usuario={usuario} token={token} rotaAtual={rotaAtual} pendingCount={pendingCount} />
            <DeshboardMobile usuario={usuario} token={token} rotaAtual={rotaAtual} pendingCount={pendingCount} />
        </div>
    );
};