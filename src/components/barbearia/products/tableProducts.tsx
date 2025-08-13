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

    // ATUALIZADO: Pega o objeto de dados do contexto
    const { productData } = useProductContext();

    // Extrai a lista de produtos do objeto
    const products = productData?.produtos || [];

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
                {/* A verificação agora é em 'products' que é um array garantido */
                    products.map((item) => (
                        <TableRow key={item.id}>
                            <TableCell>
                                <Avatar>
                                    <AvatarImage src={item.imagemUrl ? item.imagemUrl : "/favicon.png"} />
                                    <AvatarFallback>{item.nome.substring(0, 2).toUpperCase()}</AvatarFallback>
                                </Avatar>
                            </TableCell>
                            <TableCell className="font-medium">{item.nome}</TableCell>
                            <TableCell>{item?.descricao}</TableCell>
                            <TableCell>{item.tipo}</TableCell>
                            
                        <TableCell className="text-right">{formatarPreco(item.precoVenda.toString())}</TableCell>
                        <TableCell className="flex justify-end items-center">
                            <DialogEditProduct itemProduct={item} />
                        </TableCell>
                        </TableRow>
                    ))}
            </TableBody>
            <TableFooter>
                <TableRow>
                    <TableCell colSpan={5}>Total de Produtos Ativos</TableCell>
                    <TableCell className="text-right">{productData?.total || 0}</TableCell>
                </TableRow>
            </TableFooter>
        </Table>
    );
}
