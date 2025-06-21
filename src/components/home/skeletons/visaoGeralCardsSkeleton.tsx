// src/components/dashboard/VisaoGeralCardsSkeleton.tsx

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

// Este é o esqueleto para UM único card.
const CardSkeleton = () => {
    return (
        <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                {/* Simula o título do card */}
                <Skeleton className="h-4 w-[150px]" />
                {/* Simula o ícone */}
                <Skeleton className="h-4 w-4 rounded-full" />
            </CardHeader>
            <CardContent>
                {/* Simula o número grande */}
                <Skeleton className="h-8 w-[100px]" />
                {/* Simula o texto pequeno de variação */}
                <Skeleton className="h-3 w-full mt-2" />
            </CardContent>
        </Card>
    )
}

// Este componente renderiza os 4 esqueletos de card.
export const VisaoGeralCardsSkeleton = () => {
  return (
    <section className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <CardSkeleton />
      <CardSkeleton />
      <CardSkeleton />
      <CardSkeleton />
    </section>
  )
}