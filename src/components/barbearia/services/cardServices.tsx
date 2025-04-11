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
import { Services } from "@/types/services";
import { getServices } from "@/api/barbearia/barbeariaServices";
import { useAuth } from "@/contexts/AuthContext";

export const CardServices = () => {
    const { barbearia } = useAuth();

    const [services, setServices] = useState<Services[] | null>(null);

    const loadServices = async () => {
        if(!barbearia) return;
        const dados = await getServices(barbearia.id);
        setServices(dados);
    }

    useEffect(() => {
        loadServices();
    }, [])

    return (
        <Card>
            <CardHeader>
                <CardTitle>Serviços</CardTitle>
                <CardDescription>Adicione os Serviços prestados em sua barbearia.</CardDescription>
            </CardHeader>
            <CardContent>
                <TableServices /> {/*Tabela para carregar serviços*/}
            </CardContent>
            <CardFooter className="flex justify-between">
                <DialogNewService />
            </CardFooter>
        </Card>
    );
}
