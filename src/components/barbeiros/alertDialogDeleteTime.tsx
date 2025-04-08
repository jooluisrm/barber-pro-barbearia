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
import { Button } from "@/components/ui/button"
import { HorariosDeTrabalho } from "@/types/barbeiros";
import { Trash2 } from "lucide-react";

type Props = {
    selectDia: string | null;
    handleDeleteWorkTime: () => void;
    selectItemTime: HorariosDeTrabalho[];
}

export const AlertDialogDeleteTime = ({ selectDia, handleDeleteWorkTime, selectItemTime }: Props) => {

    return (
        <AlertDialog>
            <AlertDialogTrigger asChild>
                <Button variant="destructive" className={`${!selectDia ? "hidden" : "flex"}`}>
                    <Trash2 className="h-4 w-4" />
                </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle className="text-destructive">
                        Confirmar exclusão de horários?
                    </AlertDialogTitle>
                    <AlertDialogDescription className="text-muted-foreground">
                        <div className="space-y-2">
                            <p>Esta ação <span className="font-bold text-destructive">não poderá ser desfeita</span> e terá as seguintes consequências:</p>

                            <ul className="list-disc pl-5 space-y-1 text-sm">
                                <li>Os horários selecionados serão <span className="font-bold">permanentemente removidos</span> da agenda</li>
                                <li>Todos os agendamentos existentes nestes horários serão <span className="font-bold">automaticamente cancelados</span></li>
                            </ul>

                            <div className="mt-3 p-3 bg-muted/50 rounded-md text-sm">
                                <p className="font-medium">Horários afetados: {selectItemTime.map((item) => (
                                    <span className="font-bold dark:text-white text-black">{item.hora}, </span>
                                ))}
                                </p>
                            </div>
                        </div>
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>Cancelar</AlertDialogCancel>
                    <AlertDialogAction
                        className="bg-destructive hover:bg-destructive/90 dark:text-white"
                        onClick={handleDeleteWorkTime}
                    >
                        Confirmar Exclusão
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}
