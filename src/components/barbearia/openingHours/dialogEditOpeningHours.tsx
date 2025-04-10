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
import { EditIcon, Scissors, Trash } from "lucide-react"

export const DialogEditOpeningHours = () => {
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant={"ghost"}><EditIcon /></Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader className="border-b pb-4">
                    <DialogTitle className="text-2xl font-bold flex items-center gap-2">
                        <Scissors className="w-6 h-6" />
                        Editar Horário de Atendimento
                    </DialogTitle>
                    <DialogDescription className="text-muted-foreground mt-2">
                        Atualize os detalhes deste Horário de Atendimento.
                    </DialogDescription>
                </DialogHeader>
                <div className="grid grid-cols-2 gap-2">
                    <div>
                        <label htmlFor="">Horário de Início</label>
                        <Input />
                    </div>
                    <div>
                        <label htmlFor="">Horário de Fim</label>
                        <Input />
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
