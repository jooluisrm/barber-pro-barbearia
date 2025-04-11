import { deleteService, getServices } from "@/api/barbearia/barbeariaServices";
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
import { useAuth } from "@/contexts/AuthContext";
import { useServiceContext } from "@/contexts/ServicesContext";
import { Services } from "@/types/services";
import { loadItems } from "@/utils/loadItems";
import { Trash } from "lucide-react"

type Props = {
    itemService: Services;
}

export const AlertDeleteService = ({ itemService }: Props) => {
    const { barbearia } = useAuth();
    const { setServices } = useServiceContext();

    const handleDeleteService = async () => {
        if (!barbearia) return;
        try {
            await deleteService(barbearia.id, itemService.id);
            await loadItems(barbearia, getServices, setServices);
        } catch (error: any) {
            console.log(error);
        }
    }

    return (
        <AlertDialog>
            <AlertDialogTrigger asChild>
                <Button variant="destructive" size="sm">
                    <Trash className="h-4 w-4" />
                </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle className="text-destructive">
                        Confirmar exclusão do serviço?
                    </AlertDialogTitle>
                    <AlertDialogDescription className="text-muted-foreground">
                        <div className="space-y-2">
                            <p>Esta ação <span className="font-bold text-destructive">não poderá ser desfeita</span> e terá as seguintes consequências:</p>

                            <ul className="list-disc pl-5 space-y-1 text-sm">
                                <li>O serviço <span className="font-bold">será removido permanentemente</span> do seu catálogo</li>
                                <li>Todos os agendamentos futuros para este serviço serão <span className="font-bold">automaticamente deletados</span></li>
                                <li>Relatórios históricos de serviços realizados <span className="font-bold">serão deletados</span></li>
                            </ul>

                            <div className="mt-3 p-3 bg-muted/50 rounded-md text-sm">
                                <p className="font-medium">Serviço a ser excluído:</p>
                                <p className="text-muted-foreground">{itemService.nome} (R$ {itemService.preco})</p>
                            </div>
                        </div>
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>Cancelar</AlertDialogCancel>
                    <AlertDialogAction
                        className="bg-destructive hover:bg-destructive/90 dark:text-white"
                        onClick={handleDeleteService}
                    >
                        Confirmar Exclusão
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}
