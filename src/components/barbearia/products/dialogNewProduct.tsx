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

    const { setProductData } = useProductContext();
    const { barbearia } = useAuth();

    const [open, setOpen] = useState(false);

    // Estados existentes (vamos renomear 'inputPreco' para clareza)
    const [inputNome, setInputNome] = useState("");
    const [inputDescricao, setInputDescricao] = useState("");
    const [inputTipo, setInputTipo] = useState("");
    const [inputPrecoVenda, setInputPrecoVenda] = useState(0); // RENOMEADO
    const [imageFile, setImageFile] = useState<File | null>(null);

    // NOVOS ESTADOS para os campos de estoque
    const [inputCusto, setInputCusto] = useState(0);
    const [inputQuantidade, setInputQuantidade] = useState(0);
    const [inputAlertaEstoque, setInputAlertaEstoque] = useState(''); // String para permitir campo vazio
    const [inputDataValidade, setInputDataValidade] = useState(''); // String para o input type="date"

    const handleAddProduct = async () => {
        // Validação para os novos campos obrigatórios
        if (!barbearia || !inputNome || !inputTipo || !inputPrecoVenda || !inputCusto) return;

        const formData = new FormData();

        // Anexa os dados, incluindo os novos campos de estoque
        formData.append('nome', inputNome);
        formData.append('descricao', inputDescricao);
        formData.append('tipo', inputTipo);
        formData.append('precoVenda', String(inputPrecoVenda)); // ATUALIZADO
        formData.append('custo', String(inputCusto)); // NOVO
        formData.append('quantidade', String(inputQuantidade)); // NOVO

        // Anexa os campos opcionais apenas se tiverem valor
        if (inputAlertaEstoque) {
            formData.append('alertaEstoqueBaixo', inputAlertaEstoque); // NOVO
        }
        if (inputDataValidade) {
            formData.append('dataValidade', inputDataValidade); // NOVO
        }
        if (imageFile) {
            formData.append('imagemUrl', imageFile);
        }

        try {
            await postProduct(barbearia.id, formData);

            // Recarrega a lista
            await loadItems(barbearia, getProducts, setProductData); // ATUALIZADO

            // Limpa TODOS os campos do formulário
            setInputNome("");
            setInputDescricao("");
            setInputTipo("");
            setInputPrecoVenda(0);
            setInputCusto(0);
            setInputQuantidade(0);
            setInputAlertaEstoque('');
            setInputDataValidade('');
            setImageFile(null);
            setOpen(false);

        } catch (error: any) {
            console.log("Erro no componente:", error);
        }
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <NovoItem onCLick={setOpen} />
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
                    <UploadImgAvatar onFileSelect={setImageFile} />
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
                    </div>

                    <div className="flex justify-between gap-4">
                        <div className="w-1/2">
                            <label htmlFor="precoVenda">Preço de Venda*</label>
                            <Input id="precoVenda" type="number" min={0} placeholder="R$" value={inputPrecoVenda} onChange={(e) => setInputPrecoVenda(Number(e.target.value))} />
                        </div>
                        <div className="w-1/2">
                            <label htmlFor="custo">Custo*</label>
                            <Input id="custo" type="number" min={0} placeholder="R$" value={inputCusto} onChange={(e) => setInputCusto(Number(e.target.value))} />
                        </div>
                    </div>

                    <div className="flex justify-between gap-4">
                        <div className="w-1/2">
                            <label htmlFor="quantidade">Qtd. Inicial*</label>
                            <Input id="quantidade" type="number" min={0} placeholder="0" value={inputQuantidade} onChange={(e) => setInputQuantidade(Number(e.target.value))} />
                        </div>
                        <div className="w-1/2">
                            <label htmlFor="alertaEstoque">Alerta de Estoque</label>
                            <Input id="alertaEstoque" type="number" min={0} placeholder="ex: 10" value={inputAlertaEstoque} onChange={(e) => setInputAlertaEstoque(e.target.value)} />
                        </div>
                    </div>

                    <div>
                        <label htmlFor="dataValidade">Data de Validade</label>
                        <Input id="dataValidade" type="date" value={inputDataValidade} onChange={(e) => setInputDataValidade(e.target.value)} />
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
