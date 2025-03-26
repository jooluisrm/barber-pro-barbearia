"use client"

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
import { useAuth } from "@/contexts/AuthContext"
import { LogOut } from "lucide-react"
import { toast } from "sonner"

export const AlertLogout = () => {
    const { logout } = useAuth();

    const sairDaConta = () => {
        logout();
        toast.success("Você foi deslogado com sucesso!", {
            action: {
                label: "Fechar",
                onClick: () => console.log("Fechar"),
            }
        });
    }
    return (
        <AlertDialog>
            <AlertDialogTrigger asChild>
                <div
                    className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground transition-all cursor-pointer"
                >
                    <LogOut className="h-5 w-5 text-red-500 cursor-pointer" />
                    <div className="md:hidden">Sair</div>
                </div>
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Tem certeza que deseja sair?</AlertDialogTitle>
                    <AlertDialogDescription>
                        Deseja realmente sair? Você precisará inserir seu e-mail e senha para acessar novamente.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>Cancelar</AlertDialogCancel>
                    <AlertDialogAction className="" onClick={() => sairDaConta()}>Confirmar</AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}
