"use client"

import { useEffect, useState } from "react";
import { TableAgendamentos } from "./tableAgendamentos";
import { Agendamentos } from "@/types/agendamentos";
import { useAuth } from "@/contexts/AuthContext";
import { getAgendamentos } from "@/api/agendamentos/agendamentoServices";
import { SelectFilterStatus } from "./selectFilterStatus";
import { CalendarioFilter } from "./calendarioFilter";

export const MainAgendamentos = () => {
    const { barbearia } = useAuth();

    const [agendamentos, setAgendamentos] = useState<Agendamentos[] | null>(null);
    const [agendamentosFiltrados, setAgendamentosFiltrados] = useState<Agendamentos[] | null>(null);
    const [filtroSelecionado, setFiltroSelecionado] = useState("confirmado");
    const [date, setDate] = useState<Date>()


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
            let agendamentosPorData = agendamentos;
            
            if(!date) return;
            agendamentosPorData = agendamentos.filter((item) => item.data == date)
            
            let filtrados = agendamentos;

            switch (filtroSelecionado) {
                case "confirmado":
                    filtrados = agendamentosPorData.filter((item) => item.status === "Confirmado");
                    break;
                case "feito":
                    filtrados = agendamentosPorData.filter((item) => item.status === "Feito");
                    break;
                case "cancelado":
                    filtrados = agendamentosPorData.filter((item) => item.status === "Cancelado");
                    break;
                case "todos":
                default:
                    filtrados = agendamentosPorData;
                    break;
            }

            setAgendamentosFiltrados(filtrados);
        };

        filtrarAgendamentos();
    }, [filtroSelecionado, agendamentos, date]);

    return (
        <main>
            <div className="pb-10 pt-5">
                <h1 className="text-xl md:text-2xl">Bem-vindo(a) ao <span className="font-bold">BarberPro</span>, <span className="font-bold text-blue-500 text-nowrap">{barbearia?.nome}</span>!</h1>
                <p className="text-muted-foreground">Seu resumo mensal está pronto abaixo.</p>
            </div>
            <div>
                <div className="flex justify-end gap-3 my-5">
                    <CalendarioFilter date={date} setDate={setDate}/>
                    <SelectFilterStatus handleSelect={handleSelect} />
                </div>
                <TableAgendamentos agendamentosFiltrados={agendamentosFiltrados} />
            </div>
        </main>
    );
}