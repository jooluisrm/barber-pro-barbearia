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
    const { barbearia } = useAuth();
    const { setProducts } = useProductContext();


    useEffect(() => {
        loadItems(barbearia, getProducts, setProducts);
    }, [barbearia]);

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
