"use client"

import { Area, AreaChart, Bar, BarChart, CartesianGrid, ComposedChart, Legend, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"

import {
    ChartConfig,
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
} from "@/components/ui/chart"
import { useEffect, useState } from "react"
import { getAgendamentos } from "@/api/agendamentos/agendamentoServices"
import { useAuth } from "@/contexts/AuthContext"
import { Agendamentos } from "@/types/agendamentos"

export function ChartFaturamentoAgendamento() {
    const { barbearia } = useAuth();
    const [agendamentos, setAgendamentos] = useState<Agendamentos[] | null>(null);
    const [faturamentoPorMes, setFaturamentoPorMes] = useState<{ [key: string]: number }>({});
    const [agendamentosPorMes, setAgendamentosPorMes] = useState<{ [key: string]: number }>({});

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

        carregarAgendamentos();
    }, [barbearia]);

    // 🔄 Mapeia os dados para o gráfico incluindo faturamento e agendamentos por mês
    const chartData = [
        { month: "Janeiro", agendamentos: agendamentosPorMes["01"] || 0, faturamento: faturamentoPorMes["01"] || 0 },
        { month: "Fevereiro", agendamentos: agendamentosPorMes["02"] || 0, faturamento: faturamentoPorMes["02"] || 0 },
        { month: "Março", agendamentos: agendamentosPorMes["03"] || 0, faturamento: faturamentoPorMes["03"] || 0 },
        { month: "Abril", agendamentos: agendamentosPorMes["04"] || 0, faturamento: faturamentoPorMes["04"] || 0 },
        { month: "Maio", agendamentos: agendamentosPorMes["05"] || 0, faturamento: faturamentoPorMes["05"] || 0 },
        { month: "Junho", agendamentos: agendamentosPorMes["06"] || 0, faturamento: faturamentoPorMes["06"] || 0 },
        { month: "Julho", agendamentos: agendamentosPorMes["07"] || 0, faturamento: faturamentoPorMes["07"] || 0 },
        { month: "Agosto", agendamentos: agendamentosPorMes["08"] || 0, faturamento: faturamentoPorMes["08"] || 0 },
        { month: "Setembro", agendamentos: agendamentosPorMes["09"] || 0, faturamento: faturamentoPorMes["09"] || 0 },
        { month: "Outubro", agendamentos: agendamentosPorMes["10"] || 0, faturamento: faturamentoPorMes["10"] || 0 },
        { month: "Novembro", agendamentos: agendamentosPorMes["11"] || 0, faturamento: faturamentoPorMes["11"] || 0 },
        { month: "Dezembro", agendamentos: agendamentosPorMes["12"] || 0, faturamento: faturamentoPorMes["12"] || 0 },
    ];

    return (
        <div className="w-full flex justify-center flex-col items-center">
            {/* Título e Descrição */}
            <h2 className="text-2xl text-center font-semibold dark:text-white text-gray-800 mb-4">Desempenho Mensal de Agendamentos e Faturamento</h2>

            {/* Gráfico */}
            <ResponsiveContainer width="95%" height={400}>
                <BarChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 40 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" tick={{ fontSize: 14 }} />

                    {/* Eixo esquerdo para agendamentos */}
                    <YAxis yAxisId="left" orientation="left" stroke="#2563eb" label={{ value: "Agendamentos", angle: -90, position: "insideLeft" }} />

                    {/* Eixo direito para faturamento */}
                    <YAxis yAxisId="right" orientation="right" stroke="#227930" label={{ value: "Faturamento (R$)", angle: -90, position: "insideRight" }} />

                    <Tooltip
                        formatter={(value, name) => (name === "faturamento" ? `R$ ${value}` : value)}
                        contentStyle={{ backgroundColor: "#1e293b", color: "#f8fafc", borderRadius: "8px", border: "none", fontWeight: "bold" }}
                    />

                    <Legend />

                    {/* Barra para Agendamentos */}
                    <Bar yAxisId="left" dataKey="agendamentos" fill="#2563eb" radius={[4, 4, 0, 0]} barSize={30} />

                    {/* Barra para Faturamento */}
                    <Bar yAxisId="right" dataKey="faturamento" fill="#227930" radius={[4, 4, 0, 0]} barSize={30} />
                </BarChart>
            </ResponsiveContainer>
            
        </div>
    );

}
