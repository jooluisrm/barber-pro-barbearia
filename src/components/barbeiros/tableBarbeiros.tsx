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
import { Barbeiro } from "@/types/barbeiros";
import { formatarData, formatarPreco } from "@/utils/formatarValores";
import { EditIcon } from "lucide-react";
import { DialogEditarBarbeiro } from "./dialogEditarBarbeiro";

type Props = {
    barbeiros: Barbeiro[] | null;
}

export function TableBarbeiros({ barbeiros }: Props) {

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

                {barbeiros && barbeiros.map((item) => (
                    <TableRow key={item.id}>
                        <TableCell className="font-medium">{item.nome}</TableCell>
                        <TableCell>{item.email}</TableCell>
                        <TableCell>{item.telefone}</TableCell>
                        <TableCell className="flex justify-end items-center pt-4"><DialogEditarBarbeiro barbeiro={item}/></TableCell>
                    </TableRow>
                ))}

            </TableBody>
            <TableFooter>
                <TableRow>
                    <TableCell colSpan={3}>Total de Barbeiros</TableCell>
                    <TableCell className="text-right">{barbeiros?.length}</TableCell>
                </TableRow>
            </TableFooter>
        </Table>
    )
}
