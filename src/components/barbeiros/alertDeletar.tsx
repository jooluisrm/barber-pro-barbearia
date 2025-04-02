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

type Props = {
    barbeiro: Barbeiro;
}

export const AlertDeletar = ({ barbeiro }: Props) => {
    return (
        <AlertDialog>
            <AlertDialogTrigger asChild>
                <Button variant={"destructive"} className="font-bold">
                    Excluir Barbeiro
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
                    >
                        Confirmar Exclusão
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
}