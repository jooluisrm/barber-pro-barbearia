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
    const [agendamentosFiltrados, setAgendamentosFiltrados] = useState<Agendamentos[] | null>(null);
    const [filtroSelecionado, setFiltroSelecionado] = useState("confirmado");


    useEffect(() => {
        const carregarAgendamentos = async () => {
            if (barbearia) {
                const dados = await getAgendamentos(barbearia.id);
                setAgendamentos(dados);
            }
        }
        carregarAgendamentos();
    }, [barbearia]);

    const handleSelect = (value: string) => {
        if (value) {
            setFiltroSelecionado(value);
        }
    }

    useEffect(() => {
        const filtrarAgendamentos = () => {
            if (!agendamentos) return;

            let filtrados = agendamentos;

            switch (filtroSelecionado) {
                case "confirmado":
                    filtrados = agendamentos.filter((item) => item.status === "Confirmado");
                    break;
                case "feito":
                    filtrados = agendamentos.filter((item) => item.status === "Feito");
                    break;
                case "cancelado":
                    filtrados = agendamentos.filter((item) => item.status === "Cancelado");
                    break;
                case "todos":
                default:
                    filtrados = agendamentos;
                    break;
            }

            setAgendamentosFiltrados(filtrados);
        };

        filtrarAgendamentos();
    }, [filtroSelecionado, agendamentos]);

    return (
        <main>
            <div>
                <div className="flex justify-end my-5">
                    <SelectFilter handleSelect={handleSelect} />
                </div>
                <TableAgendamentos agendamentosFiltrados={agendamentosFiltrados} />
            </div>
        </main>
    );
}