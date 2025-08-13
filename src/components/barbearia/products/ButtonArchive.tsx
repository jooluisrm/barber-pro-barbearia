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
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Archive } from "lucide-react"; // ÍCONE NOVO E MAIS APROPRIADO

type Props = {
    archiveFunction: () => void; // A função a ser executada
    itemName?: string;           // Nome do item para a mensagem
}

export const ButtonArchive = ({ archiveFunction, itemName }: Props) => {
    return (
        <AlertDialog>
            <TooltipProvider>
                <Tooltip>
                    <TooltipTrigger asChild>
                        <AlertDialogTrigger asChild>
                            {/* O botão agora apenas abre o dialog */}
                            <Button variant={"destructive"} size={"icon"}>
                                <Archive className="h-4 w-4" />
                            </Button>
                        </AlertDialogTrigger>
                    </TooltipTrigger>
                    <TooltipContent>
                        <p>Arquivar Produto</p>
                    </TooltipContent>
                </Tooltip>
            </TooltipProvider>

            {/* Conteúdo do Dialog de Confirmação */}
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Você tem certeza absoluta?</AlertDialogTitle>
                    <AlertDialogDescription>
                        Esta ação não deletará o produto permanentemente. Ele será movido para os arquivados e deixará de aparecer nas listas principais.
                        {itemName && <strong className="block mt-2">Você está prestes a arquivar: {itemName}</strong>}
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>Cancelar</AlertDialogCancel>
                    {/* O botão de ação executa a função de arquivar */}
                    <AlertDialogAction
                        onClick={archiveFunction}
                        className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                    >
                        Sim, arquivar
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
}