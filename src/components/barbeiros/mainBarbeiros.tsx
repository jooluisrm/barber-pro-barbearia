"use client"

import { UserPlus } from "lucide-react";
import { Button } from "../ui/button";
import { TableBarbeiros } from "./tableBarbeiros";
import { useEffect, useState } from "react";
import { Barbeiro } from "@/types/barbeiros";
import { getBarbeiros } from "@/api/barbeiros/barbeirosServices";
import { useAuth } from "@/contexts/AuthContext";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "../ui/tooltip";
import { DialogAddBarbeiro } from "./dialogAddBarbeiro";
import { useBarberContext } from "@/contexts/BarberContext";
import { loadItems } from "@/utils/loadItems";

export const MainBarbeiros = () => {
    const { barbearia } = useAuth();
    const { setBarbeiros } = useBarberContext();

    useEffect(() => {
        if (barbearia) {
            loadItems(barbearia, getBarbeiros, setBarbeiros);
        }
    }, [barbearia]);

    return (
        <main>
            <div className="pb-6 pt-5 text-center sm:text-left">
                <h1 className="text-2xl sm:text-3xl font-semibold">
                    Painel de <span className="text-blue-500">Barbeiros</span>
                </h1>
                <p className="text-muted-foreground text-sm sm:text-base">
                    Visualize, crie e gerencie todos os barbeiros da sua barbearia.
                </p>
            </div>

            <div className="space-y-4">

                <div className="flex justify-start gap-4">
                    <TooltipProvider>
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <DialogAddBarbeiro />
                            </TooltipTrigger>
                            <TooltipContent>
                                Criar Barbeiro
                            </TooltipContent>
                        </Tooltip>
                    </TooltipProvider>
                </div>

                <div>
                    <TableBarbeiros />
                </div>
            </div>
        </main>
    );
}