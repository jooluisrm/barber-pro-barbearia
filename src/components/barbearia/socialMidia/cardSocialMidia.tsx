import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { TableSocialMidia } from "./tableSocialMidia"
import { DialogNewSocialMidia } from "./dialogNewSocialMidia";

export const CardSocialMidia = () => {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Redes Sociais</CardTitle>
                <CardDescription>Adicione as Redes Sociais da barbearia.</CardDescription>
            </CardHeader>
            <CardContent>
                <TableSocialMidia /> {/*Tabela para carregar Redes Sociais*/}
            </CardContent>
            <CardFooter className="flex justify-between">
                <DialogNewSocialMidia />
            </CardFooter>
        </Card>
    );
}
