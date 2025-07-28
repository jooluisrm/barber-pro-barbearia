import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { EditIcon, Timer } from "lucide-react";
import { Barbeiro } from "@/types/barbeiros";
import { useState } from "react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Button } from "../ui/button";
import { ContentGerenciarHorarios } from "../barbeiros/contentGerenciarHorarios";


type Props = {
    barbeiro: any;
}

export const DialogEditarHorarioBarbeiro = ({ barbeiro }: Props) => {

    const [open, setOpen] = useState(false);

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <TooltipProvider>
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <Button className="w-fit"  onClick={(e) => setOpen(true)}><Timer /></Button>
                        </TooltipTrigger>
                        <TooltipContent>
                            <p>Editar Horário</p>
                        </TooltipContent>
                    </Tooltip>
                </TooltipProvider>
            </DialogTrigger>
            <DialogContent>
                <ContentGerenciarHorarios barbeiro={barbeiro} />
            </DialogContent>
        </Dialog>
    );
}