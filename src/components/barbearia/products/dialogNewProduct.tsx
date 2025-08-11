import { getProducts, postProduct } from "@/api/barbearia/barbeariaServices"
import { NovoItem } from "@/components/reultilizar/novoItem"
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
import UploadImgAvatar from "@/components/uploadImgAvatar"
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
    const [imageFile, setImageFile] = useState<File | null>(null);

    const handleAddProduct = async () => {
        if (!barbearia || !inputNome || !inputTipo) return;

        // 1. Criar o objeto FormData
        const formData = new FormData();

        // 2. Anexar todos os dados de texto
        formData.append('nome', inputNome);
        formData.append('descricao', inputDescricao);
        formData.append('tipo', inputTipo);
        formData.append('preco', String(inputPreco)); // Enviar números como string

        // 3. Anexar o arquivo de imagem, se ele existir
        if (imageFile) {
            formData.append('imagemUrl', imageFile); // 'imagemUrl' deve corresponder ao upload.single() no backend
        }

        try {
            // 4. Chamar a API com o FormData
            await postProduct(barbearia.id, formData);

            // 5. Recarregar a lista e limpar o formulário
            await loadItems(barbearia, getProducts, setProducts);
            setInputPreco(0);
            setInputNome("");
            setInputTipo("");
            setInputDescricao("");
            setImageFile(null); // Limpa a imagem selecionada
            setOpen(false);

        } catch (error: any) {
            console.log("Erro no componente:", error);
            // O toast de erro já é tratado na função da API
        }
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <NovoItem onCLick={setOpen}/>
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
                    <UploadImgAvatar onFileSelect={setImageFile}/>
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
