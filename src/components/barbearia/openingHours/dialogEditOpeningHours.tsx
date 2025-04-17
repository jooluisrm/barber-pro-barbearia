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
import { SelectHourEnd } from "./selectHourEnd"
import { SelectHourInit } from "./selectHourInit"
import { useState } from "react"
import { OpeningHours } from "@/types/openingHours"
import { useAuth } from "@/contexts/AuthContext"
import { useOpeningHoursContext } from "@/contexts/OpeningHoursContext"
import { DataOpeningHours, deleteOpeningHours, getOpeningHours, putOpeningHours } from "@/api/barbearia/barbeariaServices"
import { loadItems } from "@/utils/loadItems"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

type Props = {
    itemOpeningHours: OpeningHours;
}

export const DialogEditOpeningHours = ({ itemOpeningHours }: Props) => {
    const { barbearia } = useAuth();
    const { setOpeningHours } = useOpeningHoursContext();

    const [open, setOpen] = useState(false);

    const [selectHourInitValue, setSelectInitValue] = useState(itemOpeningHours.horaInicio);
    const [selectHourEndValue, setSelectEndValue] = useState(itemOpeningHours.horaFim);

    const handleEditOpeningHours = async () => {
        if (!barbearia) return;
        try {
            const data: DataOpeningHours = {
                horaFim: selectHourEndValue,
                horaInicio: selectHourInitValue
            }
            const done = await putOpeningHours(barbearia.id, itemOpeningHours.id, data);
            if (done) {
                await loadItems(barbearia, getOpeningHours, setOpeningHours);
                setOpen(false);
            }
        } catch (error: any) {
            console.log(error);
        }
    }

    const handleDeleteOpeningHours = async () => {
        if (!barbearia) return;
        try {
            await deleteOpeningHours(barbearia.id, itemOpeningHours.id);
            await loadItems(barbearia, getOpeningHours, setOpeningHours);
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
                        Editar Horário de Atendimento
                    </DialogTitle>
                    <DialogDescription className="text-muted-foreground mt-2">
                        Atualize os detalhes deste Horário de Atendimento.
                    </DialogDescription>
                </DialogHeader>
                <div className="flex text-center">
                    <div>
                        <label htmlFor="">Horário Início</label>
                        <SelectHourInit setValue={setSelectInitValue} value={selectHourInitValue} />
                    </div>
                    <div>
                        <label htmlFor="">Horário Fim</label>
                        <SelectHourEnd setValue={setSelectEndValue} value={selectHourEndValue} />
                    </div>
                </div>
                <DialogFooter className="gap-3">
                    <Button variant={"destructive"} onClick={handleDeleteOpeningHours}>
                        <Trash />
                    </Button>
                    <Button
                        onClick={handleEditOpeningHours}
                        disabled={selectHourEndValue === itemOpeningHours.horaFim && selectHourInitValue === itemOpeningHours.horaInicio}
                    >
                        Salvar
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
