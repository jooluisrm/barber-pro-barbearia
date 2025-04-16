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
import { usePaymentContext } from "@/contexts/PaymentContext";

export const TablePaymentMethod = () => {

    const { payment } = usePaymentContext();

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

                {
                    payment && payment.map((item) => (
                        <TableRow key={item.id}>
                            <TableCell className="font-medium">{item.tipo}</TableCell>
                            <TableCell className="flex justify-end items-center">
                                <DialogEditPaymentMethod itemPayment={item}/>
                            </TableCell>
                        </TableRow>
                    ))
                }

            </TableBody>
            <TableFooter>
                <TableRow>
                    <TableCell colSpan={1}>Total de Formas de Pagamentos</TableCell>
                    <TableCell className="text-right">{payment?.length}</TableCell>
                </TableRow>
            </TableFooter>
        </Table>
    );
}
