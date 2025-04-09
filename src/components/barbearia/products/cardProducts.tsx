import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { TableProducts } from "./tableProducts"
import { DialogNewProduct } from "./dialogNewProduct";

export const CardProducts = () => {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Produtos</CardTitle>
                <CardDescription>Adicione os Produtos a venda na sua barbearia.</CardDescription>
            </CardHeader>
            <CardContent>
                <TableProducts /> {/*Tabela para carregar produtos*/}
            </CardContent>
            <CardFooter className="flex justify-between">
                <DialogNewProduct />
            </CardFooter>
        </Card>
    );
}
