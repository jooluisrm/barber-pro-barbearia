"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Agendamentos } from "@/types/agendamentos"; // Use o tipo correto
import { formatarPreco } from "@/utils/formatarValores";
import { CancelarAgendamentoPendente } from "./cancelarAgendamentoPendente";
import { patchConcluirAgendamento } from "@/api/agendamentos/agendamentoServices";
import { useAuth } from "@/contexts/AuthContext";
import { useState } from "react";
import { LoaderCircle } from "lucide-react";

type Props = {
    item: Agendamentos;
    onActionSuccess: () => void; // Callback para avisar que uma ação foi concluída
}

export const ItemConcluirAgendamento = ({ item, onActionSuccess }: Props) => {
    const { barbearia } = useAuth();
    const [loading, setLoading] = useState(false);

    const handleDone = async () => {
        if (!barbearia) return;
        setLoading(true);
        try {
            // ATENÇÃO: Por enquanto, enviamos um corpo vazio. No futuro, aqui
            // você poderá adicionar produtos/serviços de última hora.
            await patchConcluirAgendamento(barbearia.id, item.id);
            onActionSuccess(); // Chama o callback de sucesso
        } catch (error) {
            console.error("Erro ao concluir agendamento:", error);
        } finally {
            setLoading(false);
        }
    }

    return (
        <Card className="flex items-center justify-between w-full shadow-sm border p-3">
            <div className="flex-1">
                <CardHeader className="p-0 pb-2">
                    <CardTitle className="text-sm sm:text-base">{item.nomeCliente}</CardTitle>
                    <p className="text-xs text-muted-foreground font-bold">
                        {item.data} • <span className="text-blue-500">{item.hora}</span>
                    </p>
                </CardHeader>

                <CardContent className="p-0 text-sm text-muted-foreground">
                    <p>
                        <span className="font-medium text-foreground">Serviços: </span>
                        {/* Adicione o '?' antes do .map */}
                        {item.servicosRealizados?.map(s => s.servico.nome).join(', ') || 'Nenhum serviço informado'}
                    </p>
                    <p><span className="font-medium text-foreground">Barbeiro:</span> {item.barbeiro.nome}</p>
                    <p><span className="font-medium text-foreground">Valor:</span> <span className="text-green-600">{formatarPreco(item.valorTotal || "0")}</span></p>
                </CardContent>
            </div>

            <div className="flex flex-col-reverse sm:flex-row gap-2 ml-4">
                <CancelarAgendamentoPendente itemId={item.id} onActionSuccess={onActionSuccess} />
                <Button size="sm" onClick={handleDone} disabled={loading}>
                    {loading ? <LoaderCircle className="animate-spin" /> : "Concluir"}
                </Button>
            </div>
        </Card>
    );
};