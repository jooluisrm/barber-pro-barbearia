// src/components/dashboard/GraficoServicosPopularesSkeleton.tsx

import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

export const GraficoServicosPopularesSkeleton = () => {
    return (
        <Card>
            <CardHeader>
                {/* Simula o título e a descrição */}
                <Skeleton className="h-6 w-3/4 mb-2" />
                <Skeleton className="h-4 w-full" />
            </CardHeader>
            <CardContent className="space-y-4 pt-2">
                {/* Vamos criar várias "linhas" de skeleton.
                  Cada linha tem um texto (o nome do serviço) e uma barra.
                  Usamos larguras diferentes para simular um gráfico real.
                */}
                <div className="flex items-center gap-4">
                    <Skeleton className="h-4 w-24" />
                    <Skeleton className="h-8 flex-1" />
                </div>
                <div className="flex items-center gap-4">
                    <Skeleton className="h-4 w-24" />
                    <Skeleton className="h-8 w-[90%]" />
                </div>
                <div className="flex items-center gap-4">
                    <Skeleton className="h-4 w-24" />
                    <Skeleton className="h-8 w-[70%]" />
                </div>
                <div className="flex items-center gap-4">
                    <Skeleton className="h-4 w-24" />
                    <Skeleton className="h-8 w-[80%]" />
                </div>
                <div className="flex items-center gap-4">
                    <Skeleton className="h-4 w-24" />
                    <Skeleton className="h-8 w-[50%]" />
                </div>
            </CardContent>
        </Card>
    )
}