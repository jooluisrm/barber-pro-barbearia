"use client"

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { useEffect, useState } from "react";
import { Agendamentos } from "@/types/agendamentos";


type Props = {
  agendamentos: Agendamentos[] | null;
};

// Tipo para os dados do gráfico
type FaturamentoMensal = {
  mes: string;
  [key: number]: number; // Chaves dinâmicas para os anos, ex: 2024: 5900
};

export const GraficoFaturamentoComparativo = ({ agendamentos }: Props) => {
  const [chartData, setChartData] = useState<FaturamentoMensal[]>([]);
  const [anoAtual, setAnoAtual] = useState(new Date().getFullYear());
  const anoAnterior = anoAtual - 1;

  useEffect(() => {
    if (agendamentos) {
      const nomesDosMeses = ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun", "Jul", "Ago", "Set", "Out", "Nov", "Dez"];
      
      // 1. Estrutura para agrupar o faturamento: { 2025: { 0: 500, 1: 1200, ... }, 2024: { ... } }
      const faturamentoPorAnoMes: { [ano: number]: { [mes: number]: number } } = {};

      agendamentos
        .filter(ag => ag.status === 'Feito')
        .forEach(ag => {
          const dataAg = new Date(ag.data + "T00:00:00-03:00");
          const ano = dataAg.getFullYear();
          const mes = dataAg.getMonth(); // 0 para Janeiro, 1 para Fevereiro...
          const preco = Number(ag.servico.preco);
          
          // Inicializa os objetos se não existirem
          if (!faturamentoPorAnoMes[ano]) {
            faturamentoPorAnoMes[ano] = {};
          }
          if (!faturamentoPorAnoMes[ano][mes]) {
            faturamentoPorAnoMes[ano][mes] = 0;
          }

          // Soma o preço ao mês/ano correspondente
          faturamentoPorAnoMes[ano][mes] += preco;
        });

      // 2. Transforma os dados agrupados para o formato que o gráfico precisa
      const dadosFormatados = nomesDosMeses.map((nomeMes, indexMes) => {
        return {
          mes: nomeMes,
          // Usamos '?' para o caso de não haver faturamento para um ano/mês, resultando em 0
          [anoAtual]: faturamentoPorAnoMes[anoAtual]?.[indexMes] || 0,
          [anoAnterior]: faturamentoPorAnoMes[anoAnterior]?.[indexMes] || 0,
        };
      });

      setChartData(dadosFormatados);
    }
  }, [agendamentos, anoAtual, anoAnterior]);


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
              {/* As chaves dos dados e nomes agora são dinâmicos */}
              <Line type="monotone" dataKey={anoAnterior} stroke="#a1a1aa" strokeWidth={2} name={`Ano ${anoAnterior}`} />
              <Line type="monotone" dataKey={anoAtual} stroke="#2563eb" strokeWidth={2} name={`Ano ${anoAtual}`} />
            </LineChart>
          ) : (
            <div className="flex items-center justify-center h-full text-muted-foreground">
              {agendamentos ? "Não há dados suficientes para a comparação." : "Carregando..."}
            </div>
          )}
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}