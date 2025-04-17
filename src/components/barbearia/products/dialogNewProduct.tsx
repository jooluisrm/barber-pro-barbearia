import { getProducts, postProduct } from "@/api/barbearia/barbeariaServices"
import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { useAuth } from "@/contexts/AuthContext"
import { useProductContext } from "@/contexts/ProductsContext"
import { Products } from "@/types/products"
import { loadItems } from "@/utils/loadItems"
import { PlusCircle } from "lucide-react"
import { useState } from "react"

export const DialogNewProduct = () => {
    const { setProducts } = useProductContext();
    const { barbearia } = useAuth();

    const [open, setOpen] = useState(false);

    const [inputNome, setInputNome] = useState("");
    const [inputDescricao, setInputDescricao] = useState("");
    const [inputTipo, setInputTipo] = useState("");
    const [inputPreco, setInputPreco] = useState(0);

    const handleAddProduct = async () => {
        if (!barbearia) return;
        try {
            const data = {
                nome: inputNome,
                descricao: inputDescricao,
                tipo: inputTipo,
                preco: inputPreco
            }
            await postProduct(barbearia.id, data);
            await loadItems(barbearia, getProducts, setProducts);
            setInputPreco(0);
            setInputNome("");
            setInputTipo("");
            setInputDescricao("");
            setOpen(false);
        } catch (error: any) {
            console.log(error);
        }

    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button onClick={() => setOpen(true)} >Novo Produto</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader className="border-b pb-4">
                    <DialogTitle className="text-2xl font-bold flex items-center gap-2">
                        <PlusCircle className="w-6 h-6" />
                        Cadastrar Novo Produto
                    </DialogTitle>
                    <DialogDescription className="text-muted-foreground mt-2">
                        <span className="block text-sm text-primary/80 mt-1">
                            O Produto aparecerá no catálogo da barbearia.
                        </span>
                    </DialogDescription>
                </DialogHeader>
                <div className="flex flex-col gap-4">
                    <div className="">
                        <label htmlFor="nome">Produto</label>
                        <Input
                            id="nome"
                            placeholder="Nome do produto"
                            value={inputNome}
                            onChange={(e) => setInputNome(e.target.value)}
                        />
                    </div>
                    <div className="">
                        <label htmlFor="descricao">Descriçao</label>
                        <Input
                            id="descricao"
                            min={5}
                            placeholder="Descrição do produto"
                            value={inputDescricao}
                            onChange={(e) => setInputDescricao(e.target.value)}
                        />
                    </div>
                    <div className="flex justify-between gap-5">
                        <div className="">
                            <label htmlFor="tipo">Tipo</label>
                            <Input
                                id="tipo"
                                placeholder="ex: Bebida"
                                value={inputTipo}
                                onChange={(e) => setInputTipo(e.target.value)}
                            />
                        </div>
                        <div className="">
                            <label htmlFor="preco">Preço</label>
                            <Input
                                id="preco"
                                type="number"
                                min={0}
                                placeholder="R$"
                                value={inputPreco}
                                onChange={(e) => setInputPreco(Number(e.target.value))}
                            />
                        </div>
                    </div>
                </div>
                <DialogFooter>
                    <Button 
                    onClick={handleAddProduct}
                    disabled={!inputNome || !inputTipo}
                    >Criar</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
