import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableFooter,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { DialogEditService } from "./dialogEditService";
import { Services } from "@/types/services";
import { useServiceContext } from "@/contexts/ServicesContext";
import { formatarPreco } from "@/utils/formatarValores";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

type Props = {
    services: Services[] | null;
}

export const TableServices = () => {

    const { services } = useServiceContext();

    return (
        <Table>
            <TableCaption>Lista de Serviços prestados</TableCaption>
            <TableHeader>
                <TableRow>
                    <TableHead></TableHead>
                    <TableHead className="w-[150px]">Serviço</TableHead>
                    <TableHead>Duração</TableHead>
                    <TableHead className="text-right">Preço</TableHead>
                    <TableHead className="text-right"></TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>

                {services && services.map((item: Services) => (
                    <TableRow key={item.id}>
                        <TableCell>
                            <Avatar>
                                <AvatarImage src={item.imagemUrl ? item.imagemUrl : "/favicon.png"} />
                                <AvatarFallback>{item.nome.substring(0, 2).toUpperCase()}</AvatarFallback>
                            </Avatar>
                        </TableCell>
                        <TableCell className="font-medium">{item.nome}</TableCell>
                        <TableCell>{item.duracao} min</TableCell>
                        <TableCell className="text-right">{!item.preco ? " R$ 0,00" : formatarPreco(item.preco)}</TableCell>
                        <TableCell className="flex justify-end items-center">
                            <DialogEditService itemService={item} />
                        </TableCell>
                    </TableRow>
                ))}

            </TableBody>
            <TableFooter>
                <TableRow>
                    <TableCell colSpan={4}>Total de Serviços</TableCell>
                    <TableCell className="text-right">{services?.length}</TableCell>
                </TableRow>
            </TableFooter>
        </Table>
    );
}
