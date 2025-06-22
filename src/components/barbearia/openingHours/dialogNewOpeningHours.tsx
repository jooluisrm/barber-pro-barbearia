"use client"

import { SelectDiaSemana } from "@/components/barbeiros/selectDiaSemana"
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
import { useState } from "react"
import { SelectHourInit } from "./selectHourInit"
import { SelectHourEnd } from "./selectHourEnd"
import { useAuth } from "@/contexts/AuthContext"
import { useOpeningHoursContext } from "@/contexts/OpeningHoursContext"
import { DataOpeningHours, getOpeningHours, postOpeningHours } from "@/api/barbearia/barbeariaServices"
import { loadItems } from "@/utils/loadItems"
import { NovoItem } from "@/components/reultilizar/novoItem"


export const DialogNewOpeningHours = () => {

    const { barbearia } = useAuth();
    const { setOpeningHours } = useOpeningHoursContext();

    const [selectDia, setSelectDia] = useState<string | null>(null);

    const [open, setOpen] = useState(false);

    const [selectHourInitValue, setSelectInitValue] = useState("");
    const [selectHourEndValue, setSelectEndValue] = useState("");

    const handleSelectDia = (value: string) => {
        setSelectDia(value);
    }

    const handleAddOpeningHours = async () => {
        if (!barbearia) return;
        if (!selectDia) return;
        try {
            const data: DataOpeningHours = {
                diaSemana: Number(selectDia),
                horaFim: selectHourEndValue,
                horaInicio: selectHourInitValue
            }
            const done = await postOpeningHours(barbearia.id, data);
            if (done) {
                await loadItems(barbearia, getOpeningHours, setOpeningHours);
                setSelectEndValue("");
                setSelectInitValue("");
                setSelectDia(null);
                setOpen(false);
            }

        } catch (error: any) {
            console.log(error);
        }
    }

    return (
        <Dialog open={open} onOpenChange={setOpen} modal={false}>
            <DialogTrigger asChild>
                <NovoItem onCLick={setOpen}/> 
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader className="border-b pb-4">
                    <DialogTitle className="text-2xl font-bold flex items-center gap-2">
                        <PlusCircle className="w-6 h-6" />
                        Cadastrar Novo Horário de Atendimento
                    </DialogTitle>
                    
                    <DialogDescription className="text-muted-foreground mt-2">
                        <span className="block text-sm text-primary/80 mt-1">
                            O novo Horário de Atendimento aparecerar aparecerá na página da barbearia.
                        </span>
                    </DialogDescription>
                </DialogHeader>
                <div className="grid grid-cols-3 gap-2">
                    <div>
                        <label htmlFor="">Dia da semana</label>
                        <SelectDiaSemana handleSelectDia={handleSelectDia} />
                    </div>
                    <div>
                        <label htmlFor="">Horário Início</label>
                        <SelectHourInit setValue={setSelectInitValue} value={selectHourInitValue} />
                    </div>
                    <div>
                        <label htmlFor="">Horário Fim</label>
                        <SelectHourEnd setValue={setSelectEndValue} value={selectHourEndValue} />
                    </div>
                </div>
                <DialogFooter>
                    <Button
                        onClick={handleAddOpeningHours}
                        disabled={!selectDia || !selectHourEndValue || !selectHourInitValue}
                    >Criar</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
