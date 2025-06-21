"use client"

import { Barbearia, useAuth } from "@/contexts/AuthContext";
import { useEffect, useState } from "react";
import { Agendamentos } from "@/types/agendamentos";
import { getAgendamentos, getAgendamentosPendentes } from "@/api/agendamentos/agendamentoServices";
import { getBarbeiros } from "@/api/barbeiros/barbeirosServices";
import { Barbeiro } from "@/types/barbeiros";

// Importações dos componentes
import { VisaoGeralCards } from "./visaoGeralCards";
import { GraficoStatusAgendamentos } from "./graficoStatusAgendamentos";
import { GraficoFaturamentoComparativo } from "./graficoFaturamentoComparativo";
import { GraficoServicosPopulares } from "./graficoServicosPopulares";
import { DesempenhoBarbeiros } from "./desempenhoBarbeiros";
import { TabelaProximosAgendamentos } from "./TabelaProximosAgendamentos";
import { LiveClock } from "./liveClock";
import { loadItems } from "@/utils/loadItems";
import { usePendingScheduleContext } from "@/contexts/PendingScheduleContext";
import { HeaderPage } from "../reultilizar/headerPage";

// Definindo o tipo para as métricas
type Metricas = {
    faturamento: { valor: number; variacao: number };
    agendamentos: { valor: number; variacao: number };
    ticketMedio: { valor: number; variacao: number };
    novosClientes: { valor: number; variacao: number };
};

