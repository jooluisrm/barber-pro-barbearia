"use client"

import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "../ui/button";
import { ItemConcluirAgendamento } from "./itemConcluirAgendamento";
import { MensagemSemAgendamentosPendentes } from "./msmSemAgendamentosPendentes";
import { Agendamentos } from "@/types/agendamentos"; // Use o tipo correto
import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { getPendingAppointments } from "@/api/agendamentos/agendamentoServices";

type Props = {
    pendingCount: number;
    onUpdate: () => void; // Função para avisar o pai que a lista principal precisa ser atualizada
}

export const DialogConcluirAgendamento = ({ pendingCount, onUpdate }: Props) => {
    const { barbearia, usuario } = useAuth();
    const [agendamentosPendentes, setAgendamentosPendentes] = useState<Agendamentos[] | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    const fetchPendingList = async () => {
        if (!barbearia || !usuario) return;
        setIsLoading(true);
        try {
            const data = await getPendingAppointments(barbearia.id, usuario);
            setAgendamentosPendentes(data);
        } catch (error) {
            console.error(error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Dialog onOpenChange={(isOpen) => {
            // Quando o dialog abrir, busca a lista fresca de pendentes
            if (isOpen) {
                fetchPendingList();
            }
        }}>
            <DialogTrigger asChild>
                <Button className="font-bold relative flex items-center gap-2">
                    Concluir Pendentes
                    {pendingCount > 0 && (
                        <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-600 rounded-full flex items-center justify-center text-[10px] text-white">
                            {pendingCount > 9 ? "9+" : pendingCount}
                        </span>
                    )}
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Agendamentos pendentes</DialogTitle>
                    <DialogDescription>
                       Agendamentos cujo horário já passou e precisam de uma ação (Concluir ou Cancelar).
                    </DialogDescription>
                </DialogHeader>
                <main className="flex flex-col gap-4 pr-4 max-h-52 xl:max-h-[400px] overflow-y-auto">
                    {isLoading ? <p>Carregando...</p>
                     : agendamentosPendentes && agendamentosPendentes.length > 0
                        ? agendamentosPendentes.map((item) => (
                            <ItemConcluirAgendamento 
                                key={item.id} 
                                item={item} 
                                // Passa as funções de callback para atualizar as listas
                                onActionSuccess={() => {
                                    fetchPendingList(); // Re-busca a lista de pendentes
                                    onUpdate(); // Avisa o componente pai para re-buscar a lista principal
                                }}
                            />
                        ))
                        : <MensagemSemAgendamentosPendentes />
                    }
                </main>
            </DialogContent>
        </Dialog>
    );
}