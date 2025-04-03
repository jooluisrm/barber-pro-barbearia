import { Barbeiro } from "@/types/barbeiros";
import { AlertDialogHeader } from "../ui/alert-dialog";
import { DialogDescription, DialogTitle } from "../ui/dialog";
import { SelectDiaSemana } from "./selectDiaSemana";
import { AlertSelectDiaSemana } from "./alertSelectDiaSemana";
import { useState } from "react";
import { Button } from "../ui/button";
import { Plus } from "lucide-react";

type Props = {
    barbeiro: Barbeiro;
    backPage: VoidFunction;
}

export const ContentGerenciarHorarios = ({ barbeiro, backPage }: Props) => {

    const [selectDia, setSelectDia] = useState<string | null>(null);

    const handleSelectDia = (value: string) => {
        setSelectDia(value);
    }

    return (
        <>
            <AlertDialogHeader>
                <DialogTitle className="text-xl font-semibold">
                    ⏱️ Configurar Horários de Atendimento
                </DialogTitle>
                <DialogDescription>
                    Estabeleça os horários disponíveis para agendamentos dos seus serviços
                </DialogDescription>
            </AlertDialogHeader>
            <main>
                <div className={`flex pb-5 ${!selectDia ? "justify-end" : "justify-between"}`}>
                    <Button className={`${!selectDia ? "hidden" : "flex"}`}>
                        <Plus />
                    </Button>
                    <SelectDiaSemana handleSelectDia={handleSelectDia}/>
                </div>
                <div>
                    {
                        !selectDia && <AlertSelectDiaSemana />
                    }
                </div>
            </main>
        </>
    );
}