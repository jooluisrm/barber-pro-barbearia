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
import { SelectSocialMidia } from "./selectSocialMidia"

export const DialogEditSocialMidia = () => {
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant={"ghost"}><EditIcon /></Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader className="border-b pb-4">
                    <DialogTitle className="text-2xl font-bold flex items-center gap-2">
                        <Scissors className="w-6 h-6" />
                        Editar Rede Social
                    </DialogTitle>
                    <DialogDescription className="text-muted-foreground mt-2">
                        Atualize os detalhes desta rede social.
                        <span className="block text-sm text-primary/80 mt-1">
                            As alterações afetará a exibição na barbearia.
                        </span>
                    </DialogDescription>
                </DialogHeader>
                <div className="flex flex-col gap-4">
                    <div className="flex gap-5">
                        <div className="">
                            <label htmlFor="" className="">Rede Social</label>
                            <SelectSocialMidia />
                        </div>
                    </div>
                    <div className="">
                        <label htmlFor="link">Link</label>
                        <Input id="link" placeholder="Link da rede social" />
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
