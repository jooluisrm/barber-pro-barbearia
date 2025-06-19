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

    return (
        <main>
            <div className="pb-10 pt-5">
                <h1 className="text-xl md:text-2xl">Bem-vindo(a) ao <span className="font-bold">BarberPro</span>, <span className="font-bold text-blue-500 text-nowrap">{barbearia?.nome}</span>!</h1>
                <p className="text-muted-foreground">Seu resumo mensal está pronto abaixo.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 ">
                <ChartBarbeirosAgendamentos barbeiros={barbeiros} agendamentos={agendamentos} />
                <ChartAgendamentosServicos agendamentos={agendamentos} />
                <ChartFaturamentoAgendamento agendamentosPorMes={agendamentosPorMes} faturamentoPorMes={faturamentoPorMes} />
            </div>
        </main>
    );
}