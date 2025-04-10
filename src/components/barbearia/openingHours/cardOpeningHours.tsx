

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



export const CardOpeningHours = () => {

    return (
        <Card>
            <CardHeader>
                <CardTitle>Horario de Atendimento</CardTitle>
                <CardDescription>Adicione os horarios de funcionamento da sua barbearia durante a semana.</CardDescription>
            </CardHeader>
            <CardContent className="">
                <ItemOpeningHours />
            </CardContent>
            <CardFooter className="flex justify-between">
                <DialogNewOpeningHours />
            </CardFooter>
        </Card>
    );
}
