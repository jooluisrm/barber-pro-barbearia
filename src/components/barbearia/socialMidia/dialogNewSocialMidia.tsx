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
import { PlusCircle } from "lucide-react"
import { SelectSocialMidia } from "./selectSocialMidia"

export const DialogNewSocialMidia = () => {
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button>Nova Rede Social</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader className="border-b pb-4">
                    <DialogTitle className="text-2xl font-bold flex items-center gap-2">
                        <PlusCircle className="w-6 h-6" />
                        Cadastrar Nova Rede Social
                    </DialogTitle>
                    <DialogDescription className="text-muted-foreground mt-2">
                        <span className="block text-sm text-primary/80 mt-1">
                            A Rede Social aparecerá no site da barbearia.
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
                        <label htmlFor="">Link</label>
                        <Input placeholder="Link da rede social" />
                    </div>
                </div>
                <DialogFooter>
                    <Button type="submit">Criar</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
