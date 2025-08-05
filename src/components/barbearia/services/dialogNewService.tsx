import { getServices, postService } from "@/api/barbearia/barbeariaServices"
import UploadImgAvatar from "@/components/uploadImgAvatar"
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
import { useAuth } from "@/contexts/AuthContext"
import { useServiceContext } from "@/contexts/ServicesContext"
import { loadItems } from "@/utils/loadItems"
import { PlusCircle } from "lucide-react"
import { useState } from "react"

type Props = {
    loadServices: () => void
}

export const DialogNewService = () => {
    const { barbearia } = useAuth();
    const { setServices } = useServiceContext();

    const [open, setOpen] = useState(false);

    const [inputNome, setInputNome] = useState("");
    const [inputDuracao, setInputDuracao] = useState(5);
    const [inputPreco, setInputPreco] = useState("0");

    const [imageFile, setImageFile] = useState<File | null>(null);

    const handleAddService = async () => {
        if (!barbearia || !inputNome) return;

        // Para enviar arquivos, precisamos usar FormData
        const formData = new FormData();
        formData.append('nome', inputNome);
        formData.append('duracao', String(inputDuracao)); // Enviar como string
        formData.append('preco', inputPreco);

        // Adiciona a imagem ao FormData SÓ SE ela foi selecionada
        if (imageFile) {
            formData.append('imagem', imageFile);
        }

        try {
            // A função postService agora receberá o FormData
            await postService(barbearia.id, formData);

            // Limpa o formulário e recarrega a lista
            await loadItems(barbearia, getServices, setServices);
            setOpen(false);
            setInputNome("");
            setInputDuracao(5);
            setInputPreco("0");
            setImageFile(null); // Limpa o estado da imagem
        } catch (error) {
            console.log(error);
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
                        Cadastrar Novo Serviço
                    </DialogTitle>
                    <DialogDescription className="text-muted-foreground mt-2">
                        <span className="block text-sm text-primary/80 mt-1">
                            O serviço aparecerá no catálogo da barbearia e poderá ser agendado
                        </span>
                    </DialogDescription>
                </DialogHeader>
                <div className="flex flex-col gap-4">
                    <div>
                        <UploadImgAvatar onFileSelect={setImageFile} />
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
                            <label htmlFor="">Duração (Minutos)</label>
                            <Input
                                type="number"
                                min={5}
                                placeholder="Minutos"
                                onChange={(e) => setInputDuracao(Number(e.target.value))}
                                value={inputDuracao}
                            />
                        </div>
                        <div className="">
                            <label htmlFor="">Preço (Opcional)</label>
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
                <DialogFooter>
                    <Button disabled={!inputNome || inputDuracao < 5} onClick={handleAddService}>Criar</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
