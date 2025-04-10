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
import { DialogEditPaymentMethod } from "./dialogEditPaymentMethod";

export const TablePaymentMethod = () => {
    return (
        <Table>
            <TableCaption>Lista de Formas de Pagamento</TableCaption>
            <TableHeader>
                <TableRow>
                    <TableHead className="">Forma de Pagamento</TableHead>
                    <TableHead className="text-right"></TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>

                <TableRow >
                    <TableCell className="font-medium">Pix</TableCell>
                    <TableCell  className="flex justify-end items-center">
                        <DialogEditPaymentMethod />
                    </TableCell>
                </TableRow>

            </TableBody>
            <TableFooter>
                <TableRow>
                    <TableCell colSpan={1}>Total de Formas de Pagamentos</TableCell>
                    <TableCell className="text-right">01</TableCell>
                </TableRow>
            </TableFooter>
        </Table>
    );
}
