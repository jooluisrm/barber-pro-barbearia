"use client"

import { useEffect, useState } from "react";
import { TableAgendamentos } from "./tableAgendamentos";
import { Agendamentos } from "@/types/agendamentos";
import { useAuth } from "@/contexts/AuthContext";
import { getAgendamentos } from "@/api/agendamentos/agendamentoServices";
import { SelectFilter } from "./selectFilter";

export const MainAgendamentos = () => {
    const { barbearia } = useAuth();

    const [agendamentos, setAgendamentos] = useState<Agendamentos[] | null>(null);

    useEffect(() => {
        const carregarAgendamentos = async () => {
            if (barbearia) {
                const dados = await getAgendamentos(barbearia.id);
                setAgendamentos(dados);
            }
        }
        carregarAgendamentos();
    }, [barbearia]);

    return (
        <main>
            <div>
                <div className="flex justify-end my-5">
                    <SelectFilter />
                </div>
                <TableAgendamentos agendamentos={agendamentos} />
            </div>
        </main>
    );
}