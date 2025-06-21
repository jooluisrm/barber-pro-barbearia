"use client"

import { Barbearia, useAuth } from "@/contexts/AuthContext";
import { ChartFaturamentoAgendamento } from "./chartFaturamentoAgendamento";
import { useEffect, useState } from "react";
import { Agendamentos } from "@/types/agendamentos";
import { getAgendamentos } from "@/api/agendamentos/agendamentoServices";
import { ChartBarbeirosAgendamentos } from "./chartBarbeirosAgendamentos";
import { getBarbeiros } from "@/api/barbeiros/barbeirosServices";
import { Barbeiro } from "@/types/barbeiros";
import { ChartAgendamentosServicos } from "./chartAgendamentosServicos";
import { VisaoGeralCards } from "./visaoGeralCards";
import { GraficoStatusAgendamentos } from "./graficoStatusAgendamentos";
import { GraficoFaturamentoComparativo } from "./graficoFaturamentoComparativo";
import { GraficoServicosPopulares } from "./graficoServicosPopulares";
import { DesempenhoBarbeiros } from "./desempenhoBarbeiros";
import { TabelaProximosAgendamentos } from "./TabelaProximosAgendamentos";

export const MainHome = () => {

    const { barbearia } = useAuth();
    const [agendamentos, setAgendamentos] = useState<Agendamentos[] | null>(null);
    const [faturamentoPorMes, setFaturamentoPorMes] = useState<{ [key: string]: number }>({});
    const [agendamentosPorMes, setAgendamentosPorMes] = useState<{ [key: string]: number }>({});
    const [barbeiros, setBarbeiros] = useState<Barbeiro[] | null>(null);

    useEffect(() => {
        const carregarAgendamentos = async () => {
            if (barbearia) {
                const dados = await getAgendamentos(barbearia.id);
                setAgendamentos(dados);

                // 🔥 Inicializa os objetos para armazenar os valores por mês
                const faturamentoMensal: { [key: string]: number } = {};
                const agendamentosMensal: { [key: string]: number } = {};

                dados
                    .filter((agendamento: any) => agendamento.status === "Feito")
                    .forEach((agendamento: any) => {
                        const mes = agendamento.data.split("-")[1]; // Obtém o mês da data (Formato "YYYY-MM-DD")
                        const preco = Number(agendamento.servico.preco);

                        // Soma o faturamento do mês
                        faturamentoMensal[mes] = (faturamentoMensal[mes] || 0) + preco;

                        // Conta a quantidade de agendamentos "Feito" no mês
                        agendamentosMensal[mes] = (agendamentosMensal[mes] || 0) + 1;
                    });

                setFaturamentoPorMes(faturamentoMensal);
                setAgendamentosPorMes(agendamentosMensal);
            }
        };
        const carregarBarbeiros = async () => {
            if (barbearia) {
                const dados = await getBarbeiros(barbearia.id);
                setBarbeiros(dados);
                console.log(dados)
            }
        }

        carregarBarbeiros();
        carregarAgendamentos();
    }, [barbearia]);

    //<ChartBarbeirosAgendamentos barbeiros={barbeiros} agendamentos={agendamentos} />
    //          <ChartAgendamentosServicos agendamentos={agendamentos} />
    //        <ChartFaturamentoAgendamento agendamentosPorMes={agendamentosPorMes} faturamentoPorMes={faturamentoPorMes} />

    
    return (
        <main className="flex-1 space-y-4">
            <div className="pb-10 pt-5">
                <h1 className="text-xl md:text-2xl">Bem-vindo(a) ao <span className="font-bold">BarberPro</span>, <span className="font-bold text-blue-500 text-nowrap">{barbearia?.nome}</span>!</h1>
                <p className="text-muted-foreground">Seu resumo mensal está pronto abaixo.</p>
            </div>

            <VisaoGeralCards />

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
                <div className="lg:col-span-4">
                    {/* Seção 2: Faturamento */}
                    <GraficoFaturamentoComparativo />
                </div>
                <div className="lg:col-span-3">
                    {/* Seção 2: Status */}
                    <GraficoStatusAgendamentos />
                </div>
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
                <div className="lg:col-span-4">
                    {/* Seção 3: Serviços */}
                    <GraficoServicosPopulares />
                </div>
                <div className="lg:col-span-3">
                    {/* Seção 3: Barbeiros */}
                    <DesempenhoBarbeiros />
                </div>
            </div>

            {/* Seção 4: Tabela */}
            <TabelaProximosAgendamentos />
        </main>
    );
}