import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { EditIcon } from "lucide-react";
import { Barbeiro } from "@/types/barbeiros";
import { useState } from "react";
import { ContentAlterarDados } from "./contentAlterarDados";
import { ContentGerenciarHorarios } from "./contentGerenciarHorarios";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Button } from "../ui/button";


type Props = {
    barbeiro: Barbeiro;
}

export const DialogEditarBarbeiro = ({ barbeiro }: Props) => {

    const [page, setPage] = useState(1);

    const [open, setOpen] = useState(false);

    const handleNextPage = () => {
        if (page === 2) return;
        setPage(2);
    }
    const handleBackPage = () => {
        if (page === 1) return;
        setPage(1);
    }

    return (
        <Dialog open={open} onOpenChange={setOpen} modal={false}>
            <DialogTrigger asChild>
                <TooltipProvider>
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <Button variant={"ghost"} onClick={(e) => setOpen(true)}><EditIcon /></Button>
                        </TooltipTrigger>
                        <TooltipContent>
                            <p>Editar/Excluir</p>
                        </TooltipContent>
                    </Tooltip>
                </TooltipProvider>
            </DialogTrigger>
            <DialogContent>
                {page === 1 && <ContentAlterarDados barbeiro={barbeiro} nextPage={handleNextPage} setOpen={setOpen}/>}
                {page === 2 && <ContentGerenciarHorarios barbeiro={barbeiro} backPage={handleBackPage} />}
            </DialogContent>
        </Dialog>
    );
}