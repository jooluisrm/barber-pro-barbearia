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

const invoices = [
    {
        nome: "Joao",
        Status: "Feito",
        Servico: "Corte",
        Duracao: "30",
        Data: "27/03/2025",
        Hora: "09:30",
        Preco: "35.00",
    }
]

type Props = {
    agendamentos: Agendamentos[] | null;
}

export function TableAgendamentos({ agendamentos }: Props) {
    return (
        <Table>
            <TableCaption>A list of your recent invoices.</TableCaption>
            <TableHeader>
                <TableRow>
                    <TableHead className="w-[100px]">Cliente</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Serviço</TableHead>
                    <TableHead>Data</TableHead>
                    <TableHead>Hora</TableHead>
                    <TableHead className="text-right">Preço</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {agendamentos && agendamentos.map((item) => (
                    <TableRow key={item.id}>
                        <TableCell className="font-medium">{item.usuario.nome}</TableCell>
                        <TableCell>{item.status}</TableCell>
                        <TableCell>{item.servico.nome}</TableCell>
                        <TableCell>{item.data}</TableCell>
                        <TableCell>{item.hora}</TableCell>
                        <TableCell className="text-right">{item.servico.preco}</TableCell>
                    </TableRow>
                ))}
            </TableBody>
            <TableFooter>
                <TableRow>
                    <TableCell colSpan={5}>Total</TableCell>
                    <TableCell className="text-right">$2,500.00</TableCell>
                </TableRow>
            </TableFooter>
        </Table>
    )
}
