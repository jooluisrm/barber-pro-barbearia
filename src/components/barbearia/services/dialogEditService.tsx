import { deleteService, getServices, putService } from "@/api/barbearia/barbeariaServices"
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
import { Label } from "@/components/ui/label"
import { useAuth } from "@/contexts/AuthContext"
import { useServiceContext } from "@/contexts/ServicesContext"
import { Services } from "@/types/services"
import { loadItems } from "@/utils/loadItems"
import { EditIcon, Scissors, Trash } from "lucide-react"
import { useState } from "react"
import { AlertDeleteService } from "./alertDeleteService"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import UploadImgAvatar from "@/components/uploadImgAvatar"

type Props = {
    itemService: Services;
}

export const DialogEditService = ({ itemService }: Props) => {
    const { barbearia } = useAuth();
    const { setServices } = useServiceContext();

    const [open, setOpen] = useState(false);

    const [inputNome, setInputNome] = useState(itemService.nome);
    const [inputDuracao, setInputDuracao] = useState(itemService.duracao);
    const [inputPreco, setInputPreco] = useState(itemService.preco);
    
    const [imageFile, setImageFile] = useState<File | null>(null);

    const handleEditService = async () => {
        if (!barbearia) return;

        const formData = new FormData();
        // Adiciona os campos de texto. O backend é inteligente e só atualizará o que mudou.
        formData.append('nome', inputNome);
        formData.append('duracao', String(inputDuracao));
        formData.append('preco', inputPreco);

        // Adiciona a NOVA imagem ao FormData SÓ SE uma nova foi selecionada
        if (imageFile) {
            formData.append('imagem', imageFile);
        }

        try {
            const done = await putService(barbearia.id, itemService.id, formData);
            if (done) {
                await loadItems(barbearia, getServices, setServices);
                setOpen(false);
                // Não precisa limpar os inputs aqui, pois o diálogo será fechado
            }
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
                            <Button variant={"ghost"} onClick={() => setOpen(true)}><EditIcon /></Button>
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
                        Editar Serviço
                    </DialogTitle>
                    <DialogDescription className="text-muted-foreground mt-2">
                        Atualize os detalhes deste serviço oferecido pela barbearia
                        <span className="block text-sm text-primary/80 mt-1">
                            As alterações afetarão todos os agendamentos.
                        </span>
                    </DialogDescription>
                </DialogHeader>
                <div className="flex flex-col gap-4">
                    <div>
                        <UploadImgAvatar 
                            onFileSelect={setImageFile} 
                            initialImageUrl={itemService.imagemUrl}
                        />
                    </div>
                    <div className="">
                        <label htmlFor="">Serviço</label>
                        <Input
                            placeholder="Nome do serviço"
                            onChange={(e) => setInputNome(e.target.value)}
                            value={inputNome}
                        />
                    </div>
                    <div className="flex justify-between gap-5">
                        <div className="">
                            <label htmlFor="">Duração</label>
                            <Input
                                type="number"
                                min={5}
                                placeholder="Minutos"
                                onChange={(e) => setInputDuracao(Number(e.target.value))}
                                value={inputDuracao}
                            />
                        </div>
                        <div className="">
                            <label htmlFor="">Preço</label>
                            <Input
                                type="number"
                                min={0}
                                placeholder="R$"
                                onChange={(e) => setInputPreco(e.target.value)}
                                value={inputPreco}
                            />
                        </div>
                    </div>
                </div>
                <DialogFooter className="gap-3">
                    <AlertDeleteService itemService={itemService} />
                    <Button onClick={handleEditService}>Salvar</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
