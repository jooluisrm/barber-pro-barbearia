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
import { PlusCircle } from "lucide-react"
import { SelectPaymentMethod } from "./selectPaymentMethod"
import { useState } from "react"
import { useAuth } from "@/contexts/AuthContext"
import { getPayment, postPayment } from "@/api/barbearia/barbeariaServices"
import { loadItems } from "@/utils/loadItems"
import { usePaymentContext } from "@/contexts/PaymentContext"

export const DialogNewPaymentMethod = () => {
    const { barbearia } = useAuth();
    const { setPayment } = usePaymentContext();

    const [selectPayment, setSelectPayment] = useState("");

    const handleSelectPayment = (value: string) => {
        setSelectPayment(value);
    }

    const handleAddPaymentMethod = async () => {
        if (!barbearia) return;
        try {
            const data = {
                tipo: selectPayment
            }
            await postPayment(barbearia.id, data);
            loadItems(barbearia, getPayment, setPayment);
            setSelectPayment("");
        } catch (error: any) {
            console.log(error);
        }
    }

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button>Nova Forma de Pagamento</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader className="border-b pb-4">
                    <DialogTitle className="text-2xl font-bold flex items-center gap-2">
                        <PlusCircle className="w-6 h-6" />
                        Cadastrar Nova Forma de Pagamento
                    </DialogTitle>
                    <DialogDescription className="text-muted-foreground mt-2">
                        <span className="block text-sm text-primary/80 mt-1">
                            A forma de pagamento aparecerar aparecerá na página da barbearia.
                        </span>
                    </DialogDescription>
                </DialogHeader>
                <div className="flex flex-col gap-4">
                    <div>
                        <label htmlFor="">Forma de Pagamento</label>
                        <SelectPaymentMethod handleSelectPayment={handleSelectPayment} />
                    </div>
                </div>
                <DialogFooter>
                    <Button onClick={handleAddPaymentMethod}>Criar</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
