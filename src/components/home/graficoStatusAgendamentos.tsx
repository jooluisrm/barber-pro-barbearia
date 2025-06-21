"use client"

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from "recharts";
import { useEffect, useState } from "react";

// Tipo para os agendamentos que o componente espera receber
type Agendamento = {
  status: 'Feito' | 'Confirmado' | 'Cancelado';
};

type Props = {
  agendamentos: Agendamento[] | null;
};

// Componente customizado para o Tooltip (mantido como estava)
const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    return (
      <div className="rounded-lg border bg-background p-2 shadow-sm">
        <div className="grid grid-cols-2 gap-2">
          <div className="flex flex-col space-y-1">
            <span className="text-muted-foreground">{data.name}</span>
            <span className="font-bold">{data.value}</span>
          </div>
        </div>
      </div>
    );
  }
  return null;
};

// Objeto de configuração para as cores e nomes
const statusConfig = {
  Feito: { name: 'Feito', color: '#22c55e' },
  Confirmado: { name: 'Confirmado', color: '#eab308' },
  Cancelado: { name: 'Cancelado', color: '#ef4444' },
};

export const GraficoStatusAgendamentos = ({ agendamentos }: Props) => {
  // Estado para guardar os dados formatados para o gráfico
  const [chartData, setChartData] = useState<any[]>([]);

  useEffect(() => {
    if (agendamentos) {
      // 1. Contar a ocorrência de cada status
      const statusCounts = {
        Feito: 0,
        Confirmado: 0,
        Cancelado: 0,
      };

      agendamentos.forEach(ag => {
        if (ag.status in statusCounts) {
          statusCounts[ag.status]++;
        }
      });
      
      // 2. Formatar os dados para o Recharts, removendo status com valor 0
      const dataForChart = Object.entries(statusCounts)
        .map(([status, count]) => ({
          name: statusConfig[status as keyof typeof statusConfig].name,
          value: count,
          color: statusConfig[status as keyof typeof statusConfig].color,
        }))
        .filter(item => item.value > 0); 

      setChartData(dataForChart);
    }
  }, [agendamentos]); // Este efeito roda sempre que os agendamentos mudam

  return (
    <Card>
      <CardHeader>
        <CardTitle>Distribuição de Agendamentos</CardTitle>
        <CardDescription>Status de todos os agendamentos no histórico.</CardDescription>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          {chartData.length > 0 ? (
            <PieChart>
              <Tooltip content={<CustomTooltip />} />
              <Pie
                data={chartData} // <-- USA OS DADOS DO ESTADO
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={100}
                innerRadius={70}
                paddingAngle={5}
                labelLine={false}
              >
                {chartData.map((entry) => (
                  <Cell key={`cell-${entry.name}`} fill={entry.color} />
                ))}
              </Pie>
              <Legend />
            </PieChart>
          ) : (
            <div className="flex items-center justify-center h-full text-muted-foreground">
              {agendamentos ? "Não há dados para exibir." : "Carregando..."}
            </div>
          )}
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}