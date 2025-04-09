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
import { EditIcon, Scissors, Trash } from "lucide-react"

export const DialogEditProduct = () => {
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant={"ghost"}><EditIcon /></Button>
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
                    <div className="">
                        <label htmlFor="">Serviço</label>
                        <Input placeholder="Nome do serviço" />
                    </div>
                    <div className="flex justify-between gap-5">
                        <div className="">
                            <label htmlFor="">Duração</label>
                            <Input type="number" min={5} placeholder="Minutos" />
                        </div>
                        <div className="">
                            <label htmlFor="">Preço</label>
                            <Input type="number" min={0} placeholder="R$" />
                        </div>
                    </div>
                </div>
                <DialogFooter className="gap-3">
                    <Button variant={"destructive"}>
                        <Trash />
                    </Button>
                    <Button>Salvar</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
