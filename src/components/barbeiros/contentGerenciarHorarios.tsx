import { Barbeiro } from "@/types/barbeiros";
import { AlertDialogHeader } from "../ui/alert-dialog";
import { DialogDescription, DialogTitle } from "../ui/dialog";
import { SelectDiaSemana } from "./selectDiaSemana";

type Props = {
    barbeiro: Barbeiro;
    backPage: VoidFunction;
}

export const ContentGerenciarHorarios = ({ barbeiro, backPage }: Props) => {
    return (
        <>
            <AlertDialogHeader>
                <DialogTitle>Gerenciar Horários</DialogTitle>
                <DialogDescription>
                    Crie e exclua Horários de agendamentos de serviços
                </DialogDescription>
            </AlertDialogHeader>
            <main>
                <SelectDiaSemana />
            </main>
        </>
    );
}