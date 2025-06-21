"use client"

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { useEffect, useState } from "react";
import { Agendamentos } from "@/types/agendamentos";
import { GraficoFaturamentoComparativoSkeleton } from "./skeletons/graficoFaturamentoComparativoSkeleton";
// ✨ 1. IMPORTE O SKELETON

type Props = {
  agendamentos: Agendamentos[] | null;
};

type FaturamentoMensal = {
  mes: string;
  [key: number]: number;
};

export const GraficoFaturamentoComparativo = ({ agendamentos }: Props) => {
  const [chartData, setChartData] = useState<FaturamentoMensal[]>([]);
  const anoAtual = new Date().getFullYear();
  const anoAnterior = anoAtual - 1;

  useEffect(() => {
    // A lógica de processamento continua a mesma...
    if (agendamentos) {
      const nomesDosMeses = ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun", "Jul", "Ago", "Set", "Out", "Nov", "Dez"];
      const faturamentoPorAnoMes: { [ano: number]: { [mes: number]: number } } = {};

      agendamentos
        .filter(ag => ag.status === 'Feito')
        .forEach(ag => {
          const dataAg = new Date(ag.data + "T00:00:00-03:00");
          const ano = dataAg.getFullYear();
          const mes = dataAg.getMonth();
          const preco = Number(ag.servico.preco);
          
          if (!faturamentoPorAnoMes[ano]) faturamentoPorAnoMes[ano] = {};
          if (!faturamentoPorAnoMes[ano][mes]) faturamentoPorAnoMes[ano][mes] = 0;

          faturamentoPorAnoMes[ano][mes] += preco;
        });

      const dadosFormatados = nomesDosMeses.map((nomeMes, indexMes) => ({
        mes: nomeMes,
        [anoAtual]: faturamentoPorAnoMes[anoAtual]?.[indexMes] || 0,
        [anoAnterior]: faturamentoPorAnoMes[anoAnterior]?.[indexMes] || 0,
      }));

      setChartData(dadosFormatados);
    }
  }, [agendamentos, anoAtual, anoAnterior]);

  // ✨ 2. ADICIONE O ESTADO DE CARREGAMENTO COM O SKELETON AQUI ✨
  if (agendamentos === null) {
      return <GraficoFaturamentoComparativoSkeleton />
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Faturamento Mensal Comparativo</CardTitle>
        <CardDescription>
          Comparação do faturamento de {anoAtual} com {anoAnterior}.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          {/* A verificação agora é apenas para o caso de ter dados mas não o suficiente */}
          {chartData.length > 0 ? (
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis dataKey="mes" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
              <YAxis 
                stroke="#888888" 
                fontSize={12} 
                tickLine={false} 
                axisLine={false} 
                tickFormatter={(value: number) => `R$${value/1000}k`}
              />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: "hsl(var(--background))",
                  borderColor: "hsl(var(--border))",
                  borderRadius: "var(--radius)",
                  color: "hsl(var(--foreground))"
                }}
              />
              <Legend />
              <Line type="monotone" dataKey={anoAnterior} stroke="#a1a1aa" strokeWidth={2} name={`Ano ${anoAnterior}`} />
              <Line type="monotone" dataKey={anoAtual} stroke="#2563eb" strokeWidth={2} name={`Ano ${anoAtual}`} />
            </LineChart>
          ) : (
            <div className="flex items-center justify-center h-full text-muted-foreground">
              Não há dados suficientes para a comparação.
            </div>
          )}
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}