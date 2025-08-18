"use client"

import { Table, TableBody, TableCaption, TableCell, TableRow, TableHeader, TableHead } from "@/components/ui/table"
import { Agendamentos } from "@/types/agendamentos";
import { formatarPreco } from "@/utils/formatarValores";
import { DialogEdit } from "./dialogEdit"; // Supondo que este seja seu dialog de edição

type Props = {
    agendamentos: Agendamentos[] | null;
    isLoading: boolean;
}

export function TableAgendamentos({ agendamentos, isLoading }: Props) {
    // A tabela agora não filtra mais, apenas exibe o que recebe

    if (isLoading) {
        return (
            <div className="flex justify-center items-center h-64">
                <p className="text-muted-foreground">Carregando agendamentos...</p>
            </div>
        );
    }

    if (!agendamentos || agendamentos.length === 0) {
        return (
            <div className="flex justify-center items-center h-64">
                <p className="text-muted-foreground">Nenhum agendamento encontrado para os filtros selecionados.</p>
            </div>
        );
    }

    return (
        <Table>
            <TableCaption>Lista de Agendamentos do Dia</TableCaption>
            <TableHeader>
                <TableRow>
                    <TableHead>Cliente</TableHead>
                    <TableHead>Barbeiro</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Serviços</TableHead>
                    <TableHead>Hora</TableHead>
                    <TableHead className="text-right">Valor</TableHead>
                    <TableHead className="text-right"></TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {agendamentos.map((item) => {
                    // --- NOVA LÓGICA CONDICIONAL PARA O VALOR ---
                    let valorParaExibir = 0;

                    if (item.status === 'Feito') {
                        // Se o agendamento foi concluído, usa o valorTotal final salvo no banco.
                        valorParaExibir = Number(item.valorTotal || 0);
                    } else if (item.status === 'Confirmado') {
                        // Se está confirmado, calcula um valor provisório com base nos itens da comanda.
                        const valorServicos = item.servicosRealizados?.reduce((acc, s) => acc + Number(s.precoNoMomento || 0), 0) || 0;
                        const valorProdutos = item.produtosConsumidos?.reduce((acc, p) => acc + (Number(p.precoVendaNoMomento || 0) * p.quantidade), 0) || 0;
                        valorParaExibir = valorServicos + valorProdutos;
                    }
                    let valorColorClass = '';
                    switch (item.status) {
                        case 'Feito':
                            valorColorClass = 'text-green-600';
                            break;
                        case 'Confirmado':
                            valorColorClass = 'text-yellow-500';
                            break;
                        case 'Cancelado':
                            valorColorClass = 'text-red-500';
                            break;
                        default:
                            valorColorClass = 'text-muted-foreground';
                    }

                    return (
                        <TableRow key={item.id}>
                            <TableCell className="font-medium max-w-[100px] overflow-hidden md:text-nowrap truncate">{item.nomeCliente}</TableCell>
                            <TableCell>{item.barbeiro.nome}</TableCell>
                            <TableCell>
                                <span className={`font-bold ${valorColorClass}`}>
                                    {item.status}
                                </span>
                            </TableCell>
                            <TableCell className="max-w-[150px] truncate">
                                {item.servicosRealizados.map(s => s.servico.nome).join(', ')}
                            </TableCell>
                            <TableCell className="font-bold">{item.hora}</TableCell>
                            <TableCell className={`text-right font-bold ${valorColorClass}`}>
                                {/* Usa a variável calculada e a formata */}
                                {formatarPreco(valorParaExibir.toFixed(2))}
                            </TableCell>
                            <TableCell className="text-right">
                                {/* <DialogEdit agendamentoSelecionado={item} /> */}
                            </TableCell>
                        </TableRow>
                    );
                })}
            </TableBody>
        </Table>
    )
}