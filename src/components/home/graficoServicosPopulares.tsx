"use client"

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { useEffect, useState } from "react";

// Tipos para as props que o componente vai receber
type Agendamento = {
  status: string;
  servico: {
    nome: string;
  };
};

type Props = {
  agendamentos: Agendamento[] | null;
};

// Tipo para os dados já processados do gráfico
type ServicoPopular = {
  nome: string;
  total: number;
};

export const GraficoServicosPopulares = ({ agendamentos }: Props) => {
  const [chartData, setChartData] = useState<ServicoPopular[]>([]);

  useEffect(() => {
    if (agendamentos) {
      // 1. Contar a ocorrência de cada serviço 'Feito'
      const contagemServicos = new Map<string, number>();

      agendamentos
        .filter(ag => ag.status === 'Feito')
        .forEach(ag => {
          const nomeServico = ag.servico.nome;
          const contagemAtual = contagemServicos.get(nomeServico) || 0;
          contagemServicos.set(nomeServico, contagemAtual + 1);
        });

      // 2. Converter o Map para o formato do array do gráfico
      const dadosProcessados = Array.from(contagemServicos, ([nome, total]) => ({
        nome,
        total,
      }));
      
      // 3. Ordenar do mais popular para o menos popular
      dadosProcessados.sort((a, b) => b.total - a.total);

      setChartData(dadosProcessados);
    }
  }, [agendamentos]);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Serviços Mais Agendados</CardTitle>
        <CardDescription>Os serviços com maior número de agendamentos concluídos.</CardDescription>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          {chartData.length > 0 ? (
            <BarChart data={chartData} layout="vertical" margin={{ left: 20, right: 30, top: 5, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" horizontal={false} />
              <XAxis type="number" stroke="#888888" fontSize={12} allowDecimals={false} />
              <YAxis 
                type="category" 
                dataKey="nome" 
                stroke="#888888" 
                fontSize={12} 
                tickLine={false} 
                axisLine={false} 
                width={120} // Ajuste a largura se os nomes forem grandes
                interval={0}
              />
              <Tooltip 
                cursor={{ fill: 'hsl(var(--muted))' }}
                contentStyle={{ 
                  backgroundColor: "hsl(var(--background))",
                  borderColor: "hsl(var(--border))",
                  borderRadius: "var(--radius)",
                  color: "hsl(var(--foreground))", // Corrigindo para o texto do tooltip
                }}
              />
              <Bar dataKey="total" name="Agendamentos" fill="#2563eb" radius={[0, 4, 4, 0]} />
            </BarChart>
          ) : (
            <div className="flex items-center justify-center h-full text-muted-foreground">
              {agendamentos ? "Nenhum serviço concluído para exibir." : "Carregando..."}
            </div>
          )}
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};