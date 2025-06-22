"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { DollarSign, ArrowUpRight, ArrowDownRight, CalendarCheck, Users, Percent } from "lucide-react"
import { AnimatedNumber } from "./AnimatedNumber"
import { VisaoGeralCardsSkeleton } from "./skeletons/visaoGeralCardsSkeleton"
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card" // ✨ 1. IMPORTE O HOVERCARD
import { formatarPreco } from "@/utils/formatarValores" // Supondo que você tenha essa função

// 2. ATUALIZE O TIPO PARA RECEBER 'valorAnterior'
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
}

type Props = {
  metricas: Metricas | null;
}

export const VisaoGeralCards = ({ metricas }: Props) => {
  if (!metricas) {
    return <VisaoGeralCardsSkeleton />
  }

  const nomesDosMeses = ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"];
  const mesAnterior = nomesDosMeses[new Date().getMonth() - 1] || "Dezembro";


  return (
    <section className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {/* Card: Faturamento Mensal */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Faturamento do Mês</CardTitle>
          <DollarSign className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <AnimatedNumber
            value={metricas.faturamento.valor}
            format="currency"
            prefix="R$ "
            className="text-2xl font-bold"
          />
          {/* ✨ 3. IMPLEMENTE O HOVERCARD AQUI ✨ */}
          <HoverCard>
            <HoverCardTrigger asChild>
                <p className="text-xs text-muted-foreground flex items-center cursor-pointer underline">
                    {metricas.faturamento.variacao >= 0 ? 
                    <ArrowUpRight className="h-4 w-4 text-emerald-500" /> : 
                    <ArrowDownRight className="h-4 w-4 text-rose-500" />
                    }
                    <span className={metricas.faturamento.variacao >= 0 ? "text-emerald-500" : "text-rose-500"}>
                    {metricas.faturamento.variacao}%
                    </span>
                    {' '}vs. mês passado
                </p>
            </HoverCardTrigger>
            <HoverCardContent className="w-auto text-sm">
                <p><strong>{mesAnterior}:</strong> {formatarPreco(metricas.faturamento.valorAnterior.toString())}</p>
            </HoverCardContent>
          </HoverCard>
        </CardContent>
      </Card>

      {/* Card: Agendamentos Concluídos */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Agendamentos (Mês)</CardTitle>
          <CalendarCheck className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
            <AnimatedNumber
                value={metricas.agendamentos.valor}
                prefix="+"
                className="text-2xl font-bold"
            />
            <HoverCard>
                <HoverCardTrigger asChild>
                    <p className="text-xs text-muted-foreground flex items-center cursor-pointer underline">
                        {metricas.agendamentos.variacao >= 0 ? <ArrowUpRight className="h-4 w-4 text-emerald-500" /> : <ArrowDownRight className="h-4 w-4 text-rose-500" />}
                        <span className={metricas.agendamentos.variacao >= 0 ? "text-emerald-500" : "text-rose-500"}>{metricas.agendamentos.variacao}%</span>
                        {' '}vs. mês passado
                    </p>
                </HoverCardTrigger>
                <HoverCardContent className="w-auto text-sm">
                    <p><strong>{mesAnterior}:</strong> {metricas.agendamentos.valorAnterior} agendamentos</p>
                </HoverCardContent>
            </HoverCard>
        </CardContent>
      </Card>
      
      {/* ... Repita a mesma estrutura de HoverCard para os outros dois cards ... */}

      {/* Card: Ticket Médio */}
       <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Ticket Médio (Mês)</CardTitle>
          <Percent className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
            <AnimatedNumber
                value={metricas.ticketMedio.valor}
                format="currency"
                prefix="R$ "
                className="text-2xl font-bold"
            />
            <HoverCard>
                <HoverCardTrigger asChild>
                    <p className="text-xs text-muted-foreground flex items-center cursor-pointer underline">
                        {metricas.ticketMedio.variacao >= 0 ? <ArrowUpRight className="h-4 w-4 text-emerald-500" /> : <ArrowDownRight className="h-4 w-4 text-rose-500" />}
                        <span className={metricas.ticketMedio.variacao >= 0 ? "text-emerald-500" : "text-rose-500"}>{metricas.ticketMedio.variacao}%</span>
                        {' '}vs. mês passado
                    </p>
                </HoverCardTrigger>
                <HoverCardContent className="w-auto text-sm">
                    <p><strong>{mesAnterior}:</strong> {formatarPreco(metricas.ticketMedio.valorAnterior.toString())}</p>
                </HoverCardContent>
            </HoverCard>
        </CardContent>
      </Card>

      {/* Card: Novos Clientes */}
       <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Novos Clientes (Mês)</CardTitle>
          <Users className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
            <AnimatedNumber
                value={metricas.novosClientes.valor}
                prefix="+"
                className="text-2xl font-bold"
            />
            <HoverCard>
                <HoverCardTrigger asChild>
                    <p className="text-xs text-muted-foreground flex items-center cursor-pointer  underline">
                        {metricas.novosClientes.variacao >= 0 ? <ArrowUpRight className="h-4 w-4 text-emerald-500" /> : <ArrowDownRight className="h-4 w-4 text-rose-500" />}
                        <span className={metricas.novosClientes.variacao >= 0 ? "text-emerald-500" : "text-rose-500"}>{metricas.novosClientes.variacao}%</span>
                        {' '}vs. mês passado
                    </p>
                </HoverCardTrigger>
                <HoverCardContent className="w-auto text-sm">
                    <p><strong>{mesAnterior}:</strong> +{metricas.novosClientes.valorAnterior} clientes</p>
                </HoverCardContent>
            </HoverCard>
        </CardContent>
      </Card>
      
    </section>
  )
}