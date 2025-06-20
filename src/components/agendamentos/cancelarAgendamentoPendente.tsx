import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "../ui/button";
import { usePendingScheduleContext } from "@/contexts/PendingScheduleContext";
import { useScheduleContext } from "@/contexts/scheduleContext";
import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { getAgendamentos, getAgendamentosPendentes, patchCancelarAgendamento } from "@/api/agendamentos/agendamentoServices";
import { loadItems } from "@/utils/loadItems";
import { LoaderCircle } from "lucide-react";

type Props = {
    itemId: string;
}

export const CancelarAgendamentoPendente = ({ itemId }: Props) => {

    const { setAgendamentosPendentes } = usePendingScheduleContext();
    const { setAgendamentos } = useScheduleContext();
    const { barbearia } = useAuth();

    const [loading, setLoading] = useState(false);

    const handleCancel = async () => {
        if (!barbearia) return;
        setLoading(true);
        await patchCancelarAgendamento(barbearia.id, itemId);
        await loadItems(barbearia, getAgendamentosPendentes, setAgendamentosPendentes);
        await loadItems(barbearia, getAgendamentos, setAgendamentos)
        setLoading(false);
    }

    return (
        <AlertDialog>
            <AlertDialogTrigger>
                <Button variant="outline" size="sm">
                    Cancelar
                </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Cancelar agendamento?</AlertDialogTitle>
                    <AlertDialogDescription>
                        Tem certeza que deseja cancelar este agendamento? Esta ação não poderá ser desfeita.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>Voltar</AlertDialogCancel>
                    <AlertDialogAction asChild>
                        <Button variant={'destructive'} onClick={handleCancel} disabled={loading}>
                            {loading ? <LoaderCircle className="animate-spin" /> : "Confirmar"}
                        </Button>
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
};
