"use client"

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Agendamentos } from "@/types/agendamentos";
import { useEffect, useState } from "react";

type Props = {
  agendamentos: Agendamentos[] | null;
};

export const TabelaProximosAgendamentos = ({ agendamentos }: Props) => {
  const [proximosAgendamentos, setProximosAgendamentos] = useState<Agendamentos[]>([]);

  useEffect(() => {
    if (agendamentos) {
      const hojeFormatado = new Date().toISOString().split('T')[0];
      const horaAtual = new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });

      const filtrados = agendamentos
        .filter((ag: any) => {
          const eHoje = ag.data === hojeFormatado;
          const estaConfirmado = ag.status === 'Confirmado';
          const naoEstaVencido = ag.hora >= horaAtual;
          return eHoje && estaConfirmado && naoEstaVencido;
        })
        .sort((a, b) => a.hora.localeCompare(b.hora));

      setProximosAgendamentos(filtrados);
    }
  }, [agendamentos]);

  return (
    <Card className="col-span-full">
      <CardHeader>
        <CardTitle>Próximos Agendamentos</CardTitle>
        <CardDescription>Estes são os agendamentos confirmados para hoje que ainda não ocorreram.</CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[80px]">Hora</TableHead>
              <TableHead>Cliente</TableHead>
              <TableHead className="hidden sm:table-cell">Barbeiro</TableHead>
              <TableHead className="hidden md:table-cell">Serviço</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {agendamentos === null ? (
              <TableRow>
                <TableCell colSpan={4} className="h-24 text-center text-muted-foreground">
                  Carregando...
                </TableCell>
              </TableRow>
            ) : proximosAgendamentos.length > 0 ? (
              proximosAgendamentos.map((ag, index) => (
                // ✨ DESTAQUE APLICADO AQUI ✨
                <TableRow 
                  key={ag.id} 
                  className={index === 0 ? "bg-muted/50" : ""}
                >
                  <TableCell className={`font-bold ${index === 0 ? 'text-blue-600 dark:text-blue-500' : ''}`}>
                    {ag.hora}
                  </TableCell>
                  <TableCell>
                    <div className="font-medium">{ag.usuario.nome}</div>
                  </TableCell>
                  <TableCell className="hidden sm:table-cell">{ag.barbeiro.nome}</TableCell>
                  <TableCell className="hidden md:table-cell">{ag.servico.nome}</TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={4} className="h-24 text-center text-muted-foreground">
                  Nenhum próximo agendamento para hoje.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};