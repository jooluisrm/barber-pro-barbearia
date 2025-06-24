"use client"

import { HeaderPage } from "@/components/reultilizar/headerPage";
import { useScheduleContext } from "@/contexts/Barbeiro-Pages/scheduleContext";
import { TableAgendamentos } from "./tableAgendamentos";
import { DialogConcluirAgendamento } from "./dialogConcluirAgendamento";
import { CalendarioFilter } from "./calendarioFilter";
import { SelectFilterStatus } from "./selectFilterStatus";
import { useState } from "react";
import { Agendamentos } from "@/types/agendamentos";
import { DialogNovoAgendamento } from "./dialogNovoAgendamento";

export const MainAgendamentos = () => {

    const { setAgendamentos, agendamentos } = useScheduleContext();

    const [filtroSelecionadoStatus, setFiltroSelecionadoStatus] = useState("confirmado");
    const [agendamentosFiltrados, setAgendamentosFiltrados] = useState<Agendamentos[] | null>(null);
    const [date, setDate] = useState<Date>()

    const handleSelectStatus = (value: string) => {
        if (value) {
            setFiltroSelecionadoStatus(value);
            //loadItems(barbearia, getAgendamentos, setAgendamentos);
        }
    }

    return (
        <main>
            <HeaderPage
                title="Agendamentos"
                subTitle="Visualize, filtre e gerencie todos os agendamentos."
            />

            <div className="space-y-4">

                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="gap-4 grid grid-cols-2">
                        <DialogNovoAgendamento />
                        <DialogConcluirAgendamento />
                    </div>

                    {/* 🔹 Filtros - Organiza responsivamente */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:flex lg:items-center gap-4">
                        <CalendarioFilter date={date} setDate={setDate} />
                        <SelectFilterStatus handleSelect={handleSelectStatus} />
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <TableAgendamentos />
                </div>
            </div>
        </main>
    );
}