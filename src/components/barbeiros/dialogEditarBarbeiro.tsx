import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Clock, EditIcon, LucideTimer, TimerIcon } from "lucide-react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Barbeiro } from "@/types/barbeiros";
import { useState } from "react";
import { AlertDeletar } from "./alertDeletar";
import { editBarbeiro } from "@/api/barbeiros/barbeirosServices";
import { ContentAlterarDados } from "./contentAlterarDados";
import { ContentGerenciarHorarios } from "./contentGerenciarHorarios";


type Props = {
    barbeiro: Barbeiro;
}

export const DialogEditarBarbeiro = ({ barbeiro }: Props) => {

    const [page, setPage] = useState(1);

    const handleNextPage = () => {
        if (page === 2) return;
        setPage(2);
    }
    const handleBackPage = () => {
        if (page === 1) return;
        setPage(1);
    }

    return (
        <Dialog>
            <DialogTrigger>
                <EditIcon />
            </DialogTrigger>
            <DialogContent>
                {page === 1 && <ContentAlterarDados barbeiro={barbeiro} nextPage={handleNextPage} />}
                {page === 2 && <ContentGerenciarHorarios barbeiro={barbeiro} backPage={handleBackPage} />}
            </DialogContent>
        </Dialog>
    );
}