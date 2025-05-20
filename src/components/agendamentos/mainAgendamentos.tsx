"use client"

import { useEffect, useState } from "react";
import { TableAgendamentos } from "./tableAgendamentos";
import { Agendamentos } from "@/types/agendamentos";
import { useAuth } from "@/contexts/AuthContext";
import { getAgendamentos } from "@/api/agendamentos/agendamentoServices";
import { SelectFilterStatus } from "./selectFilterStatus";
import { CalendarioFilter } from "./calendarioFilter";
import { SelectFilterBarbeiro } from "./selectFilterBarbeiro";
import { getBarbeiros } from "@/api/barbeiros/barbeirosServices";
import { Barbeiro } from "@/types/barbeiros";
import { Button } from "../ui/button";
import { DialogNovoAgendamento } from "./dialogNovoAgendamento";

export const MainAgendamentos = () => {
    const { barbearia } = useAuth();

    const [agendamentos, setAgendamentos] = useState<Agendamentos[] | null>(null);
    const [barbeiros, setBarbeiros] = useState<Barbeiro[] | null>(null);
    const [agendamentosFiltrados, setAgendamentosFiltrados] = useState<Agendamentos[] | null>(null);
    const [filtroSelecionadoStatus, setFiltroSelecionadoStatus] = useState("confirmado");
    const [filtroSelecionadoBarbeiro, setFiltroSelecionadoBarbeiro] = useState("todos");

    const [date, setDate] = useState<Date>()


    useEffect(() => {
        const carregarAgendamentos = async () => {
            if (barbearia) {
                const dados = await getAgendamentos(barbearia.id);
                setAgendamentos(dados);
            }
        }
        const carregarBarbeiros = async () => {
            if (barbearia) {
                const dados = await getBarbeiros(barbearia.id);
                setBarbeiros(dados);
            }
        }

        carregarBarbeiros();
        carregarAgendamentos();
    }, [barbearia, date]);

    const handleSelectStatus = (value: string) => {
        if (value) {
            setFiltroSelecionadoStatus(value);
        }
    }
    const handleSelectBarbeiro = (value: string) => {
        if (value) {
            setFiltroSelecionadoBarbeiro(value);
        }
    }

    useEffect(() => {
        const filtrarAgendamentos = () => {
            if (!agendamentos) return;
            let agendamentosFiltrados = agendamentos;

            // 🔹 Filtrar por data, se uma data estiver selecionada
            if (date) {
                agendamentosFiltrados = agendamentosFiltrados.filter((item) => item.data === date);
            }

            // 🔹 Filtrar por barbeiro, se um barbeiro estiver selecionado e diferente de "todos"
            if (filtroSelecionadoBarbeiro && filtroSelecionadoBarbeiro !== "todos") {
                agendamentosFiltrados = agendamentosFiltrados.filter((item) => item.barbeiroId === filtroSelecionadoBarbeiro);
            }

            // 🔹 Filtrar por status
            switch (filtroSelecionadoStatus) {
                case "confirmado":
                    agendamentosFiltrados = agendamentosFiltrados.filter((item) => item.status === "Confirmado");
                    break;
                case "feito":
                    agendamentosFiltrados = agendamentosFiltrados.filter((item) => item.status === "Feito");
                    break;
                case "cancelado":
                    agendamentosFiltrados = agendamentosFiltrados.filter((item) => item.status === "Cancelado");
                    break;
                case "todos":
                default:
                    break;
            }

            setAgendamentosFiltrados(agendamentosFiltrados);
        };

        filtrarAgendamentos();
    }, [filtroSelecionadoStatus, filtroSelecionadoBarbeiro, agendamentos, date]);

    return (
        <main>
            {/* Título e descrição */}
            <div className="pb-6 pt-5 text-center sm:text-left">
                <h1 className="text-2xl sm:text-3xl font-semibold">
                    Painel de <span className="text-blue-500">Agendamentos</span>
                </h1>
                <p className="text-muted-foreground text-sm sm:text-base">
                    Visualize, filtre e gerencie todos os agendamentos da sua barbearia.
                </p>
            </div>

            {/* Container principal */}
            <div className="space-y-4">
                {/* 🔹 Botão de Novo Agendamento e Filtros */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <DialogNovoAgendamento />

                    {/* 🔹 Filtros - Organiza responsivamente */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:flex lg:items-center gap-4">
                        <CalendarioFilter date={date} setDate={setDate} />
                        <SelectFilterBarbeiro handleSelect={handleSelectBarbeiro} barbeiros={barbeiros} />
                        <SelectFilterStatus handleSelect={handleSelectStatus} />
                    </div>
                </div>

                {/* 🔹 Tabela de Agendamentos */}
                <div className="overflow-x-auto">
                    <TableAgendamentos agendamentosFiltrados={agendamentosFiltrados} />
                </div>
            </div>
        </main>

    );
}