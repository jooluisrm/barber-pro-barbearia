// src/components/dashboard/TabelaProximosAgendamentosSkeleton.tsx

import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

export const TabelaProximosAgendamentosSkeleton = () => {
    return (
        <Card className="col-span-full">
            <CardHeader>
                {/* Simula o título e a descrição */}
                <Skeleton className="h-7 w-1/2" />
                <Skeleton className="h-4 w-full" />
            </CardHeader>
            <CardContent>
                <Table>
                    <TableHeader>
                        <TableRow>
                            {/* Simula os cabeçalhos da tabela */}
                            <TableHead className="w-[80px]"><Skeleton className="h-5 w-full" /></TableHead>
                            <TableHead><Skeleton className="h-5 w-full" /></TableHead>
                            <TableHead className="hidden sm:table-cell"><Skeleton className="h-5 w-full" /></TableHead>
                            <TableHead className="hidden md:table-cell"><Skeleton className="h-5 w-full" /></TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {/* Cria 5 linhas de placeholder para simular dados carregando */}
                        {[...Array(3)].map((_, index) => (
                            <TableRow key={index}>
                                <TableCell><Skeleton className="h-5 w-full" /></TableCell>
                                <TableCell><Skeleton className="h-5 w-full" /></TableCell>
                                <TableCell className="hidden sm:table-cell"><Skeleton className="h-5 w-full" /></TableCell>
                                <TableCell className="hidden md:table-cell"><Skeleton className="h-5 w-full" /></TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </CardContent>
        </Card>
    )
}