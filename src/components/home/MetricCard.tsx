// src/components/dashboard/MetricCard.tsx

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card"
import { ArrowDownRight, ArrowUpRight } from "lucide-react"
import { AnimatedNumber } from "./AnimatedNumber"
import { ReactNode } from "react"
import { formatarPreco } from "@/utils/formatarValores"

// Definindo as props que nosso card genérico vai receber
type MetricCardProps = {
  title: string
  icon: ReactNode
  valor: number
  variacao: number
  valorAnterior: number
  format?: 'currency' | 'integer'
  prefix?: string
  hoverText: string
}

export const MetricCard = ({ 
    title, 
    icon, 
    valor, 
    variacao, 
    valorAnterior,
    format,
    prefix,
    hoverText
}: MetricCardProps) => {

  const nomesDosMeses = ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"];
  const mesAnterior = nomesDosMeses[new Date().getMonth() - 1] || "Dezembro";

  const valorAnteriorFormatado = format === 'currency' 
    ? formatarPreco(valorAnterior.toString()) 
    : `${prefix || ''}${valorAnterior}`;

  return (
    <HoverCard>
      <HoverCardTrigger asChild>
        <Card className="cursor-pointer">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{title}</CardTitle>
            {icon}
          </CardHeader>
          <CardContent>
            <AnimatedNumber
              value={valor}
              format={format}
              prefix={prefix}
              className="text-2xl font-bold"
            />
            <p className="text-xs text-muted-foreground flex items-center">
              {variacao >= 0 ? 
                <ArrowUpRight className="h-4 w-4 text-emerald-500" /> : 
                <ArrowDownRight className="h-4 w-4 text-rose-500" />
              }
              <span className={variacao >= 0 ? "text-emerald-500" : "text-rose-500"}>
                {variacao}%
              </span>
              {' '}vs. mês passado
            </p>
          </CardContent>
        </Card>
      </HoverCardTrigger>
      <HoverCardContent className="w-auto text-sm">
        <p><strong>{mesAnterior}:</strong> {valorAnteriorFormatado} {hoverText}</p>
      </HoverCardContent>
    </HoverCard>
  )
}