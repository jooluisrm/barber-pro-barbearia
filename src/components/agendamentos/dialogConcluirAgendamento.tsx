import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "../ui/button";
import { ItemConcluirAgendamento } from "./itemConcluirAgendamento";
import { MensagemSemAgendamentosPendentes } from "./msmSemAgendamentosPendentes";

export const DialogConcluirAgendamento = () => {
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button className="font-bold relative flex items-center gap-2">
                    Concluir Agendamentos
                    {/* Notificação visual (badge) */}
                    <span className="absolute top-0 right-0 w-2.5 h-2.5 bg-red-600 rounded-full animate-pulse" />
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Agendamentos pendentes</DialogTitle>
                    <DialogDescription>
                        Esta operação identifica agendamentos com horário expirado e status pendente, e os conclui automaticamente para manter os dados atualizados.
                    </DialogDescription>
                </DialogHeader>
                <main>
                    <ItemConcluirAgendamento />
                    <MensagemSemAgendamentosPendentes />
                </main>
            </DialogContent>
        </Dialog>
    );
}