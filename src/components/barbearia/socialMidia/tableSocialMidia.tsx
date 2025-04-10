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
import { DialogEditSocialMidia } from "./dialogEditSocialMidia";

export const TableSocialMidia = () => {
    return (
        <Table>
            <TableCaption>Lista de Redes Sociais</TableCaption>
            <TableHeader>
                <TableRow>
                    <TableHead className="w-[150px]">Serviço</TableHead>
                    <TableHead>Duração</TableHead>
                    <TableHead className="text-right">Preço</TableHead>
                    <TableHead className="text-right"></TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>

                <TableRow >
                    <TableCell className="font-medium">Corte Premio</TableCell>
                    <TableCell>60 min</TableCell>
                    <TableCell className="text-right">50,00</TableCell>
                    <TableCell  className="flex justify-end items-center">
                        <DialogEditSocialMidia />
                    </TableCell>
                </TableRow>

            </TableBody>
            <TableFooter>
                <TableRow>
                    <TableCell colSpan={3}>Total de Serviços</TableCell>
                    <TableCell className="text-right">01</TableCell>
                </TableRow>
            </TableFooter>
        </Table>
    );
}
