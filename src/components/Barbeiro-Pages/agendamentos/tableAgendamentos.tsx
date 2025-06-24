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

export const TableAgendamentos = (item: any) => {
    return (
        <Table>
            <TableCaption>A list of your recent invoices.</TableCaption>
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
                <TableRow>
                    <TableCell className="font-medium">Joao</TableCell>
                    <TableCell>Pedro</TableCell>
                    <TableCell
                        className={`font-bold ${item.status === "Confirmado" ? "text-yellow-500" : item.status === "Feito" ? "text-green-500" : item.status === "Cancelado" ? "text-red-500" : ""}`}
                    >
                        Confirmado
                    </TableCell>
                    <TableCell>Cabelo</TableCell>
                    <TableCell className="font-medium">27/02/2005</TableCell>
                    <TableCell className={`font-bold text-blue-600`}>
                        13:00
                    </TableCell>
                    <TableCell className="text-green-600 font-bold">15</TableCell>
                </TableRow>
            </TableBody>
        </Table>
    );
}
