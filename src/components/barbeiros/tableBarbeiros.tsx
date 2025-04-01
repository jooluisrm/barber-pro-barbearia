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

type Props = {
    
}

export function TableBarbeiros() {

    return (
        <Table>
            <TableCaption>Lista de Barbeiros</TableCaption>
            <TableHeader>
                <TableRow>
                    <TableHead>Barbeiro</TableHead>
                    <TableHead>E-mail</TableHead>
                    <TableHead>Celular</TableHead>
                    <TableHead className="text-right"></TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                
                    <TableRow >
                        <TableCell className="font-medium">Ricardo</TableCell>
                        <TableCell>ricardo@gmail.com</TableCell>
                        <TableCell>(11) 9999-9999</TableCell>
                        <TableCell className="flex justify-end items-center pt-4"><EditIcon /></TableCell>
                    </TableRow>
               
            </TableBody>
            <TableFooter>
                <TableRow>
                    <TableCell colSpan={3}>Total de Barbeiros</TableCell>
                    <TableCell className="text-right">1</TableCell>
                </TableRow>
            </TableFooter>
        </Table>
    )
}
