"use client"

import { Barbearia, useAuth } from "@/contexts/AuthContext";
import { useEffect, useState } from "react";
import { Agendamentos } from "@/types/agendamentos";
import { getAgendamentos, getAgendamentosPendentes } from "@/api/agendamentos/agendamentoServices";
import { getBarbeiros } from "@/api/barbeiros/barbeirosServices";
import { Barbeiro } from "@/types/barbeiros";

// Importações dos componentes
import { VisaoGeralCards } from "./visaoGeralCards";
import { GraficoStatusAgendamentos } from "./graficoStatusAgendamentos";
import { GraficoFaturamentoComparativo } from "./graficoFaturamentoComparativo";
import { GraficoServicosPopulares } from "./graficoServicosPopulares";
import { DesempenhoBarbeiros } from "./desempenhoBarbeiros";
import { TabelaProximosAgendamentos } from "./TabelaProximosAgendamentos";
import { LiveClock } from "./liveClock";
import { loadItems } from "@/utils/loadItems";
import { usePendingScheduleContext } from "@/contexts/PendingScheduleContext";
import { HeaderPage } from "../reultilizar/headerPage";
import { useDashboardMetrics } from "@/hooks/useDashboardMetrics";

// Definindo o tipo para as métricas
type Metricas = {
    faturamento: { valor: number; variacao: number };
    agendamentos: { valor: number; variacao: number };
    ticketMedio: { valor: number; variacao: number };
    novosClientes: { valor: number; variacao: number };
};

export const MainHome = () => {
     const { barbearia, usuario } = useAuth();
     const {setAgendamentosPendentes} = usePendingScheduleContext();

    // Estados para os dados brutos da API
    const [agendamentos, setAgendamentos] = useState<Agendamentos[] | null>(null);
    const [barbeiros, setBarbeiros] = useState<Barbeiro[] | null>(null);

    // ✨ 2. O CÁLCULO DAS MÉTRICAS AGORA É FEITO PELO HOOK ✨
    const metricas = useDashboardMetrics(agendamentos);

    // useEffect focado apenas em buscar os dados
    useEffect(() => {
        if (barbearia) {
            loadItems(barbearia, getAgendamentosPendentes, setAgendamentosPendentes);
            getAgendamentos(barbearia.id).then(setAgendamentos);
            getBarbeiros(barbearia.id).then(setBarbeiros);
        }
    }, [barbearia]);

    return (
        <main className="flex-1 space-y-4">
           
            <HeaderPage
                subTitle="Seu resumo mensal está pronto abaixo."
                barberName={barbearia?.nome}
            />

            {/* A ÚNICA ALTERAÇÃO NO JSX É ESSA LINHA */}
            <VisaoGeralCards metricas={metricas} />

            {/* O RESTANTE DO CÓDIGO PERMANECE IGUAL, USANDO OS DADOS INTERNOS DE CADA COMPONENTE */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
                <div className="lg:col-span-4">
                    <GraficoFaturamentoComparativo agendamentos={agendamentos} />
                </div>
                <div className="lg:col-span-3">
                    <GraficoStatusAgendamentos agendamentos={agendamentos} />
                </div>
            </div>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
                <div className="lg:col-span-4">
                    <GraficoServicosPopulares agendamentos={agendamentos} />
                </div>
                <div className="lg:col-span-3">
                    <DesempenhoBarbeiros barbeiros={barbeiros} agendamentos={agendamentos} />
                </div>
            </div>
            <TabelaProximosAgendamentos agendamentos={agendamentos} />
        </main>
    );
}