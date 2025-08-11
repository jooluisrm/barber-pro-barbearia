import { deleteProduct, getProducts, putProduct } from "@/api/barbearia/barbeariaServices"
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
import { EditIcon, Scissors, Trash } from "lucide-react"
import { useState } from "react"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { ButtonTrash } from "@/components/reultilizar/buttonTrash"
import UploadImgAvatar from "@/components/uploadImgAvatar"

type Props = {
    itemProduct: Products;
}

export const DialogEditProduct = ({ itemProduct }: Props) => {
    const { setProducts } = useProductContext();
    const { barbearia } = useAuth();

    const [open, setOpen] = useState(false);

    const [inputNome, setInputNome] = useState(itemProduct.nome);
    const [inputDescricao, setInputDescricao] = useState(itemProduct.descricao || "");
    const [inputTipo, setInputTipo] = useState(itemProduct.tipo);
    const [inputPreco, setInputPreco] = useState(itemProduct.preco);
    const [imageFile, setImageFile] = useState<File | null>(null);

    const handleEditProduct = async () => {
        if (!barbearia) return;

        // 1. Criar o objeto FormData
        const formData = new FormData();

        // 2. Anexar os dados de texto
        // O backend é flexível e só atualizará os campos enviados
        formData.append('nome', inputNome);
        formData.append('descricao', inputDescricao);
        formData.append('tipo', inputTipo);
        formData.append('preco', String(inputPreco));

        // 3. Anexar o novo arquivo de imagem, se ele existir
        if (imageFile) {
            formData.append('imagemUrl', imageFile);
        }

        try {
            // 4. Chamar a API com o FormData
            const done = await putProduct(barbearia.id, itemProduct.id, formData);

            if (done) {
                await loadItems(barbearia, getProducts, setProducts);
                setOpen(false);
            }
        } catch (error: any) {
            console.log("Erro no componente:", error);
        }
    }

    const handleDeleteProduct = async () => {
        if (!barbearia) return;
        try {
            await deleteProduct(barbearia.id, itemProduct.id);
            await loadItems(barbearia, getProducts, setProducts);
        } catch (error: any) {
            console.log(error);
        }
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <TooltipProvider>
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <Button variant={"ghost"} onClick={() => setOpen(true)} ><EditIcon /></Button>
                        </TooltipTrigger>
                        <TooltipContent>
                            <p>Editar/Excluir</p>
                        </TooltipContent>
                    </Tooltip>
                </TooltipProvider>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader className="border-b pb-4">
                    <DialogTitle className="text-2xl font-bold flex items-center gap-2">
                        <Scissors className="w-6 h-6" />
                        Editar Produto
                    </DialogTitle>
                    <DialogDescription className="text-muted-foreground mt-2">
                        Atualize os detalhes deste produto oferecido pela barbearia
                    </DialogDescription>
                </DialogHeader>
                <div className="flex flex-col gap-4">
                    <UploadImgAvatar initialImageUrl={itemProduct.imagemUrl} onFileSelect={setImageFile}/>
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
                <DialogFooter className="gap-3">
                    <ButtonTrash deleteFunction={handleDeleteProduct}/>
                    <Button onClick={handleEditProduct} >Salvar</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
