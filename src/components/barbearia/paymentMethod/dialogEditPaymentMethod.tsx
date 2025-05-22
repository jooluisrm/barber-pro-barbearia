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
import { Payment } from "@/types/payment"
import { useAuth } from "@/contexts/AuthContext"
import { usePaymentContext } from "@/contexts/PaymentContext"
import { deletePayment, getPayment } from "@/api/barbearia/barbeariaServices"
import { loadItems } from "@/utils/loadItems"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { useState } from "react"
import { ButtonTrash } from "@/components/reultilizar/buttonTrash"

type Props = {
    itemPayment: Payment;
}

export const DialogEditPaymentMethod = ({ itemPayment }: Props) => {

    const { barbearia } = useAuth();
    const { setPayment } = usePaymentContext();

    const [open, setOpen] = useState(false);

    const handleDeletePayment = async () => {
        if (!barbearia) return;
        try {
            await deletePayment(barbearia.id, itemPayment.id);
            await loadItems(barbearia, getPayment, setPayment);
            setOpen(false);
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
                            <Button variant={"ghost"} onClick={(e) => setOpen(true)}><EditIcon /></Button>
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
                        Editar Forma de Pagamento
                    </DialogTitle>
                    <DialogDescription className="text-muted-foreground mt-2">
                        Atualize os detalhes desta Forma de Pagamento aceita pela barbearia
                    </DialogDescription>
                </DialogHeader>
                <DialogFooter className="gap-3">
                    <ButtonTrash deleteFunction={handleDeletePayment}/>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
