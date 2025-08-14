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
import { DialogViewProduct } from "./dialogViewProduct";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

type TableProductsProps = {
    currentPage: number;
    setCurrentPage: (page: number) => void;
}

export const TableProducts = ({ currentPage, setCurrentPage }: TableProductsProps) => {

    // ATUALIZADO: Pega o objeto de dados do contexto
    const { productData } = useProductContext();

    const totalPages = productData?.totalPages || 1;

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
                    <TableHead>Estoque</TableHead>
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
                            <TableCell className={`text-center font-extrabold ${item.alertaEstoqueBaixo != null && (item.quantidade <= item.alertaEstoqueBaixo ? "text-red-500" : "text-green-500")}`}>
                                {item.quantidade}
                            </TableCell>
                            <TableCell className="text-right">{formatarPreco(item.precoVenda.toString())}</TableCell>
                            <TableCell className="flex justify-end items-center">
                                <DialogViewProduct itemProduct={item} />
                                <DialogEditProduct itemProduct={item} />
                            </TableCell>
                        </TableRow>
                    ))}
            </TableBody>
            <TableFooter>
                <TableRow>
                    {/* --- CONTROLES DE PAGINAÇÃO --- */}
                    <TableCell colSpan={6}>
                        <div className="flex items-center justify-between">
                            <div className="text-sm text-muted-foreground">
                                Total de {productData?.total || 0} produto(s)
                            </div>
                            <div className="flex items-center gap-2">
                                <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() => setCurrentPage(currentPage - 1)}
                                    disabled={currentPage <= 1}
                                >
                                    <ChevronLeft className="h-4 w-4" />
                                    Anterior
                                </Button>
                                <span className="text-sm font-medium">
                                    Página {currentPage} de {totalPages}
                                </span>
                                <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() => setCurrentPage(currentPage + 1)}
                                    disabled={currentPage >= totalPages}
                                >
                                    Próximo
                                    <ChevronRight className="h-4 w-4" />
                                </Button>
                            </div>
                        </div>
                    </TableCell>
                </TableRow>
            </TableFooter>
        </Table >
    );
}
