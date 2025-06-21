"use client"

import { useEffect, useState } from "react";
import { TableAgendamentos } from "./tableAgendamentos";
import { AgendamentoPendente, Agendamentos } from "@/types/agendamentos";
import { useAuth } from "@/contexts/AuthContext";
import { getAgendamentos, getAgendamentosPendentes } from "@/api/agendamentos/agendamentoServices";
import { SelectFilterStatus } from "./selectFilterStatus";
import { CalendarioFilter } from "./calendarioFilter";
import { SelectFilterBarbeiro } from "./selectFilterBarbeiro";
import { getBarbeiros } from "@/api/barbeiros/barbeirosServices";
import { Barbeiro } from "@/types/barbeiros";
import { Button } from "../ui/button";
import { DialogNovoAgendamento } from "./dialogNovoAgendamento";
import { loadItems } from "@/utils/loadItems";
import { useScheduleContext } from "@/contexts/scheduleContext";
import { DialogConcluirAgendamento } from "./dialogConcluirAgendamento";
import { usePendingScheduleContext } from "@/contexts/PendingScheduleContext";
import { HeaderPage } from "../reultilizar/headerPage";

export const MainAgendamentos = () => {
    const { barbearia } = useAuth();
    const { setAgendamentos, agendamentos } = useScheduleContext();
    const {agendamentosPendentes, setAgendamentosPendentes} = usePendingScheduleContext();

    const [barbeiros, setBarbeiros] = useState<Barbeiro[] | null>(null);
    const [agendamentosFiltrados, setAgendamentosFiltrados] = useState<Agendamentos[] | null>(null);
    const [filtroSelecionadoStatus, setFiltroSelecionadoStatus] = useState("confirmado");
    const [filtroSelecionadoBarbeiro, setFiltroSelecionadoBarbeiro] = useState("todos");

    const [date, setDate] = useState<Date>()

    useEffect(() => {
        loadItems(barbearia, getAgendamentos, setAgendamentos)
    }, [barbearia, date]);

    useEffect(() => {
        loadItems(barbearia, getAgendamentosPendentes, setAgendamentosPendentes);
    }, [barbearia, agendamentos]);

    useEffect(() => {
        const carregarBarbeiros = async () => {
            if (barbearia) {
                const dados = await getBarbeiros(barbearia.id);
                setBarbeiros(dados);
            }
        }

        carregarBarbeiros();
    }, [barbearia, date]);

    const handleSelectStatus = (value: string) => {
        if (value) {
            setFiltroSelecionadoStatus(value);
            loadItems(barbearia, getAgendamentos, setAgendamentos);
        }
    }
    const handleSelectBarbeiro = (value: string) => {
        if (value) {
            setFiltroSelecionadoBarbeiro(value);
            loadItems(barbearia, getAgendamentos, setAgendamentos);
        }
    }

    useEffect(() => {
        const filtrarAgendamentos = () => {
            if (!agendamentos) return;
            let agendamentosFiltrados = agendamentos;

            // 🔹 Filtrar por data
            if (date) {
                agendamentosFiltrados = agendamentosFiltrados.filter((item) =>
                    new Date(item.data).toDateString() === new Date(date).toDateString()
                );
            }

            // 🔹 Filtrar por barbeiro
            if (filtroSelecionadoBarbeiro && filtroSelecionadoBarbeiro !== "todos") {
                agendamentosFiltrados = agendamentosFiltrados.filter(
                    (item) => item.barbeiroId === filtroSelecionadoBarbeiro
                );
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

            // ✅ Ordenar pela hora (formato "HH:mm")
            agendamentosFiltrados.sort((a, b) => {
                const [aHour, aMinute] = a.hora.split(":").map(Number);
                const [bHour, bMinute] = b.hora.split(":").map(Number);

                return aHour * 60 + aMinute - (bHour * 60 + bMinute);
            });

            setAgendamentosFiltrados(agendamentosFiltrados);
        };

        filtrarAgendamentos();
    }, [filtroSelecionadoStatus, filtroSelecionadoBarbeiro, agendamentos, date]);


    return (
        <main>
            {/* Título e descrição */}
           
            <HeaderPage 
                subTitle="Visualize, filtre e gerencie todos os agendamentos da sua barbearia."
                title="Agendamentos"
            />

            {/* Container principal */}
            <div className="space-y-4">
                {/* 🔹 Botão de Novo Agendamento e Filtros */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="gap-4 grid grid-cols-2">
                        <DialogNovoAgendamento />
                        <DialogConcluirAgendamento agendamentosPendentes={agendamentosPendentes}/>
                    </div>

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