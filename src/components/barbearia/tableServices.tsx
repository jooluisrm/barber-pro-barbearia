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

export const TableServices = () => {
    return (
        <Table>
            <TableCaption>Lista de Serviços prestados</TableCaption>
            <TableHeader>
                <TableRow>
                    <TableHead className="w-[150px]">Serviço</TableHead>
                    <TableHead>Duração</TableHead>
                    <TableHead className="text-right">Preço</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>

                <TableRow >
                    <TableCell className="font-medium">Corte Premio</TableCell>
                    <TableCell>60 min</TableCell>
                    <TableCell className="text-right">50,00</TableCell>
                </TableRow>
            </TableBody>
            <TableFooter>
                <TableRow>
                    <TableCell colSpan={2}>Total</TableCell>
                    <TableCell className="text-right">$2,500.00</TableCell>
                </TableRow>
            </TableFooter>
        </Table>
    );
}
