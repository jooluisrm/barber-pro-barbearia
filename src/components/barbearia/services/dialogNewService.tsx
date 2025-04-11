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
import { PlusCircle } from "lucide-react"
import { useState } from "react"

export const DialogNewService = () => {

    const [inputNome, setInputNome] = useState("");
    const [inputDuracao, setInputDuracao] = useState(5);
    const [inputPreco, setInputPreco] = useState("");

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button>Novo Serviço</Button>
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
                <DialogFooter>
                    <Button type="submit">Criar</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
