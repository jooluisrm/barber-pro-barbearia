import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import {
    Eye, Package, DollarSign, Archive, Layers,
    AlertTriangle, CalendarDays
} from "lucide-react";
import { useState } from "react";
import { Products } from "@/types/products";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ItemInfoProduct } from "./itemInfoProduct";
import { formatarPreco } from "@/utils/formatarValores";

type Props = {
    itemProduct: Products;
};

export const DialogViewProduct = ({ itemProduct }: Props) => {

    const formatDate = (dateString?: string | null) => {
        if (!dateString) return "Não informado";
        const date = new Date(dateString);
        if (isNaN(date.getTime())) return "Data inválida";
        return date.toLocaleDateString("pt-BR", { day: "2-digit", month: "2-digit", year: "numeric" });
    };

    const [open, setOpen] = useState(false);

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <TooltipProvider>
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <Button variant="ghost" onClick={() => setOpen(true)}>
                                <Eye className="w-4 h-4" />
                            </Button>
                        </TooltipTrigger>
                        <TooltipContent><p>Ver mais</p></TooltipContent>
                    </Tooltip>
                </TooltipProvider>
            </DialogTrigger>
            <DialogContent
                className="space-y-4 max-h-[90vh] overflow-y-auto sm:max-w-[600px] w-full p-0"
            >
                <div className="sticky top-0 bg-background z-10 p-6 border-b space-y-4">
                    <DialogHeader>
                        <DialogTitle>Produto</DialogTitle>
                        <DialogDescription>
                            Veja todos os detalhes deste produto.
                        </DialogDescription>
                    </DialogHeader>

                    {/* Imagem e nome */}
                    <div className="flex items-center gap-4 border rounded-lg p-4 overflow-x-hidden">
                        <Avatar className="w-24 h-24">
                            <AvatarImage src={itemProduct.imagemUrl ?? "/placeholder.png"} />
                            <AvatarFallback>{itemProduct.nome.substring(0, 2).toUpperCase()}</AvatarFallback>
                        </Avatar>
                        <div className="space-y-1">
                            <ItemInfoProduct
                                label="Nome"
                                value={itemProduct.nome}
                                className="truncate max-w-[200px]"
                            />
                            <ItemInfoProduct
                                label="Descrição"
                                value={itemProduct.descricao ?? "Sem descrição..."}
                                className="truncate max-w-[250px]"
                            />
                        </div>
                    </div>
                </div>


                {/* Parte rolável */}
                <div className="px-6 pb-6 space-y-4">
                    {/* Preço e custo */}
                    <div className="grid grid-cols-2 gap-4">
                        <div className="flex items-center gap-3 border rounded-lg p-4">
                            <DollarSign className="w-5 h-5 text-muted-foreground" />
                            <ItemInfoProduct label="Preço de Venda" value={`${formatarPreco(itemProduct.precoVenda.toString())}`} />
                        </div>
                        <div className="flex items-center gap-3 border rounded-lg p-4">
                            <DollarSign className="w-5 h-5 text-muted-foreground" />
                            <ItemInfoProduct label="Custo" value={`${formatarPreco(itemProduct.custo.toString())}`} />
                        </div>
                    </div>

                    {/* Quantidade e alerta */}
                    <div className="grid grid-cols-2 gap-4">
                        <div className="flex items-center gap-3 border rounded-lg p-4">
                            <Package className="w-5 h-5 text-muted-foreground" />
                            <ItemInfoProduct label="Quantidade" value={String(itemProduct.quantidade)} />
                        </div>
                        <div className="flex items-center gap-3 border rounded-lg p-4">
                            <AlertTriangle className="w-5 h-5 text-muted-foreground" />
                            <ItemInfoProduct label="Estoque Baixo" value={itemProduct.alertaEstoqueBaixo ? String(itemProduct.alertaEstoqueBaixo) : "Não definido"} />
                        </div>
                    </div>

                    {/* Status e tipo */}
                    <div className="grid grid-cols-2 gap-4">
                        <div className="flex items-center gap-3 border rounded-lg p-4">
                            <Archive className="w-5 h-5 text-muted-foreground" />
                            <ItemInfoProduct label="Status" value={itemProduct.status} />
                        </div>
                        <div className="flex items-center gap-3 border rounded-lg p-4">
                            <Layers className="w-5 h-5 text-muted-foreground" />
                            <ItemInfoProduct label="Tipo" value={itemProduct.tipo} />
                        </div>
                    </div>

                    {/* Data de validade */}
                    <div className="flex items-center gap-3 border rounded-lg p-4">
                        <CalendarDays className="w-5 h-5 text-muted-foreground" />
                        <ItemInfoProduct
                            label="Data de Validade"
                            value={formatDate(itemProduct.dataValidade)}
                        />
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
};

