// src/hooks/useDashboardMetrics.ts

import { useMemo } from "react";
import { Agendamentos } from "@/types/agendamentos";

// O tipo Metricas que já definimos antes
type MetricaItem = { 
    valor: number; 
    variacao: number; 
    valorAnterior: number;
};
type Metricas = {
    faturamento: MetricaItem;
    agendamentos: MetricaItem;
    ticketMedio: MetricaItem;
    novosClientes: MetricaItem;
};

// Nosso hook customizado
export const useDashboardMetrics = (agendamentos: Agendamentos[] | null): Metricas | null => {
    // Usamos 'useMemo' para que estes cálculos pesados só sejam refeitos
    // quando a lista de 'agendamentos' realmente mudar.
    const metricas = useMemo(() => {
        if (!agendamentos) {
            return null;
        }

        const hoje = new Date();
        const anoAtual = hoje.getFullYear();
        const mesAtual = hoje.getMonth();

        // ... toda a sua lógica de cálculo que estava no useEffect ...
        let faturamentoMesAtual = 0;
        let agendamentosMesAtual = 0;
        let faturamentoMesAnterior = 0;
        let agendamentosMesAnterior = 0;
        let novosClientesVisitantesMesAtual = 0;
        let novosClientesVisitantesMesAnterior = 0;
        const primeiroAgendamentoRegistrado = new Map<string, Date>();

        agendamentos.forEach((ag: any) => {
            if (ag.status === 'Feito') {
                const dataAg = new Date(ag.data + "T00:00:00-03:00");
                const anoAg = dataAg.getFullYear();
                const mesAg = dataAg.getMonth();
                const preco = Number(ag.servico.preco);

                if (anoAg === anoAtual && mesAg === mesAtual) {
                    faturamentoMesAtual += preco;
                    agendamentosMesAtual++;
                } else if ((mesAtual === 0 && mesAg === 11 && anoAg === anoAtual - 1) || (mesAtual > 0 && mesAg === mesAtual - 1 && anoAg === anoAtual)) {
                    faturamentoMesAnterior += preco;
                    agendamentosMesAnterior++;
                }

                if (ag.usuarioId === 'visitante') {
                    if (anoAg === anoAtual && mesAg === mesAtual) {
                        novosClientesVisitantesMesAtual++;
                    } else if ((mesAtual === 0 && mesAg === 11 && anoAg === anoAtual - 1) || (mesAtual > 0 && mesAg === mesAtual - 1 && anoAg === anoAtual)) {
                        novosClientesVisitantesMesAnterior++;
                    }
                } else {
                    const dataExistente = primeiroAgendamentoRegistrado.get(ag.usuarioId);
                    if (!dataExistente || dataAg < dataExistente) {
                        primeiroAgendamentoRegistrado.set(ag.usuarioId, dataAg);
                    }
                }
            }
        });

        let novosClientesRegistradosMesAtual = 0;
        let novosClientesRegistradosMesAnterior = 0;

        primeiroAgendamentoRegistrado.forEach((dataPrimeiroAg) => {
            const anoPrimeiroAg = dataPrimeiroAg.getFullYear();
            const mesPrimeiroAg = dataPrimeiroAg.getMonth();
            if (anoPrimeiroAg === anoAtual && mesPrimeiroAg === mesAtual) {
                novosClientesRegistradosMesAtual++;
            } else if ((mesAtual === 0 && mesPrimeiroAg === 11 && anoPrimeiroAg === anoAtual - 1) || (mesAtual > 0 && mesPrimeiroAg === mesAtual - 1 && anoPrimeiroAg === anoAtual)) {
                novosClientesRegistradosMesAnterior++;
            }
        });
        
        const totalNovosClientesMesAtual = novosClientesVisitantesMesAtual + novosClientesRegistradosMesAtual;
        const totalNovosClientesMesAnterior = novosClientesVisitantesMesAnterior + novosClientesRegistradosMesAnterior;
        const ticketMedioAtual = agendamentosMesAtual > 0 ? faturamentoMesAtual / agendamentosMesAtual : 0;
        const ticketMedioAnterior = agendamentosMesAnterior > 0 ? faturamentoMesAnterior / agendamentosMesAnterior : 0;
        
        const calcularVariacao = (atual: number, anterior: number) => {
            if (anterior === 0) return atual > 0 ? 100 : 0;
            return Number((((atual - anterior) / anterior) * 100).toFixed(1));
        };

        return {
            faturamento: { valor: faturamentoMesAtual, variacao: calcularVariacao(faturamentoMesAtual, faturamentoMesAnterior), valorAnterior: faturamentoMesAnterior },
            agendamentos: { valor: agendamentosMesAtual, variacao: calcularVariacao(agendamentosMesAtual, agendamentosMesAnterior), valorAnterior: agendamentosMesAnterior },
            ticketMedio: { valor: ticketMedioAtual, variacao: calcularVariacao(ticketMedioAtual, ticketMedioAnterior), valorAnterior: ticketMedioAnterior },
            novosClientes: { valor: totalNovosClientesMesAtual, variacao: calcularVariacao(totalNovosClientesMesAtual, totalNovosClientesMesAnterior), valorAnterior: totalNovosClientesMesAnterior },
        };

    }, [agendamentos]);

    return metricas;
};