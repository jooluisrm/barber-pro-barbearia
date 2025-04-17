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

type Props = {
    itemOpeningHours: OpeningHours;
}

export const DialogEditOpeningHours = ({ itemOpeningHours }: Props) => {

    const [selectHourInitValue, setSelectInitValue] = useState(itemOpeningHours.horaInicio);
    const [selectHourEndValue, setSelectEndValue] = useState(itemOpeningHours.horaFim);

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
                    <Button variant={"destructive"}>
                        <Trash />
                    </Button>
                    <Button>Salvar</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
