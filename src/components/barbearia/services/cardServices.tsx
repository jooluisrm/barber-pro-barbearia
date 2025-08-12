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
    const { barbearia, token } = useAuth();
    const { setServices } = useServiceContext();

    useEffect(() => {
        loadItems(barbearia, getServices, setServices);
    }, [token]);

    return (
        <Card className="flex flex-col justify-between">
            <div>
                <CardHeader>
                <CardTitle>Serviços</CardTitle>
                <CardDescription>Adicione os Serviços prestados em sua barbearia.</CardDescription>
            </CardHeader>
            <CardContent>
                <TableServices /> {/*Tabela para carregar serviços*/}
            </CardContent>
            </div>
            <CardFooter>
                <DialogNewService />
            </CardFooter>
        </Card>
    );
}
