import { deleteProduct, getProducts, putProduct } from "@/api/barbearia/barbeariaServices"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { useAuth } from "@/contexts/AuthContext"
import { useProductContext } from "@/contexts/ProductsContext"
import { Products } from "@/types/products"
import { loadItems } from "@/utils/loadItems"
import { CalendarIcon, EditIcon, Scissors } from "lucide-react"
import { useEffect, useState } from "react"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { ButtonTrash } from "@/components/reultilizar/buttonTrash"
import UploadImgAvatar from "@/components/uploadImgAvatar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Calendar } from "@/components/ui/calendar"
import { format } from "date-fns"
import { cn } from "@/lib/utils"
import { toast } from "sonner"

type Props = {
    itemProduct: Products;
}

export const DialogEditProduct = ({ itemProduct }: Props) => {
    const { setProductData } = useProductContext(); // ATUALIZADO
    const { barbearia } = useAuth();

    const [open, setOpen] = useState(false);

    // --- ESTADOS PARA OS INPUTS ---
    const [inputNome, setInputNome] = useState(itemProduct.nome);
    const [inputDescricao, setInputDescricao] = useState(itemProduct.descricao || "");
    const [inputTipo, setInputTipo] = useState(itemProduct.tipo);
    const [inputPrecoVenda, setInputPrecoVenda] = useState(itemProduct.precoVenda); // ATUALIZADO
    const [inputCusto, setInputCusto] = useState(itemProduct.custo); // NOVO
    const [inputAlertaEstoque, setInputAlertaEstoque] = useState(itemProduct.alertaEstoqueBaixo || ''); // NOVO
    const [imageFile, setImageFile] = useState<File | null>(null);
    
    // Estado para o calendário
    const [dataValidade, setDataValidade] = useState<Date | undefined>(
        itemProduct.dataValidade ? new Date(itemProduct.dataValidade) : undefined
    );

    // Estados para o ajuste de estoque
    const [ajusteEstoque, setAjusteEstoque] = useState('');
    const [motivoAjuste, setMotivoAjuste] = useState('');

    // --- SINCRONIZAR ESTADO COM PROPS ---
    // Garante que o formulário resete se o item selecionado mudar
    useEffect(() => {
        if (open) {
            setInputNome(itemProduct.nome);
            setInputDescricao(itemProduct.descricao || "");
            setInputTipo(itemProduct.tipo);
            setInputPrecoVenda(itemProduct.precoVenda);
            setInputCusto(itemProduct.custo);
            setInputAlertaEstoque(itemProduct.alertaEstoqueBaixo || '');
            setDataValidade(itemProduct.dataValidade ? new Date(itemProduct.dataValidade) : undefined);
            // Reseta os campos de ajuste toda vez que o dialog abre
            setAjusteEstoque('');
            setMotivoAjuste('');
        }
    }, [open, itemProduct]);

    // --- HANDLERS ---
    const handleEditProduct = async () => {
        if (!barbearia) return;

        const formData = new FormData();

        // Anexa apenas os campos que podem ser alterados
        formData.append('nome', inputNome);
        formData.append('descricao', inputDescricao);
        formData.append('tipo', inputTipo);
        formData.append('precoVenda', String(inputPrecoVenda));
        formData.append('custo', String(inputCusto));
        formData.append('alertaEstoqueBaixo', String(inputAlertaEstoque));
        
        if (dataValidade) {
            formData.append('dataValidade', format(dataValidade, "yyyy-MM-dd"));
        }
        if (imageFile) {
            formData.append('imagemUrl', imageFile);
        }

        // Anexa o ajuste de estoque se houver
        const ajusteNumerico = Number(ajusteEstoque);
        if (ajusteNumerico !== 0) {
            if (!motivoAjuste) {
                // Adicionar um toast de erro aqui seria ideal
                toast.error("Por favor, forneça um motivo para o ajuste de estoque.");
                return;
            }
            formData.append('ajusteEstoque', String(ajusteNumerico));
            formData.append('motivoAjuste', motivoAjuste);
        }

        try {
            await putProduct(barbearia.id, itemProduct.id, formData);
            await loadItems(barbearia, getProducts, setProductData); // ATUALIZADO
            setOpen(false);
        } catch (error: any) {
            console.log("Erro no componente:", error);
        }
    }

    const handleArchiveProduct = async () => {
        if (!barbearia) return;
        try {
            // A função 'deleteProduct' no backend agora arquiva o produto
            await deleteProduct(barbearia.id, itemProduct.id);
            await loadItems(barbearia, getProducts, setProductData); // ATUALIZADO
            setOpen(false); // Fecha o dialog após arquivar
        } catch (error: any) {
            console.log(error);
        }
    }

    // --- RENDERIZAÇÃO ---
    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <TooltipProvider>
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <Button variant={"ghost"} onClick={() => setOpen(true)}><EditIcon className="w-4 h-4" /></Button>
                        </TooltipTrigger>
                        <TooltipContent><p>Editar / Arquivar</p></TooltipContent>
                    </Tooltip>
                </TooltipProvider>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px] max-h-[90vh] flex flex-col">
                <DialogHeader className="border-b pb-4">
                    <DialogTitle className="text-2xl font-bold flex items-center gap-2">
                        <Scissors className="w-6 h-6" /> Editar Produto
                    </DialogTitle>
                    <DialogDescription className="text-muted-foreground mt-2">
                        Atualize os detalhes do produto e faça ajustes no estoque.
                    </DialogDescription>
                </DialogHeader>
                <div className="flex-1 flex flex-col gap-4 py-4 overflow-y-auto pr-4">
                    <UploadImgAvatar initialImageUrl={itemProduct.imagemUrl} onFileSelect={setImageFile} />
                    
                    {/* Campos de Dados Descritivos */}
                    <div><label htmlFor="nome">Produto*</label><Input id="nome" value={inputNome} onChange={(e) => setInputNome(e.target.value)} /></div>
                    <div><label htmlFor="descricao">Descrição</label><Input id="descricao" value={inputDescricao} onChange={(e) => setInputDescricao(e.target.value)} /></div>
                    <div><label htmlFor="tipo">Tipo*</label><Input id="tipo" value={inputTipo} onChange={(e) => setInputTipo(e.target.value)} /></div>

                    {/* Dados Financeiros */}
                    <div className="flex justify-between gap-4">
                        <div className="w-1/2"><label htmlFor="precoVenda">Preço de Venda*</label><Input id="precoVenda" type="number" value={inputPrecoVenda} onChange={(e) => setInputPrecoVenda(Number(e.target.value))} /></div>
                        <div className="w-1/2"><label htmlFor="custo">Custo*</label><Input id="custo" type="number" value={inputCusto} onChange={(e) => setInputCusto(Number(e.target.value))} /></div>
                    </div>
                    
                    {/* Calendário */}
                    <div><label>Data de Validade</label><Popover><PopoverTrigger asChild><Button variant={"outline"} className={cn("w-full justify-start text-left font-normal", !dataValidade && "text-muted-foreground")}><CalendarIcon className="mr-2 h-4 w-4" />{dataValidade ? format(dataValidade, "dd/MM/yyyy") : <span>Selecione uma data</span>}</Button></PopoverTrigger><PopoverContent className="w-auto p-0"><Calendar mode="single" selected={dataValidade} onSelect={setDataValidade} initialFocus /></PopoverContent></Popover></div>
                    
                    {/* SEÇÃO DE AJUSTE DE ESTOQUE */}
                    <div className="border-t pt-4 mt-2 space-y-4">
                        <h4 className="font-semibold text-md">Ajustar Estoque</h4>
                        <p className="text-sm text-muted-foreground">Estoque atual: <span className="font-bold text-primary">{itemProduct.quantidade}</span> unidades.</p>
                        <div className="flex items-end gap-4">
                            <div className="flex-1"><label htmlFor="ajuste">Ajuste (+/-)</label><Input id="ajuste" type="number" placeholder="ex: 10 ou -2" value={ajusteEstoque} onChange={(e) => setAjusteEstoque(e.target.value)} /></div>
                            <div className="flex-1"><label htmlFor="motivo">Motivo do ajuste</label><Input id="motivo" placeholder="Venda, Perda..." value={motivoAjuste} onChange={(e) => setMotivoAjuste(e.target.value)} /></div>
                        </div>
                    </div>
                </div>
                <DialogFooter className="gap-2 sm:gap-0">
                    <ButtonTrash 
                        deleteFunction={handleArchiveProduct}
                    />
                    <Button onClick={handleEditProduct}>Salvar Alterações</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}