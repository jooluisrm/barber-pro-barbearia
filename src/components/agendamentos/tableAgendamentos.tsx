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
import { EditIcon } from "lucide-react";
import { DialogEdit } from "./dialogEdit";

type Props = {
    agendamentosFiltrados: Agendamentos[] | null;
}

export function TableAgendamentos({ agendamentosFiltrados }: Props) {

    return (
        <Table>
            <TableCaption>Lista de Agendamentos</TableCaption>
            <TableHeader>
                <TableRow>
                    <TableHead className="w-[100px]">Cliente</TableHead>
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
                {agendamentosFiltrados && agendamentosFiltrados.map((item) => (
                    <TableRow key={item.id}>
                        <TableCell className="font-medium">{item.usuario.nome}</TableCell>
                        <TableCell>{item.barbeiro.nome}</TableCell>
                        <TableCell
                            className={`font-bold ${item.status === "Confirmado" ? "text-yellow-500" : item.status === "Feito" ? "text-green-500" : item.status === "Cancelado" ? "text-red-500" : ""}`}
                        >
                            {item.status}
                        </TableCell>
                        <TableCell>{item.servico.nome}</TableCell>
                        <TableCell className="text-blue-500 font-bold">{formatarData(item.data)}</TableCell>
                        <TableCell className="text-blue-500 font-bold">{item.hora}</TableCell>
                        <TableCell className="text-green-600 font-bold">{formatarPreco(item.servico.preco)}</TableCell>
                        <TableCell className="flex justify-end items-center pt-4"><DialogEdit agendamentoSelecionado={item}/></TableCell>
                    </TableRow>
                ))}
            </TableBody>
            <TableFooter>
                <TableRow>
                    <TableCell colSpan={7}>Total de Agendamentos</TableCell>
                    <TableCell className="text-right">{agendamentosFiltrados?.length}</TableCell>
                </TableRow>
            </TableFooter>
        </Table>
    )
}
