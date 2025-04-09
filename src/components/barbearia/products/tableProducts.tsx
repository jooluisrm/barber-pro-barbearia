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
import { DialogEditProduct } from "./dialogEditProduct";

export const TableProducts = () => {
    return (
        <Table>
            <TableCaption>Lista de Produtos Vendidos</TableCaption>
            <TableHeader>
                <TableRow>
                    <TableHead className="w-[150px]">Produto</TableHead>
                    <TableHead>Descrição</TableHead>
                    <TableHead>Tipo</TableHead>
                    <TableHead className="text-right">Preço</TableHead>
                    <TableHead className="text-right"></TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>

                <TableRow >
                    <TableCell className="font-medium">Cerveja Artesanal</TableCell>
                    <TableCell>Garrafa 500ml</TableCell>
                    <TableCell>Bebida</TableCell>
                    <TableCell className="text-right">15,00</TableCell>
                    <TableCell  className="flex justify-end items-center">
                        <DialogEditProduct />
                    </TableCell>
                </TableRow>

            </TableBody>
            <TableFooter>
                <TableRow>
                    <TableCell colSpan={4}>Total de Produtos</TableCell>
                    <TableCell className="text-right">01</TableCell>
                </TableRow>
            </TableFooter>
        </Table>
    );
}
