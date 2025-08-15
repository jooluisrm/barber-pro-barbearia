"use client"

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
import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { patchCancelarAgendamento } from "@/api/agendamentos/agendamentoServices";
import { LoaderCircle } from "lucide-react";

// 1. ATUALIZADO: As props agora incluem o callback
type Props = {
    itemId: string;
    onActionSuccess: () => void;
}

export const CancelarAgendamentoPendente = ({ itemId, onActionSuccess }: Props) => {
    // 2. REMOVIDO: Os contextos não são mais necessários aqui
    const { barbearia } = useAuth();
    const [loading, setLoading] = useState(false);

    const handleCancel = async () => {
        if (!barbearia) return;
        setLoading(true);
        try {
            await patchCancelarAgendamento(barbearia.id, itemId);
            // 3. SIMPLIFICADO: Apenas chama o callback de sucesso
            onActionSuccess();
        } catch (error) {
            console.error("Erro ao cancelar agendamento:", error);
        } finally {
            setLoading(false);
        }
    }

    return (
        <AlertDialog>
            <AlertDialogTrigger asChild>
                <Button variant="destructive" size="sm" disabled={loading}>
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
                            {loading ? <LoaderCircle className="animate-spin" /> : "Confirmar Cancelamento"}
                        </Button>
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
};