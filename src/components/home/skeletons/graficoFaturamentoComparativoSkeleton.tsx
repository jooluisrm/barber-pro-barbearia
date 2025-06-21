"use client"

import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

export const GraficoFaturamentoComparativoSkeleton = () => {
    return (
        <Card>
            <CardHeader>
                {/* Título e Descrição */}
                <Skeleton className="h-6 w-3/4 mb-2" />
                <Skeleton className="h-4 w-1/2" />
            </CardHeader>
            <CardContent className="pl-2">
                <div className="h-[250px] w-full flex gap-4">

                    {/* Eixo Y (Rótulos Verticais) */}
                    <div className="h-full flex flex-col justify-between">
                        <Skeleton className="h-4 w-10" />
                        <Skeleton className="h-4 w-10" />
                        <Skeleton className="h-4 w-10" />
                        <Skeleton className="h-4 w-10" />
                    </div>

                    {/* Área Principal do Gráfico (Grid + Eixo X) */}
                    <div className="flex-1 flex flex-col justify-between">
                        
                        {/* Simulação das linhas de grade (horizontais) */}
                        <div className="h-full flex flex-col justify-between border-b border-dashed">
                           <Skeleton className="h-px w-full" />
                           <Skeleton className="h-px w-full" />
                           <Skeleton className="h-px w-full" />
                           {/* A última linha é a própria borda do container */}
                        </div>

                        {/* Simulação do Eixo X (Rótulos dos Meses) */}
                        <div className="flex justify-between mt-2">
                            <Skeleton className="h-4 w-8" />
                            <Skeleton className="h-4 w-8" />
                            <Skeleton className="h-4 w-8" />
                            <Skeleton className="h-4 w-8" />
                            <Skeleton className="h-4 w-8" />
                            <Skeleton className="h-4 w-8" />
                        </div>
                    </div>
                </div>

                {/* Simulação da Legenda do Gráfico */}
                <div className="flex justify-center items-center gap-6 mt-4">
                    <div className="flex items-center gap-2">
                        <Skeleton className="h-3 w-3" />
                        <Skeleton className="h-4 w-20" />
                    </div>
                    <div className="flex items-center gap-2">
                        <Skeleton className="h-3 w-3" />
                        <Skeleton className="h-4 w-20" />
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}