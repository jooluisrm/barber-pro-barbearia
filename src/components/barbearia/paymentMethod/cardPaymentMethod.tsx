import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { TablePaymentMethod } from "./tablePaymentMethod";
import { DialogNewPaymentMethod } from "./dialogNewPaymentMethod";


export const CardPaymentMethod = () => {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Formas de Pagamentos</CardTitle>
                <CardDescription>Adicione os Produtos a venda na sua barbearia.</CardDescription>
            </CardHeader>
            <CardContent>
                 <TablePaymentMethod />
            </CardContent>
            <CardFooter className="flex justify-between">
                <DialogNewPaymentMethod />
            </CardFooter>
        </Card>
    );
}
