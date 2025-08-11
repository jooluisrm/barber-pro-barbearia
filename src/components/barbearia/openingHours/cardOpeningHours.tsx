import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { ItemOpeningHours } from "./itemOpeningHours";
import { DialogNewOpeningHours } from "./dialogNewOpeningHours";
import { useAuth } from "@/contexts/AuthContext";
import { useOpeningHoursContext } from "@/contexts/OpeningHoursContext";
import { useEffect } from "react";
import { loadItems } from "@/utils/loadItems";
import { getOpeningHours } from "@/api/barbearia/barbeariaServices";



export const CardOpeningHours = () => {
    const { barbearia } = useAuth();
    const { setOpeningHours } = useOpeningHoursContext();

    useEffect(() => {
        loadItems(barbearia, getOpeningHours, setOpeningHours);
    }, [barbearia]);

    return (
        <Card className="flex flex-col justify-between">
            <div>
                <CardHeader>
                    <CardTitle>Horário de Atendimento</CardTitle>
                    <CardDescription>Adicione os horários de funcionamento da sua barbearia durante a semana.</CardDescription>
                </CardHeader>
                <CardContent className="">
                    <ItemOpeningHours />
                </CardContent>
            </div>
            <CardFooter>
                <DialogNewOpeningHours />
            </CardFooter>
        </Card>
    );
}
