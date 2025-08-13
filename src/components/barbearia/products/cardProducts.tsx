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
import { useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { loadItems } from "@/utils/loadItems";
import { getProducts } from "@/api/barbearia/barbeariaServices";
import { useProductContext } from "@/contexts/ProductsContext";

export const CardProducts = () => {
    const { barbearia, token } = useAuth();
    // ATUALIZADO: O nome da função do context mudou
    const { setProductData } = useProductContext();


    useEffect(() => {
        // ATUALIZADO: Passa a função correta para o loadItems
        loadItems(barbearia, getProducts, setProductData);
    }, [token, barbearia]); // Adicionado 'barbearia' como dependência

    return (
        <Card className="flex flex-col justify-between">
            <div>
                <CardHeader>
                    <CardTitle>Produtos</CardTitle>
                    <CardDescription>Adicione os Produtos a venda na sua barbearia.</CardDescription>
                </CardHeader>
                <CardContent>
                    <TableProducts /> {/*Tabela para carregar produtos*/}
                </CardContent>
            </div>
            <CardFooter>
                <DialogNewProduct />
            </CardFooter>
        </Card>
    );
}