export const MainHome = () => {
    const { barbearia } = useAuth();
    const { setAgendamentosPendentes } = usePendingScheduleContext();

    const [agendamentos, setAgendamentos] = useState<Agendamentos[] | null>(null);
    const [barbeiros, setBarbeiros] = useState<Barbeiro[] | null>(null);
    const [metricas, setMetricas] = useState<Metricas | null>(null);

    useEffect(() => {
        const carregarDados = async () => {
            if (barbearia) {
                const dadosAgendamentos = await getAgendamentos(barbearia.id);
                setAgendamentos(dadosAgendamentos);

                const dadosBarbeiros = await getBarbeiros(barbearia.id);
                await loadItems(barbearia, getAgendamentosPendentes, setAgendamentosPendentes);
                setBarbeiros(dadosBarbeiros);

                if (dadosAgendamentos) {
                    const hoje = new Date();
                    const anoAtual = hoje.getFullYear();
                    const mesAtual = hoje.getMonth();

                    let faturamentoMesAtual = 0;
                    let agendamentosMesAtual = 0;
                    let faturamentoMesAnterior = 0;
                    let agendamentosMesAnterior = 0;

                    // Contadores para os dois tipos de novos clientes
                    let novosClientesVisitantesMesAtual = 0;
                    let novosClientesVisitantesMesAnterior = 0;

                    // Mapa para rastrear o primeiro agendamento de usuários REGISTRADOS
                    const primeiroAgendamentoRegistrado = new Map<string, Date>();

                    dadosAgendamentos.forEach((ag: any) => {
                        if (ag.status === 'Feito') {
                            const dataAg = new Date(ag.data + "T00:00:00-03:00");
                            const anoAg = dataAg.getFullYear();
                            const mesAg = dataAg.getMonth();
                            const preco = Number(ag.servico.preco);

                            // Lógica de faturamento (inalterada)
                            if (anoAg === anoAtual && mesAg === mesAtual) {
                                faturamentoMesAtual += preco;
                                agendamentosMesAtual++;
                            } else if (
                                (mesAtual === 0 && mesAg === 11 && anoAg === anoAtual - 1) ||
                                (mesAtual > 0 && mesAg === mesAtual - 1 && anoAg === anoAtual)
                            ) {
                                faturamentoMesAnterior += preco;
                                agendamentosMesAnterior++;
                            }

                            // ✨ LÓGICA HÍBRIDA PARA NOVOS CLIENTES ✨
                            if (ag.usuarioId === 'visitante') {
                                // Se for visitante, incrementa o contador de visitantes
                                if (anoAg === anoAtual && mesAg === mesAtual) {
                                    novosClientesVisitantesMesAtual++;
                                } else if (
                                    (mesAtual === 0 && mesAg === 11 && anoAg === anoAtual - 1) ||
                                    (mesAtual > 0 && mesAg === mesAtual - 1 && anoAg === anoAtual)
                                ) {
                                    novosClientesVisitantesMesAnterior++;
                                }
                            } else {
                                // Se for um usuário registrado, preenche o mapa
                                const dataExistente = primeiroAgendamentoRegistrado.get(ag.usuarioId);
                                if (!dataExistente || dataAg < dataExistente) {
                                    primeiroAgendamentoRegistrado.set(ag.usuarioId, dataAg);
                                }
                            }
                        }
                    });

                    // Agora, processa o mapa para contar os novos clientes REGISTRADOS
                    let novosClientesRegistradosMesAtual = 0;
                    let novosClientesRegistradosMesAnterior = 0;

                    primeiroAgendamentoRegistrado.forEach((dataPrimeiroAg) => {
                        const anoPrimeiroAg = dataPrimeiroAg.getFullYear();
                        const mesPrimeiroAg = dataPrimeiroAg.getMonth();
                        if (anoPrimeiroAg === anoAtual && mesPrimeiroAg === mesAtual) {
                            novosClientesRegistradosMesAtual++;
                        } else if (
                            (mesAtual === 0 && mesPrimeiroAg === 11 && anoPrimeiroAg === anoAtual - 1) ||
                            (mesAtual > 0 && mesPrimeiroAg === mesAtual - 1 && anoPrimeiroAg === anoAtual)
                        ) {
                            novosClientesRegistradosMesAnterior++;
                        }
                    });

                    // Soma as duas contagens para o total final
                    const totalNovosClientesMesAtual = novosClientesVisitantesMesAtual + novosClientesRegistradosMesAtual;
                    const totalNovosClientesMesAnterior = novosClientesVisitantesMesAnterior + novosClientesRegistradosMesAnterior;

                    const calcularVariacao = (atual: number, anterior: number) => {
                        if (anterior === 0) return atual > 0 ? 100 : 0;
                        return Number((((atual - anterior) / anterior) * 100).toFixed(1));
                    };

                    const ticketMedioAtual = agendamentosMesAtual > 0 ? faturamentoMesAtual / agendamentosMesAtual : 0;
                    const ticketMedioAnterior = agendamentosMesAnterior > 0 ? faturamentoMesAnterior / agendamentosMesAnterior : 0;

                    setMetricas({
                        faturamento: { valor: faturamentoMesAtual, variacao: calcularVariacao(faturamentoMesAtual, faturamentoMesAnterior) },
                        agendamentos: { valor: agendamentosMesAtual, variacao: calcularVariacao(agendamentosMesAtual, agendamentosMesAnterior) },
                        ticketMedio: { valor: ticketMedioAtual, variacao: calcularVariacao(ticketMedioAtual, ticketMedioAnterior) },
                        novosClientes: { valor: totalNovosClientesMesAtual, variacao: calcularVariacao(totalNovosClientesMesAtual, totalNovosClientesMesAnterior) },
                    });
                }
            }
        };
        carregarDados();
    }, [barbearia]);

    return (
        <main className="flex-1 space-y-4">
           
            <HeaderPage
                subTitle="Seu resumo mensal está pronto abaixo."
                barberName={barbearia?.nome}
            />

            {/* A ÚNICA ALTERAÇÃO NO JSX É ESSA LINHA */}
            <VisaoGeralCards metricas={metricas} />

            {/* O RESTANTE DO CÓDIGO PERMANECE IGUAL, USANDO OS DADOS INTERNOS DE CADA COMPONENTE */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
                <div className="lg:col-span-4">
                    <GraficoFaturamentoComparativo agendamentos={agendamentos} />
                </div>
                <div className="lg:col-span-3">
                    <GraficoStatusAgendamentos agendamentos={agendamentos} />
                </div>
            </div>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
                <div className="lg:col-span-4">
                    <GraficoServicosPopulares agendamentos={agendamentos} />
                </div>
                <div className="lg:col-span-3">
                    <DesempenhoBarbeiros barbeiros={barbeiros} agendamentos={agendamentos} />
                </div>
            </div>
            <TabelaProximosAgendamentos agendamentos={agendamentos} />
        </main>
    );
}