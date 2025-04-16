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
import { EditIcon, Scissors, Trash } from "lucide-react"
import { SelectPaymentMethod } from "./selectPaymentMethod"
import { Payment } from "@/types/payment"

type Props = {
    itemPayment: Payment;
}

export const DialogEditPaymentMethod = ({ itemPayment }: Props) => {
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant={"ghost"}><EditIcon /></Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader className="border-b pb-4">
                    <DialogTitle className="text-2xl font-bold flex items-center gap-2">
                        <Scissors className="w-6 h-6" />
                        Editar Forma de Pagamento
                    </DialogTitle>
                    <DialogDescription className="text-muted-foreground mt-2">
                        Atualize os detalhes desta Forma de Pagamento aceita pela barbearia
                    </DialogDescription>
                </DialogHeader>
                <DialogFooter className="gap-3">
                    <Button variant={"destructive"}>
                        <Trash />
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
