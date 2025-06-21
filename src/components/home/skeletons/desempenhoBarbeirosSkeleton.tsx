// src/components/dashboard/DesempenhoBarbeirosSkeleton.tsx

import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

// Simula uma única linha da lista de barbeiros
const BarbeiroItemSkeleton = () => {
    return (
        <div className="flex items-center space-x-4">
            {/* Espaço da medalha */}
            <Skeleton className="h-6 w-6" />
            {/* Avatar */}
            <Skeleton className="h-10 w-10 rounded-full" />
            <div className="flex-1 space-y-1">
                {/* Nome */}
                <Skeleton className="h-4 w-3/4" />
                {/* Contagem de agendamentos (texto) */}
                <Skeleton className="h-3 w-1/2" />
            </div>
            {/* Contagem de agendamentos (número) */}
            <Skeleton className="h-5 w-8" />
        </div>
    )
}


export const DesempenhoBarbeirosSkeleton = () => {
    return (
        <Card className="min-h-full">
            <CardHeader>
                <Skeleton className="h-6 w-3/4 mb-2" />
                <Skeleton className="h-4 w-1/2" />
            </CardHeader>
            <CardContent className="space-y-4">
                {/* Repete o esqueleto da linha 3 vezes */}
                <BarbeiroItemSkeleton />
                <BarbeiroItemSkeleton />
                <BarbeiroItemSkeleton />
                <BarbeiroItemSkeleton />
            </CardContent>
        </Card>
    )
}