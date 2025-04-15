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
import { DialogEditSocialMidia } from "./dialogEditSocialMidia";
import { useSocialContext } from "@/contexts/SocialContext";

export const TableSocialMidia = () => {

    const { socialMedia } = useSocialContext();

    return (
        <Table>
            <TableCaption>Lista de Redes Sociais</TableCaption>
            <TableHeader>
                <TableRow>
                    <TableHead className="w-[150px]">Rede Social</TableHead>
                    <TableHead>Link</TableHead>
                    <TableHead className="text-right"></TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>

                {socialMedia && socialMedia.map((item) => (
                    <TableRow key={item.id}>
                        <TableCell className="font-medium">{item.rede}</TableCell>
                        <TableCell>{item.link}</TableCell>
                        <TableCell className="flex justify-end items-center">
                            <DialogEditSocialMidia />
                        </TableCell>
                    </TableRow>
                ))}

            </TableBody>
            <TableFooter>
                <TableRow>
                    <TableCell colSpan={2}>Total de Redes Sociais</TableCell>
                    <TableCell className="text-right">{socialMedia?.length}</TableCell>
                </TableRow>
            </TableFooter>
        </Table>
    );
}
