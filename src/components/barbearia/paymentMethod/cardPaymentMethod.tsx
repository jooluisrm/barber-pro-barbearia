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
import { usePaymentContext } from "@/contexts/PaymentContext";
import { useEffect } from "react";
import { loadItems } from "@/utils/loadItems";
import { useAuth } from "@/contexts/AuthContext";
import { getPayment } from "@/api/barbearia/barbeariaServices";


export const CardPaymentMethod = () => {

    const { barbearia } = useAuth();
    const { setPayment } = usePaymentContext();

    useEffect(() => {
        loadItems(barbearia, getPayment, setPayment);
    }, [barbearia]);

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
