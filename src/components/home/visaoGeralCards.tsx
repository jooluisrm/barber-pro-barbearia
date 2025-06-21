"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { DollarSign, ArrowUpRight, ArrowDownRight, CalendarCheck, Users, Percent } from "lucide-react"
import { AnimatedNumber } from "./AnimatedNumber" // 👈 Importe o novo componente

// Definindo os tipos para as props que o componente vai receber
type Metricas = {
  faturamento: { valor: number; variacao: number };
  agendamentos: { valor: number; variacao: number };
  ticketMedio: { valor: number; variacao: number };
  novosClientes: { valor: number; variacao: number };
}

type Props = {
  metricas: Metricas | null; // Pode ser nulo enquanto os dados carregam
}

export const VisaoGeralCards = ({ metricas }: Props) => {

  // Mostra um estado de carregamento ou retorna nulo se não houver dados
  if (!metricas) {
    return (
        <section className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {/* Você pode colocar "skeletons" de carregamento aqui */}
            <Card><CardHeader><CardTitle>Carregando...</CardTitle></CardHeader></Card>
            <Card><CardHeader><CardTitle>Carregando...</CardTitle></CardHeader></Card>
            <Card><CardHeader><CardTitle>Carregando...</CardTitle></CardHeader></Card>
            <Card><CardHeader><CardTitle>Carregando...</CardTitle></CardHeader></Card>
        </section>
    )
  }

  return (
    <section className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {/* Card: Faturamento Mensal */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Faturamento Total</CardTitle>
          <DollarSign className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          {/* 👇 SUBSTITUÍDO PELO COMPONENTE ANIMADO */}
          <AnimatedNumber 
            value={metricas.faturamento.valor} 
            format="currency"
            prefix="R$ "
            className="text-2xl font-bold"
          />
          <p className="text-xs text-muted-foreground flex items-center">
            {metricas.faturamento.variacao >= 0 ? 
              <ArrowUpRight className="h-4 w-4 text-emerald-500" /> : 
              <ArrowDownRight className="h-4 w-4 text-rose-500" />
            }
            <span className={metricas.faturamento.variacao >= 0 ? "text-emerald-500" : "text-rose-500"}>
              {metricas.faturamento.variacao}%
            </span>
            {' '}vs. mês passado
          </p>
        </CardContent>
      </Card>

      {/* Card: Agendamentos Concluídos */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Agendamentos Concluídos</CardTitle>
          <CalendarCheck className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          {/* 👇 SUBSTITUÍDO PELO COMPONENTE ANIMADO */}
          <AnimatedNumber 
            value={metricas.agendamentos.valor}
            prefix="+"
            className="text-2xl font-bold"
          />
           <p className="text-xs text-muted-foreground flex items-center">
            {metricas.agendamentos.variacao >= 0 ? 
              <ArrowUpRight className="h-4 w-4 text-emerald-500" /> : 
              <ArrowDownRight className="h-4 w-4 text-rose-500" />
            }
            <span className={metricas.agendamentos.variacao >= 0 ? "text-emerald-500" : "text-rose-500"}>
              {metricas.agendamentos.variacao}%
            </span>
            {' '}vs. mês passado
          </p>
        </CardContent>
      </Card>

      {/* Card: Ticket Médio */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Ticket Médio</CardTitle>
          <Percent className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          {/* 👇 SUBSTITUÍDO PELO COMPONENTE ANIMADO */}
          <AnimatedNumber 
            value={metricas.ticketMedio.valor}
            format="currency"
            prefix="R$ "
            className="text-2xl font-bold"
          />
           <p className="text-xs text-muted-foreground flex items-center">
            {metricas.ticketMedio.variacao >= 0 ? 
              <ArrowUpRight className="h-4 w-4 text-emerald-500" /> : 
              <ArrowDownRight className="h-4 w-4 text-rose-500" />
            }
            <span className={metricas.ticketMedio.variacao >= 0 ? "text-emerald-500" : "text-rose-500"}>
              {metricas.ticketMedio.variacao}%
            </span>
            {' '}vs. mês passado
          </p>
        </CardContent>
      </Card>

      {/* Card: Novos Clientes */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Novos Clientes</CardTitle>
          <Users className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          {/* 👇 SUBSTITUÍDO PELO COMPONENTE ANIMADO */}
          <AnimatedNumber 
            value={metricas.novosClientes.valor}
            prefix="+"
            className="text-2xl font-bold"
          />
           <p className="text-xs text-muted-foreground flex items-center">
            {metricas.novosClientes.variacao >= 0 ? 
              <ArrowUpRight className="h-4 w-4 text-emerald-500" /> : 
              <ArrowDownRight className="h-4 w-4 text-rose-500" />
            }
            <span className={metricas.novosClientes.variacao >= 0 ? "text-emerald-500" : "text-rose-500"}>
              {metricas.novosClientes.variacao}%
            </span>
            {' '}vs. mês passado
          </p>
        </CardContent>
      </Card>
    </section>
  )
}