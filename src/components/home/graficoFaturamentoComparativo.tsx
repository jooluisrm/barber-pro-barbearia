"use client"

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

// Dados Fake
const faturamentoData = [
  { mes: 'Jan', '2024': 4000, '2025': 4800 },
  { mes: 'Fev', '2024': 3000, '2025': 3500 },
  { mes: 'Mar', '2024': 5200, '2025': 6100 },
  { mes: 'Abr', '2024': 4800, '2025': 5500 },
  { mes: 'Mai', '2024': 6100, '2025': 7200 },
  { mes: 'Jun', '2024': 5900, '2025': 7850 },
];

export const GraficoFaturamentoComparativo = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Faturamento Mensal Comparativo</CardTitle>
        <CardDescription>Comparação do faturamento do ano atual com o ano anterior.</CardDescription>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={faturamentoData}>
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
              }}
            />
            <Legend />
            <Line type="monotone" dataKey="2024" stroke="#a1a1aa" strokeWidth={2} name="Ano Anterior" />
            <Line type="monotone" dataKey="2025" stroke="#2563eb" strokeWidth={2} name="Ano Atual" />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}