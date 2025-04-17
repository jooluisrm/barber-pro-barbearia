"use client"

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
import { Agendamentos } from "@/types/agendamentos"
import { formatarData, formatarPreco } from "@/utils/formatarValores"
import { EditIcon } from "lucide-react"
import { SelectStatus } from "./selectStatus"
import { useState } from "react"
import { editarAgendamento } from "@/api/agendamentos/agendamentoServices"
import { toast } from "sonner"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

type Props = {
    agendamentoSelecionado: Agendamentos;
}

export function DialogEdit({ agendamentoSelecionado }: Props) {

    const [statusSelecionado, setStatusSelecionado] = useState(agendamentoSelecionado.status);

    const [open, setOpen] = useState(false);

    const handleSelect = (value: "Confirmado" | "Feito" | "Cancelado") => {
        setStatusSelecionado(value);
    }

    const editarStatusAgendamento = async (agendamentoId: string, novoStatus: "Confirmado" | "Feito" | "Cancelado") => {
        if (agendamentoId) {
            try {
                await editarAgendamento(agendamentoId, novoStatus);
                toast.success(`O status do agendamento foi atualizado para "${novoStatus}".`, {
                    action: {
                        label: "Fechar",
                        onClick: () => console.log("Fechar"),
                    }
                });            
            } catch (error: any) {
                const errorMessage = error.message || "Erro ao trocar status";

                toast.error(errorMessage, {
                    action: {
                        label: "Fechar",
                        onClick: () => console.log("Fechar"),
                    }
                });
            }
        }
    }

    return (
        <Dialog>
            <DialogTrigger asChild>
                <EditIcon className="cursor-pointer hover:text-primary transition-colors" />
            </DialogTrigger>
            <DialogContent className="sm:max-w-[500px] rounded-lg">
                <DialogHeader>
                    <DialogTitle className="text-xl font-bold">Atualizar Agendamento</DialogTitle>
                    <DialogDescription className="text-muted-foreground">
                        Modifique o status ou detalhes deste atendimento
                    </DialogDescription>
                </DialogHeader>

                <div className="grid gap-4 py-4">
                    {/* Section Header */}
                    <div className="space-y-2 border-b pb-3">
                        <h4 className="font-medium text-sm text-muted-foreground">DETALHES DO AGENDAMENTO</h4>
                    </div>

                    {/* Info Grid */}
                    <div className="grid grid-cols-2 gap-4 text-sm">
                        <div className="space-y-1">
                            <p className="text-muted-foreground">Cliente</p>
                            <p className="font-medium">{agendamentoSelecionado.usuario.nome}</p>
                        </div>

                        <div className="space-y-1">
                            <p className="text-muted-foreground">Barbeiro</p>
                            <p className="font-medium">{agendamentoSelecionado.barbeiro.nome}</p>
                        </div>

                        <div className="space-y-1">
                            <p className="text-muted-foreground">Serviço</p>
                            <p className="font-medium">{agendamentoSelecionado.servico.nome}</p>
                        </div>

                        <div className="space-y-1">
                            <p className="text-muted-foreground">Valor</p>
                            <p className="font-medium text-green-500">R$ {formatarPreco(agendamentoSelecionado.servico.preco)}</p>
                        </div>

                        <div className="space-y-1 col-span-2">
                            <p className="text-muted-foreground">Data e Hora</p>
                            <p className="font-medium">
                                {formatarData(agendamentoSelecionado.data)} • {agendamentoSelecionado.hora}
                            </p>
                        </div>
                    </div>

                    {/* Status Section */}
                    <div className="space-y-3 pt-4 border-t">
                        <p className="text-sm text-muted-foreground">Status do Atendimento</p>
                        <div className="w-full [&_button]:w-full">
                            <SelectStatus status={statusSelecionado} handleSelect={handleSelect} />
                        </div>
                    </div>
                </div>

                <DialogFooter>
                    <Button
                        onClick={() => editarStatusAgendamento(agendamentoSelecionado.id, statusSelecionado)}
                        className="w-full sm:w-auto bg-primary hover:bg-primary/90"
                    >
                        Salvar Alterações
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
