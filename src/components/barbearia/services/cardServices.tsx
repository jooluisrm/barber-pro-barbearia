"use client"

import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { TableServices } from "./tableServices"
import { DialogNewService } from "./dialogNewService";
import { useEffect, useState } from "react";
import { getServices } from "@/api/barbearia/barbeariaServices";
import { useAuth } from "@/contexts/AuthContext";
import { loadItems } from "@/utils/loadItems";
import { useServiceContext } from "@/contexts/ServicesContext";

export const CardServices = () => {
    const { barbearia } = useAuth();
    const { setServices } = useServiceContext();

    useEffect(() => {
        loadItems(barbearia, getServices, setServices);
    }, [barbearia])

    return (
        <Card className="flex flex-col justify-between">
            <CardHeader>
                <CardTitle>Serviços</CardTitle>
                <CardDescription>Adicione os Serviços prestados em sua barbearia.</CardDescription>
            </CardHeader>
            <CardContent>
                <TableServices /> {/*Tabela para carregar serviços*/}
            </CardContent>
            <CardFooter>
                <DialogNewService />
            </CardFooter>
        </Card>
    );
}
