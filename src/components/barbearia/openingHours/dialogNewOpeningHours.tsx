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
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { PlusCircle } from "lucide-react"
import { useState } from "react"


export const DialogNewOpeningHours = () => {
    const [selectDia, setSelectDia] = useState<string | null>(null);

    const handleSelectDia = (value: string) => {
        setSelectDia(value);
    }

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button>Novo Horário de Atendimento</Button>
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
                        <SelectDiaSemana handleSelectDia={handleSelectDia}/>
                    </div>
                    <div>
                        <label htmlFor="">Horário de Início</label>
                        <Input />
                    </div>
                    <div>
                        <label htmlFor="">Horário de Fim</label>
                        <Input />
                    </div>
                </div>
                <DialogFooter>
                    <Button type="submit">Criar</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
