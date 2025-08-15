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
                    <TableHead className="text-right">Valor Total</TableHead>
                    <TableHead className="text-right"></TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {agendamentos.map((item) => (
                    <TableRow key={item.id}>
                        <TableCell className="font-medium max-w-[100px] overflow-hidden md:text-nowrap truncate">{item.nomeCliente}</TableCell>
                        <TableCell>{item.barbeiro.nome}</TableCell>
                        <TableCell>
                            <span className={`font-bold ${item.status === "Confirmado" ? "text-yellow-500" : item.status === "Feito" ? "text-green-500" : item.status === "Cancelado" ? "text-red-500" : ""}`}>
                                {item.status}
                            </span>
                        </TableCell>
                        {/* Exibe a lista de serviços */}
                        <TableCell>
                            {item.servicosRealizados.map(s => s.servico.nome).join(', ')}
                        </TableCell>
                        <TableCell className="font-bold">{item.hora}</TableCell>
                        <TableCell className="text-right font-bold text-green-600">
                            {formatarPreco(item.valorTotal || "0")}
                        </TableCell>
                        <TableCell className="text-right">
                            {/*<DialogEdit agendamentoSelecionado={item} /> */}
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    )
}