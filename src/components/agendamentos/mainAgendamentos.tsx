"use client"

import { useEffect, useState } from "react";
import { TableAgendamentos } from "./tableAgendamentos";
import { AgendamentoPendente, Agendamentos } from "@/types/agendamentos";
import { useAuth } from "@/contexts/AuthContext";
import { getAgendamentos, getAgendamentosBarbeiro, getAgendamentosPendentesBarbeiro, getPendingAppointments } from "@/api/agendamentos/agendamentoServices";
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
import { DialogEditarHorarioBarbeiro } from "./dialogEditarHorarioBarbeiro";

export const MainAgendamentos = () => {
    const { barbearia, usuario } = useAuth();
    const { setAgendamentos, agendamentos } = useScheduleContext();
    const { agendamentosPendentes } = usePendingScheduleContext();

    // Estado para os barbeiros (para o filtro)
    const [barbeiros, setBarbeiros] = useState<Barbeiro[] | null>(null);
    const [loading, setLoading] = useState(true);

    // --- ESTADO CENTRALIZADO PARA OS FILTROS ---
    const [selectedDate, setSelectedDate] = useState<Date>(new Date());
    const [selectedStatus, setSelectedStatus] = useState("confirmado");
    const [selectedBarbeiro, setSelectedBarbeiro] = useState("todos");

    const [pendingCount, setPendingCount] = useState(0);

    // --- LÓGICA DE CARREGAMENTO UNIFICADA ---
    useEffect(() => {
        const fetchAgendamentos = async () => {
            if (!barbearia) return;

            setLoading(true);
            try {
                // Se o usuário logado for um barbeiro, ele se torna o filtro padrão
                const barbeiroFilter = usuario?.role === 'BARBEIRO'
                    ? usuario.perfilBarbeiro?.id
                    : selectedBarbeiro;

                const data = await getAgendamentos(barbearia.id, {
                    data: selectedDate,
                    status: selectedStatus,
                    barbeiroId: barbeiroFilter,
                });
                setAgendamentos(data);
            } catch (error) {
                console.error(error);
                setAgendamentos([]); // Retorna array vazio em caso de erro
            } finally {
                setLoading(false);
            }
        };

        fetchAgendamentos();

        // Este useEffect reage a qualquer mudança nos filtros
    }, [barbearia, selectedDate, selectedStatus, selectedBarbeiro, usuario]);

    // NOVO: useEffect para buscar a CONTAGEM de pendentes
    useEffect(() => {
        const fetchPendingCount = async () => {
            if (!barbearia || !usuario) return;
            try {
                const pendingData = await getPendingAppointments(barbearia.id, usuario);
                setPendingCount(pendingData.length || 0);
            } catch (error) {
                console.error(error);
            }
        };

        fetchPendingCount();
        // Recarrega a contagem a cada 1 minuto (60000 ms) para manter o badge atualizado
        const interval = setInterval(fetchPendingCount, 60000); 
        return () => clearInterval(interval); // Limpa o intervalo ao desmontar

    }, [barbearia, usuario, agendamentos]); // 'agendamentos' na dependência para forçar a recontagem após uma ação

    // Carrega a lista de barbeiros para o filtro (apenas para ADMINS)
    useEffect(() => {
        const carregarBarbeiros = async () => {
            if (barbearia && usuario?.role === "ADMIN") {
                const dados = await getBarbeiros(barbearia.id);
                setBarbeiros(dados);
            }
        }
        carregarBarbeiros();
    }, [barbearia, usuario]);

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
                    <div className="gap-4 grid lg:grid-cols-3">
                        <DialogNovoAgendamento />
                        <DialogConcluirAgendamento 
                            pendingCount={pendingCount}
                            onUpdate={() => {
                                // Força a re-busca da lista principal e da contagem
                                const fetchMainList = async () => {
                                    if(barbearia) {
                                        const data = await getAgendamentos(barbearia.id, { data: selectedDate, status: selectedStatus, barbeiroId: selectedBarbeiro });
                                        setAgendamentos(data);
                                    }
                                }
                                fetchMainList();
                            }}
                        />
                        {usuario && usuario.role === "BARBEIRO" && <DialogEditarHorarioBarbeiro barbeiro={usuario.perfilBarbeiro} />}
                    </div>

                    {/* Filtros */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:flex lg:items-center gap-4">
                        <CalendarioFilter date={selectedDate} setDate={setSelectedDate} />
                        {usuario?.role === "ADMIN" && (
                            <SelectFilterBarbeiro
                                handleSelect={setSelectedBarbeiro}
                                barbeiros={barbeiros}
                            />
                        )}
                        <SelectFilterStatus handleSelect={setSelectedStatus} />
                    </div>
                </div>

                {/* Tabela de Agendamentos */}
                <div className="overflow-x-auto">
                    <TableAgendamentos
                        agendamentos={agendamentos}
                        isLoading={loading}
                    />
                </div>
            </div>
        </main>

    );
}