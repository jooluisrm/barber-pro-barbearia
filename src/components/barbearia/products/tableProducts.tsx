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
import { useProductContext } from "@/contexts/ProductsContext";
import { formatarPreco } from "@/utils/formatarValores";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export const TableProducts = () => {

    const { products } = useProductContext();

    return (
        <Table>
            <TableCaption>Lista de Produtos Vendidos</TableCaption>
            <TableHeader>
                <TableRow>
                    <TableHead></TableHead>
                    <TableHead className="w-[150px]">Produto</TableHead>
                    <TableHead>Descrição</TableHead>
                    <TableHead>Tipo</TableHead>
                    <TableHead className="text-right">Preço</TableHead>
                    <TableHead className="text-right"></TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>

                {products != null && products.map((item) => (
                    <TableRow key={item.id}>
                        <TableCell>
                            <Avatar>
                                <AvatarImage src={item.imagemUrl ? item.imagemUrl : "/favicon.png"} />
                                <AvatarFallback></AvatarFallback>
                            </Avatar>
                        </TableCell>
                        <TableCell className="font-medium">{item.nome}</TableCell>
                        <TableCell>{item?.descricao}</TableCell>
                        <TableCell>{item.tipo}</TableCell>
                        <TableCell className="text-right">{formatarPreco(item.preco.toString())}</TableCell>
                        <TableCell className="flex justify-end items-center">
                            <DialogEditProduct itemProduct={item} />
                        </TableCell>
                    </TableRow>
                ))}

            </TableBody>
            <TableFooter>
                <TableRow>
                    <TableCell colSpan={4}>Total de Produtos</TableCell>
                    <TableCell className="text-right">{products?.length}</TableCell>
                </TableRow>
            </TableFooter>
        </Table>
    );
}
