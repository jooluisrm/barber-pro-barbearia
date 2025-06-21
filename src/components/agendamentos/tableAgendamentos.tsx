"use client"

import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableFooter,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { Agendamentos } from "@/types/agendamentos";
import { formatarData, formatarPreco } from "@/utils/formatarValores";
import { DialogEdit } from "./dialogEdit";

type Props = {
    agendamentosFiltrados: Agendamentos[] | null;
}

export function TableAgendamentos({ agendamentosFiltrados }: Props) {

    // --- LÓGICA DE FILTRAGEM E ORDENAÇÃO DENTRO DO PRÓPRIO COMPONENTE ---
    
    // 1. Prepara as variáveis de data e hora atuais para comparação
    const hoje = new Date();
    // Formata a data de hoje como "YYYY-MM-DD" para bater com o formato da API
    const hojeFormatado = hoje.toISOString().split('T')[0];
    // Converte a hora atual para um total de minutos para uma comparação 100% precisa
    const totalMinutosAtual = hoje.getHours() * 60 + hoje.getMinutes();

    // 2. Processa a lista recebida para aplicar as regras de exibição
    const agendamentosParaExibir = agendamentosFiltrados
        ? agendamentosFiltrados
            .filter((ag: any) => {
                // Verifica se o agendamento é para hoje
                const eHoje = ag.data.startsWith(hojeFormatado);

                // ✨ REGRA PRINCIPAL ✨
                // Se o agendamento for para hoje E o status for "Confirmado"...
                if (eHoje && ag.status === 'Confirmado') {
                    // ...então, verificamos o horário.
                    const [horaAg, minutoAg] = ag.hora.split(':').map(Number);
                    const totalMinutosAg = horaAg * 60 + minutoAg;
                    
                    // Mantém na lista apenas se a hora for futura ou a atual.
                    return totalMinutosAg >= totalMinutosAtual;
                }

                // Para todos os outros casos (outros dias, outros status como "Feito"),
                // o agendamento é sempre mantido na lista.
                return true;
            })
            // A ordenação por hora é feita depois do filtro
            .sort((a, b) => a.hora.localeCompare(b.hora))
        : []; // Se a prop for nula, retorna um array vazio


    return (
        <Table>
            <TableCaption>Lista de Agendamentos</TableCaption>
            <TableHeader>
                <TableRow>
                    <TableHead>Cliente</TableHead>
                    <TableHead>Barbeiro</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Serviço</TableHead>
                    <TableHead>Data</TableHead>
                    <TableHead>Hora</TableHead>
                    <TableHead>Preço</TableHead>
                    <TableHead className="text-right"></TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {agendamentosFiltrados === null ? (
                    <TableRow>
                        <TableCell colSpan={8} className="h-24 text-center text-muted-foreground">
                            Carregando...
                        </TableCell>
                    </TableRow>
                ) : agendamentosParaExibir.length > 0 ? (
                    agendamentosParaExibir.map((item: any, index) => {
                        // Lógica de destaque para o próximo agendamento do dia
                        const isNextAppointment = index === 0 && item.data.startsWith(hojeFormatado);

                        return (
                            <TableRow 
                                key={item.id}
                                className={isNextAppointment ? "bg-blue-500/10 hover:bg-blue-500/20" : ""}
                            >
                                <TableCell className="font-medium">{item.usuario.nome}</TableCell>
                                <TableCell>{item.barbeiro.nome}</TableCell>
                                <TableCell
                                    className={`font-bold ${item.status === "Confirmado" ? "text-yellow-500" : item.status === "Feito" ? "text-green-500" : item.status === "Cancelado" ? "text-red-500" : ""}`}
                                >
                                    {item.status}
                                </TableCell>
                                <TableCell>{item.servico.nome}</TableCell>
                                <TableCell className="font-medium">{formatarData(item.data)}</TableCell>
                                <TableCell className={`font-bold ${isNextAppointment ? 'text-blue-600 dark:text-blue-400' : ''}`}>
                                    {item.hora}
                                </TableCell>
                                <TableCell className="text-green-600 font-bold">{formatarPreco(item.servico.preco)}</TableCell>
                                <TableCell className="flex justify-end items-center pt-4"><DialogEdit agendamentoSelecionado={item}/></TableCell>
                            </TableRow>
                        );
                    })
                ) : (
                    <TableRow>
                        <TableCell colSpan={8} className="h-24 text-center text-muted-foreground">
                            Nenhum agendamento para exibir.
                        </TableCell>
                    </TableRow>
                )}
            </TableBody>
            <TableFooter>
                <TableRow>
                    <TableCell colSpan={7}>Total de Agendamentos Visíveis</TableCell>
                    {/* O total agora reflete a lista JÁ FILTRADA */}
                    <TableCell className="text-right">{agendamentosParaExibir.length}</TableCell>
                </TableRow>
            </TableFooter>
        </Table>
    )
}