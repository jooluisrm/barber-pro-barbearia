"use client"

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from "recharts";

// Componente customizado para o Tooltip
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

// Dados fakes
const data = [
  { name: 'Feito', value: 215, color: '#10b981' },
  { name: 'Confirmado', value: 45, color: '#3b82f6' },
  { name: 'Cancelado', value: 18, color: '#ef4444' },
];

export const GraficoStatusAgendamentos = () => {
  return (
    <Card>
        <CardHeader>
        <CardTitle>Distribuição de Agendamentos</CardTitle>
        <CardDescription>Status dos agendamentos no período atual.</CardDescription>
      </CardHeader>
        <CardContent>
            <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                    {/* USANDO O COMPONENTE CUSTOMIZADO */}
                    <Tooltip content={<CustomTooltip />} />
                    <Pie
                        data={data}
                        dataKey="value"
                        nameKey="name"
                        cx="50%"
                        cy="50%"
                        outerRadius={100}
                        innerRadius={70}
                        paddingAngle={5}
                        labelLine={false}
                    >
                        {data.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                    </Pie>
                    <Legend />
                </PieChart>
            </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}