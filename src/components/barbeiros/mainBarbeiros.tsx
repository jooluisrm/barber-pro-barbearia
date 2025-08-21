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
import { HeaderPage } from "../reultilizar/headerPage";

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
            <HeaderPage 
                subTitle="Visualize, crie e gerencie todos os barbeiros da sua barbearia."
                title="Barbeiros"
            />

            <div className="space-y-4">

                <div className="flex justify-start gap-4">
                    <TooltipProvider>
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <DialogAddBarbeiro />
                            </TooltipTrigger>
                            <TooltipContent>
                                <p>Criar Barbeiro</p>
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