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
import { useAuth } from "@/contexts/AuthContext";
import { useEffect } from "react";
import { loadItems } from "@/utils/loadItems";
import { useSocialContext } from "@/contexts/SocialContext";
import { getSocialMedia } from "@/api/barbearia/barbeariaServices";

export const CardSocialMidia = () => {
    const { barbearia } = useAuth();
    const { setSocialMedia } = useSocialContext();


    useEffect(() => {
        loadItems(barbearia, getSocialMedia, setSocialMedia);
    }, [barbearia]);

    return (
        <Card className="flex flex-col justify-between">
            <CardHeader>
                <CardTitle>Redes Sociais</CardTitle>
                <CardDescription>Adicione as Redes Sociais da barbearia.</CardDescription>
            </CardHeader>
            <CardContent>
                <TableSocialMidia /> {/*Tabela para carregar Redes Sociais*/}
            </CardContent>
            <CardFooter>
                <DialogNewSocialMidia />
            </CardFooter>
        </Card>
    );
}
