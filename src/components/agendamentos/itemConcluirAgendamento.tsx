"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge"; 
import { AgendamentoPendente } from "@/types/agendamentos";
import { formatarPreco } from "@/utils/formatarValores";
import { CancelarAgendamentoPendente } from "./cancelarAgendamentoPendente";
import { getAgendamentos, getAgendamentosPendentes, patchConcluirAgendamento } from "@/api/agendamentos/agendamentoServices";
import { useAuth } from "@/contexts/AuthContext";
import { loadItems } from "@/utils/loadItems";
import { usePendingScheduleContext } from "@/contexts/PendingScheduleContext";
import { useState } from "react";
import { LoaderCircle } from "lucide-react";
import { useScheduleContext } from "@/contexts/scheduleContext";

type Props = {
    item: AgendamentoPendente;
}

export const ItemConcluirAgendamento = ({ item }: Props) => {
    const {setAgendamentosPendentes} = usePendingScheduleContext();
    const { setAgendamentos } = useScheduleContext();
    const {barbearia} = useAuth();

    const [loading, setLoading] = useState(false);

    const handleDone = async () => {
        if(!barbearia) return;
        setLoading(true);
        await patchConcluirAgendamento(barbearia.id, item.idAgendamento);
        await loadItems(barbearia, getAgendamentosPendentes,setAgendamentosPendentes);
        await loadItems(barbearia, getAgendamentos, setAgendamentos)
        setLoading(false);
    }

    return (
        <Card className="flex items-center justify-between w-full shadow-sm border border-muted bg-background px-4 py-2">
            <div className="flex-1">
                <CardHeader className="pb-1">
                    <div className="flex items-center gap-2">
                        <CardTitle className="text-sm sm:text-base text-foreground">
                            {item.nomeCliente}
                        </CardTitle>
                        <Badge variant={"outline"} className="text-xs capitalize text-yellow-500">{item.status}</Badge>
                    </div>
                    <p className="text-xs text-muted-foreground font-bold">
                        {item.data} • <span className="text-blue-500">{item.hora}</span>
                    </p>
                </CardHeader>

                <CardContent className="flex flex-col gap-4 items-start text-sm text-muted-foreground pt-1">
                    <div className="space-y-1">
                        <p><span className="font-medium text-foreground">Barbeiro:</span> {item.nomeBarbeiro}</p>
                        <p><span className="font-medium text-foreground">Serviço:</span> {item.nomeServico}</p>
                        <p><span className="font-medium text-foreground">Valor:</span> <span className="text-green-600">{formatarPreco(item.valor)}</span></p>
                    </div>
                </CardContent>
            </div>

            <div className="flex flex-col-reverse gap-2 ml-4">
                <CancelarAgendamentoPendente itemId={item.idAgendamento}/>
                <Button size="sm" onClick={handleDone} disabled={loading}>
                    {loading ? <LoaderCircle className="animate-spin"/> : "Concluir"}
                </Button>
            </div>
        </Card>
    );
};
