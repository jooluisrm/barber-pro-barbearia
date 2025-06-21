"use client"

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

type Status = "Feito" | "Confirmado" | "Cancelado";

// 1. DADOS FAKES MAIS INTELIGENTES
// Para testar a lógica, precisamos de uma nova `hora` e de datas dinâmicas.
const hoje = new Date();
const amanha = new Date();
amanha.setDate(hoje.getDate() + 1);

// Função para formatar a data como "DD/MM/YYYY"
const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('pt-BR').format(date);
}

// Dados fakes para simular vários cenários
const agendamentosMock = [
  // --- AGENDAMENTOS DE HOJE (devem ser filtrados) ---
  { id: 'AGD001', cliente: 'Lucas Martins', barbeiro: 'Vitor Alves', servico: 'Corte + Barba', data: formatDate(hoje), hora: '09:00', status: 'Confirmado' as Status }, // DEVE APARECER (se não for 9h ainda)
  { id: 'AGD002', cliente: 'Mariana Costa', barbeiro: 'Carlos Pereira', servico: 'Corte Degradê', data: formatDate(hoje), hora: '11:30', status: 'Confirmado' as Status }, // DEVE APARECER
  { id: 'AGD003', cliente: 'Rafael Santos', barbeiro: 'Vitor Alves', servico: 'Barba Terapia', data: formatDate(hoje), hora: '14:00', status: 'Confirmado' as Status }, // DEVE APARECER
  { id: 'AGD004', cliente: 'Beatriz Lima', barbeiro: 'Ricardo Souza', servico: 'Corte Feminino', data: formatDate(hoje), hora: '08:00', status: 'Feito' as Status }, // NÃO DEVE APARECER (status não é "Confirmado")
  { id: 'AGD005', cliente: 'João Silva', barbeiro: 'Carlos Pereira', servico: 'Corte Degradê', data: formatDate(hoje), hora: '11:00', status: 'Cancelado' as Status }, // NÃO DEVE APARECER (status não é "Confirmado")

  // --- AGENDAMENTO DE AMANHÃ (não deve aparecer) ---
  { id: 'AGD006', cliente: 'Fernanda Lima', barbeiro: 'Carlos Pereira', servico: 'Corte Feminino', data: formatDate(amanha), hora: '15:00', status: 'Confirmado' as Status },
];


export const TabelaProximosAgendamentos = () => {
    
    // 2. LÓGICA DE FILTRAGEM E ORDENAÇÃO
    const hojeFormatado = formatDate(new Date());
    const horaAtual = new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }); // Formato "HH:mm"

    const proximosAgendamentos = agendamentosMock
        .filter(ag => {
            // Condição 1: A data tem que ser a de hoje
            const eHoje = ag.data === hojeFormatado;
            // Condição 2: O status tem que ser "Confirmado"
            const estaConfirmado = ag.status === 'Confirmado';
            // Condição 3: A hora do agendamento não pode ter passado
            const naoEstaVencido = ag.hora >= horaAtual;

            return eHoje && estaConfirmado && naoEstaVencido;
        })
        .sort((a, b) => a.hora.localeCompare(b.hora)); // Ordena pelo horário

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
            {proximosAgendamentos.length > 0 ? (
                proximosAgendamentos.map((ag) => (
                    <TableRow key={ag.id}>
                        <TableCell className="font-bold">{ag.hora}</TableCell>
                        <TableCell>
                        <div className="font-medium">{ag.cliente}</div>
                        </TableCell>
                        <TableCell className="hidden sm:table-cell">{ag.barbeiro}</TableCell>
                        <TableCell className="hidden md:table-cell">{ag.servico}</TableCell>
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
  )
}