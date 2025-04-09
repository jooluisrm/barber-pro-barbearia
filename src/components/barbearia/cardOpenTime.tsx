import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { TableServices } from "./tableServices"

export const CardWithForm = () => {
    return (
        <Card className="">
            <CardHeader>
                <CardTitle>Serviços</CardTitle>
                <CardDescription>Adicione os Serviços prestados em sua barbearia.</CardDescription>
            </CardHeader>
            <CardContent>
                <TableServices /> {/*Tabela para carregar serviços*/}
            </CardContent>
            <CardFooter className="flex justify-between">
                <Button>Novo Serviço</Button>
            </CardFooter>
        </Card>
    );
}
