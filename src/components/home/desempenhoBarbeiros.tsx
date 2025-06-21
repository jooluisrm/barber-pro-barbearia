"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

// Dados Fake
const barbeirosData = [
  { id: '1', nome: 'Vitor Alves', agendamentos: 95, fotoUrl: 'https://github.com/vitor-alves-dev.png' },
  { id: '2', nome: 'Carlos Pereira', agendamentos: 78, fotoUrl: 'https://github.com/shadcn.png' },
  { id: '3', nome: 'Ricardo Souza', agendamentos: 42, fotoUrl: '' }, // Sem foto para testar o fallback
].sort((a,b) => b.agendamentos - a.agendamentos);

export const DesempenhoBarbeiros = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Melhores Barbeiros</CardTitle>
        <CardDescription>Barbeiros com mais agendamentos concluídos no mês.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {barbeirosData.map((barbeiro) => (
          <div key={barbeiro.id} className="flex items-center space-x-4">
            <Avatar>
              <AvatarImage src={barbeiro.fotoUrl} alt={barbeiro.nome} />
              <AvatarFallback>{barbeiro.nome.substring(0, 2).toUpperCase()}</AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <p className="text-sm font-medium leading-none">{barbeiro.nome}</p>
              <p className="text-sm text-muted-foreground">{barbeiro.agendamentos} agendamentos</p>
            </div>
            <div className="font-semibold">{barbeiro.agendamentos}</div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};