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
import { AgendamentoPendente } from "@/types/agendamentos";

type Props = {
    agendamentosPendentes: AgendamentoPendente[] | null;
}

export const DialogConcluirAgendamento = ({ agendamentosPendentes }: Props) => {
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button className="font-bold relative flex items-center gap-2">
                    Concluir Agendamentos
                    {/* Notificação visual (badge) */}
                    {agendamentosPendentes && agendamentosPendentes.length > 0 && (
                        <span
                            className={`
                absolute -top-1 -right-1 w-5 h-5 bg-red-600 rounded-full
                flex items-center justify-center text-[10px] text-white
            `}
                        >
                            {agendamentosPendentes.length > 9 ? "9+" : agendamentosPendentes.length}
                        </span>
                    )}
                </Button>

            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Agendamentos pendentes</DialogTitle>
                    <DialogDescription>
                        Esta operação localiza agendamentos pendentes cujo horário já expirou, para que o usuário possa avaliá-los e concluir conforme necessário.
                    </DialogDescription>
                </DialogHeader>
                <main className="flex flex-col gap-4 max-h-52 xl:max-h-[400px] overflow-y-hidden">
                    {
                        agendamentosPendentes &&
                            agendamentosPendentes?.length > 0 ? agendamentosPendentes.map((item) => (
                                <ItemConcluirAgendamento key={item.idAgendamento} item={item} />
                            )) : <MensagemSemAgendamentosPendentes />
                    }

                </main>
            </DialogContent>
        </Dialog>
    );
}