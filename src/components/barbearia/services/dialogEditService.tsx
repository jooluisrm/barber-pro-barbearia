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

    const handleEditService = async () => {
        if (!barbearia) return;
        try {
            const data = {
                nome: inputNome,
                duracao: inputDuracao,
                preco: inputPreco
            }
            await putService(barbearia.id, itemService.id, data);
            await loadItems(barbearia, getServices, setServices);
            setOpen(false);
        } catch (error: any) {
            console.log(error);
        }
    }

    const handleDeleteService = async () => {
        if(!barbearia) return;
        try {
            await deleteService(barbearia.id, itemService.id);
            await loadItems(barbearia, getServices, setServices);
        } catch (error: any) {
            console.log(error);
        }
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button variant={"ghost"} onClick={() => setOpen(true)}><EditIcon /></Button>
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
                    <Button variant={"destructive"} onClick={handleDeleteService}>
                        <Trash />
                    </Button>
                    <Button onClick={handleEditService}>Salvar</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
