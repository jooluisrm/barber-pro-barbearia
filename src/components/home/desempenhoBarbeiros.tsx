"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Agendamentos } from "@/types/agendamentos";
import { Barbeiro } from "@/types/barbeiros";
import { useEffect, useState } from "react";
import { RankingMedal } from "./RankingMedal";
import { DesempenhoBarbeirosSkeleton } from "./skeletons/desempenhoBarbeirosSkeleton";

type Props = {
  barbeiros: Barbeiro[] | null;
  agendamentos: Agendamentos[] | null;
};

type Desempenho = {
  id: string;
  nome: string;
  fotoUrl: string | null;
  totalAgendamentos: number;
};

export const DesempenhoBarbeiros = ({ barbeiros, agendamentos }: Props) => {
  const [dadosDesempenho, setDadosDesempenho] = useState<Desempenho[]>([]);

  useEffect(() => {
    // ... (sua lógica de useEffect continua a mesma)
    if (barbeiros && agendamentos) {
      const hoje = new Date();
      const anoAtual = hoje.getFullYear();
      const mesAtual = hoje.getMonth();

      const contagemPorBarbeiro = new Map<string, number>();

      agendamentos
        .filter(ag => {
          const dataAg = new Date(ag.data + "T00:00:00-03:00");
          return (
            ag.status === 'Feito' &&
            dataAg.getMonth() === mesAtual &&
            dataAg.getFullYear() === anoAtual
          );
        })
        .forEach(ag => {
          const contagemAtual = contagemPorBarbeiro.get(ag.barbeiroId) || 0;
          contagemPorBarbeiro.set(ag.barbeiroId, contagemAtual + 1);
        });

      const dadosProcessados = barbeiros
        .map(barbeiro => ({
          id: barbeiro.id,
          nome: barbeiro.nome,
          fotoUrl: barbeiro.fotoPerfil,
          totalAgendamentos: contagemPorBarbeiro.get(barbeiro.id) || 0,
        }))
        .sort((a, b) => b.totalAgendamentos - a.totalAgendamentos);

      setDadosDesempenho(dadosProcessados);
    }
  }, [barbeiros, agendamentos]);

  // ✨ 2. ADICIONE O ESTADO DE CARREGAMENTO COM O SKELETON AQUI ✨
  if (!barbeiros || !agendamentos) {
      return <DesempenhoBarbeirosSkeleton />
  }

  return (
    <Card className="min-h-full">
      <CardHeader>
        <CardTitle>Pódio dos Barbeiros</CardTitle>
        <CardDescription>Ranking de agendamentos concluídos no mês.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* A verificação agora é apenas para o caso de ter dados mas a lista estar vazia */}
        {dadosDesempenho.length > 0 ? (
          dadosDesempenho.map((barbeiro, index) => (
            <div key={barbeiro.id} className="flex items-center space-x-4">
              <RankingMedal rank={index} />
              <Avatar>
                <AvatarImage src={barbeiro.fotoUrl ?? undefined} alt={barbeiro.nome} />
                <AvatarFallback>{barbeiro.nome.substring(0, 2).toUpperCase()}</AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <p className="text-sm font-medium leading-none">{barbeiro.nome}</p>
                <p className="text-sm text-muted-foreground">{barbeiro.totalAgendamentos} agendamentos</p>
              </div>
              <div className="font-semibold">{barbeiro.totalAgendamentos}</div>
            </div>
          ))
        ) : (
          <div className="flex items-center justify-center h-full text-muted-foreground pt-10">
            Nenhum agendamento concluído este mês.
          </div>
        )}
      </CardContent>
    </Card>
  );
};