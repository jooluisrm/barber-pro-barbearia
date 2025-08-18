"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Agendamentos } from "@/types/agendamentos"; // Use o tipo correto
import { formatarPreco } from "@/utils/formatarValores";
import { CancelarAgendamentoPendente } from "./cancelarAgendamentoPendente";
import { patchConcluirAgendamento } from "@/api/agendamentos/agendamentoServices";
import { useAuth } from "@/contexts/AuthContext";
import { useMemo, useState } from "react";
import { LoaderCircle, ShoppingBasket } from "lucide-react";
import { DialogConcluirComanda } from "./DialogConcluirComanda";

type Props = {
    item: Agendamentos;
    onActionSuccess: () => void; // Callback para avisar que uma ação foi concluída
}

export const ItemConcluirAgendamento = ({ item, onActionSuccess }: Props) => {

    const valorCalculado = useMemo(() => {
        // Se o agendamento já foi finalizado, use o valorTotal salvo
        if (item.valorTotal) {
            return Number(item.valorTotal);
        }

        // Se não, calcula o valor com base nos itens atuais
        const valorServicos = item.servicosRealizados?.reduce((acc, s) => acc + Number(s.precoNoMomento || 0), 0) || 0;
        const valorProdutos = item.produtosConsumidos?.reduce((acc, p) => acc + (Number(p.precoVendaNoMomento || 0) * p.quantidade), 0) || 0;

        return valorServicos + valorProdutos;
    }, [item]); // Recalcula apenas se o 'item' mudar

    return (
        <Card className="flex items-center justify-between w-full shadow-sm border p-3">
            <div className="flex-1">
                <CardHeader className="p-0 pb-2">
                    <CardTitle className="text-sm sm:text-base">{item.nomeCliente}</CardTitle>
                    <p className="text-xs text-muted-foreground font-bold">
                        {new Date(item.data.replace(/-/g, '/')).toLocaleDateString('pt-BR', { timeZone: 'America/Sao_Paulo' })} • <span className="text-blue-500">{item.hora}</span>
                    </p>
                </CardHeader>

                <CardContent className="p-0 text-sm text-muted-foreground overflow-hidden">
                    <div className="flex items-center justify-between">
                        <p className="truncate text-nowrap max-w-60">
                            <span className="font-medium text-foreground">Serviços: </span>
                            {item.servicosRealizados?.map(s => s.servico.nome).join(', ') || 'Nenhum serviço informado'}
                        </p>

                    </div>

                    <div className="flex items-center justify-between mt-1">
                        <p className="truncate text-nowrap max-w-60">
                            <span className="font-medium text-foreground">Produtos: </span>
                            {item.produtosConsumidos?.map(p => p.produto.nome).join(', ') || 'Nenhum produto'}
                        </p>

                    </div>

                    <p className="mt-1">
                        <span className="font-medium text-foreground">Barbeiro:</span> {item.barbeiro.nome}
                    </p>
                    <p>
                        <span className="font-medium text-foreground">Valor: </span>
                        <span className="text-green-600 font-bold">
                            {formatarPreco(valorCalculado.toFixed(2))}
                        </span>
                    </p>
                </CardContent>
            </div>

            <div className="flex flex-col-reverse sm:flex-row gap-2 ml-4">
                <CancelarAgendamentoPendente itemId={item.id} onActionSuccess={onActionSuccess} />

                {/* Passe o 'item' (agendamento) e a função de callback */}
                <DialogConcluirComanda item={item} onActionSuccess={onActionSuccess} />

            </div>
        </Card>
    );
};