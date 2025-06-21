"use client"

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { DollarSign, ArrowUpRight, ArrowDownRight, CalendarCheck, Users, Percent } from "lucide-react"

// Dados Fake para as métricas
const metricas = {
  faturamento: {
    valor: 7850.50,
    variacao: 12.5, // Variação positiva em % em relação ao período anterior
  },
  agendamentos: {
    valor: 215,
    variacao: -3.2, // Variação negativa
  },
  ticketMedio: {
    valor: 36.51,
    variacao: 8.1,
  },
  novosClientes: {
    valor: 32,
    variacao: 20,
  }
}

export const VisaoGeralCards = () => {
  return (
    <section className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {/* Card: Faturamento Mensal */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Faturamento Total</CardTitle>
          <DollarSign className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            {metricas.faturamento.valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
          </div>
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
          <div className="text-2xl font-bold">+{metricas.agendamentos.valor}</div>
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
          <div className="text-2xl font-bold">
            {metricas.ticketMedio.valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
          </div>
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
          <div className="text-2xl font-bold">+{metricas.novosClientes.valor}</div>
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