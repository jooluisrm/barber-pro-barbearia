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

export const DialogNewProduct = () => {
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button>Novo Produto</Button>
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
                    <div className="">
                        <label htmlFor="nome">Produto</label>
                        <Input id="nome" placeholder="Nome do produto" />
                    </div>
                    <div className="">
                        <label htmlFor="descricao">Descriçao</label>
                        <Input id="descricao" min={5} placeholder="Descrição do produto" />
                    </div>
                    <div className="flex justify-between gap-5">
                        <div className="">
                            <label htmlFor="tipo">Tipo</label>
                            <Input id="tipo" type="number" min={0} placeholder="ex: Bebida" />
                        </div>
                        <div className="">
                            <label htmlFor="preco">Preço</label>
                            <Input id="preco" type="number" min={0} placeholder="R$" />
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
