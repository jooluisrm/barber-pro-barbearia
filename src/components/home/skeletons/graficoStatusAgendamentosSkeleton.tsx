// src/components/dashboard/GraficoStatusAgendamentosSkeleton.tsx

import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

export const GraficoStatusAgendamentosSkeleton = () => {
    return (
        <Card className="min-h-full flex flex-col justify-between">
            <CardHeader>
                {/* Simula o título e a descrição */}
                <Skeleton className="h-6 w-3/4 mb-2" />
                <Skeleton className="h-4 w-full" />
            </CardHeader>
            <CardContent className="flex flex-col items-center justify-center min-h-full">
                {/* Simulação do Gráfico de Rosca (Donut) */}
                <div className="relative flex items-center justify-center">
                    {/* Círculo externo do skeleton */}
                    <Skeleton className="h-48 w-48 rounded-full" />
                    {/* Círculo interno com a cor do card para criar o "buraco" */}
                    <div className="absolute h-36 w-36 rounded-full bg-card" />
                </div>

                {/* Simulação da Legenda */}
                <div className="flex justify-center items-center gap-4 mt-6">
                    <div className="flex items-center gap-2">
                        <Skeleton className="h-3 w-3 rounded-full" />
                        <Skeleton className="h-4 w-20" />
                    </div>
                    <div className="flex items-center gap-2">
                        <Skeleton className="h-3 w-3 rounded-full" />
                        <Skeleton className="h-4 w-20" />
                    </div>
                    <div className="flex items-center gap-2">
                        <Skeleton className="h-3 w-3 rounded-full" />
                        <Skeleton className="h-4 w-20" />
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}