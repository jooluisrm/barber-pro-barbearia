"use client"

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

// Dados Fake
const servicosData = [
  { nome: 'Corte Degradê', agendamentos: 110 },
  { nome: 'Barba Terapia', agendamentos: 85 },
  { nome: 'Corte + Barba', agendamentos: 72 },
  { nome: 'Corte Infantil', agendamentos: 45 },
  { nome: 'Platinado', agendamentos: 15 },
].sort((a, b) => a.agendamentos - b.agendamentos); // Ordenar para o gráfico ficar bonito

export const GraficoServicosPopulares = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Serviços Mais Agendados</CardTitle>
        <CardDescription>Os serviços com maior número de agendamentos concluídos.</CardDescription>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={servicosData} layout="vertical" margin={{ left: 20, right: 20 }}>
            <CartesianGrid strokeDasharray="3 3" horizontal={false} />
            <XAxis type="number" hide />
            <YAxis 
              type="category" 
              dataKey="nome" 
              stroke="#888888" 
              fontSize={12} 
              tickLine={false} 
              axisLine={false} 
              width={100}
            />
            <Tooltip 
              cursor={{ fill: 'hsl(var(--muted))' }}
              contentStyle={{ 
                backgroundColor: "hsl(var(--background))",
                borderColor: "hsl(var(--border))",
                borderRadius: "var(--radius)",
              }}
            />
            <Bar dataKey="agendamentos" fill="#2563eb" radius={[0, 4, 4, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};