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
                    <TableHead className="w-[150px]">Rede Social</TableHead>
                    <TableHead>Link</TableHead>
                    <TableHead className="text-right"></TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>

                <TableRow >
                    <TableCell className="font-medium">Instagram</TableCell>
                    <TableCell>https://www.instagram.com/barbearias_prates_/</TableCell>
                    <TableCell  className="flex justify-end items-center">
                        <DialogEditSocialMidia />
                    </TableCell>
                </TableRow>

            </TableBody>
            <TableFooter>
                <TableRow>
                    <TableCell colSpan={2}>Total de Redes Sociais</TableCell>
                    <TableCell className="text-right">01</TableCell>
                </TableRow>
            </TableFooter>
        </Table>
    );
}
