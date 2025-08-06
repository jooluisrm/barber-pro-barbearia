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
import { useBarberContext } from "@/contexts/BarberContext";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";


export function TableBarbeiros() {
    const { barbeiros } = useBarberContext();

    return (
        <Table>
            <TableCaption>Lista de Barbeiros</TableCaption>
            <TableHeader>
                <TableRow>
                    <TableHead></TableHead>
                    <TableHead>Barbeiro</TableHead>
                    <TableHead>E-mail</TableHead>
                    <TableHead>Telefone/Celular</TableHead>
                    <TableHead className="text-right"></TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>

                {barbeiros && barbeiros.map((item) => (
                    <TableRow key={item.id}>
                        <TableCell>
                            <Avatar>
                                <AvatarImage src={item.fotoPerfil ? item.fotoPerfil : `/favicon.png`} />
                                <AvatarFallback>{item.nome.substring(0,2).toUpperCase()}</AvatarFallback>
                            </Avatar>
                        </TableCell>
                        <TableCell className="font-medium">{item.nome}</TableCell>
                        <TableCell>{item.usuarioSistema.email}</TableCell>
                        <TableCell>{item.telefone}</TableCell>
                        <TableCell className="flex justify-end items-center pt-4"><DialogEditarBarbeiro barbeiro={item} /></TableCell>
                    </TableRow>
                ))}

            </TableBody>
            <TableFooter>
                <TableRow>
                    <TableCell colSpan={4}>Total de Barbeiros</TableCell>
                    <TableCell className="text-right">{barbeiros?.length}</TableCell>
                </TableRow>
            </TableFooter>
        </Table>
    )
}
