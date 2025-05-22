import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Button } from "../ui/button";
import { Barbeiro } from "@/types/barbeiros";
import { deleteBarbeiro, getBarbeiros } from "@/api/barbeiros/barbeirosServices";
import { useEffect, useState } from "react";
import { loadItems } from "@/utils/loadItems";
import { useAuth } from "@/contexts/AuthContext";
import { useBarberContext } from "@/contexts/BarberContext";
import { Trash2 } from "lucide-react";

type Props = {
    barbeiro: Barbeiro;
}

export const AlertDeletar = ({ barbeiro }: Props) => {
    const { barbearia } = useAuth();
    const { setBarbeiros } = useBarberContext();

    const [desabilitar, setDesabilitar] = useState(true);
    const [cont, setCont] = useState(5);
    const [click, setClick] = useState(false);

    const handleDeleteBarbeiro = async () => {
        await deleteBarbeiro(barbeiro.id);
        await loadItems(barbearia, getBarbeiros, setBarbeiros);
    }

    useEffect(() => {
        if (!click) return;
        const timer = setInterval(() => {
            setCont((prev) => {
                if (prev <= 1) {
                    clearInterval(timer);
                    setDesabilitar(false);
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);

        return () => clearInterval(timer);
    }, [click]);

    return (
        <AlertDialog>
            <AlertDialogTrigger asChild>
                <Button variant={"destructive"} className="font-bold" onClick={() => setClick(true)}>
                    <Trash2 />
                </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle className="text-destructive font-bold">
                        Confirmar exclusão?
                    </AlertDialogTitle>
                    <AlertDialogDescription className="text-muted-foreground">
                        <div className="space-y-2">
                            <p>Esta ação <span className="font-bold text-destructive">não poderá ser desfeita</span> e terá as seguintes consequências:</p>
                            <ul className="list-disc pl-5 space-y-1">
                                <li>Barbeiro a ser deletado: <span className="font-bold">{barbeiro.nome}</span></li>
                                <li>Todos os horários de agendamentos deste barbeiro serão <span className="font-bold">permanentemente removidos</span></li>
                                <li>O perfil e histórico de serviços serão <span className="font-bold">excluídos do sistema</span></li>
                            </ul>
                            <p className="pt-2">Deseja realmente prosseguir?</p>
                        </div>
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>Cancelar</AlertDialogCancel>
                    <AlertDialogAction
                        className="bg-destructive hover:bg-destructive/90 text-white"
                        onClick={handleDeleteBarbeiro}
                        disabled={desabilitar}
                    >
                        Confirmar Exclusão {desabilitar && `em 0${cont}`}
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
}