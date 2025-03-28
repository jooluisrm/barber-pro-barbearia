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
    }, [barbearia]);

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
            <div className="pb-10 pt-5">
                <h1 className="text-xl md:text-3xl">Painel de <span className="font-bold text-blue-500">Agendamentos</span></h1>
                <p className="text-muted-foreground">Visualize, filtre e gerencie todos os agendamentos da sua barbearia.</p>
            </div>
            <div>
                <div className="flex justify-end gap-3 my-5">
                    <CalendarioFilter date={date} setDate={setDate}/>
                    <SelectFilterBarbeiro handleSelect={handleSelectBarbeiro} barbeiros={barbeiros}/>
                    <SelectFilterStatus handleSelect={handleSelectStatus} />
                </div>
                <TableAgendamentos agendamentosFiltrados={agendamentosFiltrados} />
            </div>
        </main>
    );
}