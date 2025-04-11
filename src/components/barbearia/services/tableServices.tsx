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

type Props = {
    services: Services[] | null;
}

export const TableServices = ({ services }: Props) => {
    return (
        <Table>
            <TableCaption>Lista de Serviços prestados</TableCaption>
            <TableHeader>
                <TableRow>
                    <TableHead className="w-[150px]">Serviço</TableHead>
                    <TableHead>Duração</TableHead>
                    <TableHead className="text-right">Preço</TableHead>
                    <TableHead className="text-right"></TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>

                {services && services.map((item) => (
                    <TableRow key={item.id}>
                        <TableCell className="font-medium">{item.nome}</TableCell>
                        <TableCell>{item.duracao} min</TableCell>
                        <TableCell className="text-right">{!item.preco ? "0,00" : item.preco}</TableCell>
                        <TableCell className="flex justify-end items-center">
                            <DialogEditService itemService={item}/>
                        </TableCell>
                    </TableRow>
                ))}

            </TableBody>
            <TableFooter>
                <TableRow>
                    <TableCell colSpan={3}>Total de Serviços</TableCell>
                    <TableCell className="text-right">{services?.length}</TableCell>
                </TableRow>
            </TableFooter>
        </Table>
    );
}
