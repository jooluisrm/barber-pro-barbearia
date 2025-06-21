"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Agendamentos } from "@/types/agendamentos";
import { Barbeiro } from "@/types/barbeiros";
import { useEffect, useState } from "react";
import { RankingMedal } from "./RankingMedal";
 // ✨ 1. IMPORTE O NOVO COMPONENTE

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

  return (
    <Card>
      <CardHeader>
        <CardTitle>Pódio dos Barbeiros</CardTitle> {/* Título atualizado */}
        <CardDescription>Ranking de agendamentos concluídos no mês.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {dadosDesempenho.length > 0 ? (
          // Usamos o 'index' para saber a posição no ranking
          dadosDesempenho.map((barbeiro, index) => (
            <div key={barbeiro.id} className="flex items-center space-x-4">
                
              {/* ✨ 2. ADICIONE O COMPONENTE DA MEDALHA AQUI ✨ */}
              <RankingMedal rank={index} total={dadosDesempenho.length} />

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
          <div className="flex items-center justify-center h-full text-muted-foreground">
             {barbeiros && agendamentos ? "Nenhum agendamento concluído este mês." : "Carregando..."}
          </div>
        )}
      </CardContent>
    </Card>
  );
};