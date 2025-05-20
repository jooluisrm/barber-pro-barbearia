import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "../ui/input";
import { AlertDialogHeader } from "../ui/alert-dialog";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "../ui/tooltip";
import { AlertDeletar } from "./alertDeletar";
import { Button } from "../ui/button";
import { Barbeiro } from "@/types/barbeiros";
import { useState } from "react";
import { editBarbeiro, getBarbeiros } from "@/api/barbeiros/barbeirosServices";
import { Clock } from "lucide-react";
import { loadItems } from "@/utils/loadItems";
import { useAuth } from "@/contexts/AuthContext";
import { useBarberContext } from "@/contexts/BarberContext";


type Props = {
    barbeiro: Barbeiro;
    nextPage: VoidFunction;
    setOpen: (e: boolean) => void;
}

export const ContentAlterarDados = ({ barbeiro, nextPage, setOpen }: Props) => {
    const { barbearia } = useAuth();
    const { setBarbeiros } = useBarberContext();

    const [inputNome, setInputNome] = useState(barbeiro.nome);
    const [inputEmail, setInputEmail] = useState(barbeiro.email);
    const [inputTelefone, setInputTelefone] = useState(barbeiro.telefone);

    const handleEdit = async () => {
        const done = await editBarbeiro(barbeiro.id, { nome: inputNome, email: inputEmail, telefone: inputTelefone });
        if (done) {
            setOpen(false);
            await loadItems(barbearia, getBarbeiros, setBarbeiros);
        }
    }

    return (
        <>
            <AlertDialogHeader>
                <DialogTitle>Editar Barbeiro</DialogTitle>
                <DialogDescription>
                    Atualize as informações do profissional abaixo
                </DialogDescription>
            </AlertDialogHeader>
            <main className="flex flex-col gap-5">
                <div>
                    <label htmlFor="nome">Nome Completo:</label>
                    <Input
                        id="nome"
                        placeholder="Digite seu nome completo"
                        value={inputNome}
                        onChange={(e) => setInputNome(e.target.value)}
                    />
                </div>
                <div>
                    <label htmlFor="telefone">Telefone/Celular:</label>
                    <Input
                        id="telefone"
                        type="tel"
                        placeholder="Digite seu novo numero"
                        value={inputTelefone}
                        onChange={(e) => setInputTelefone(e.target.value)}
                    />
                </div>
                <div>
                    <label htmlFor="email">E-mail:</label>
                    <Input
                        id="email"
                        type="email"
                        placeholder="Digite seu novo email"
                        value={inputEmail}
                        onChange={(e) => setInputEmail(e.target.value)}
                    />
                </div>
                <div className="block">
                    <TooltipProvider>
                        <Tooltip>
                            <TooltipTrigger>
                                <Button variant="outline" onClick={() => nextPage()}><Clock /></Button>
                            </TooltipTrigger>
                            <TooltipContent>
                                Gerenciar Horários
                            </TooltipContent>
                        </Tooltip>
                    </TooltipProvider>
                </div>

                <div className="mt-5 flex justify-between">
                    <AlertDeletar barbeiro={barbeiro} />
                    <Button className="font-bold" onClick={handleEdit}>Salvar Alterações</Button>
                </div>
            </main>
        </>
    );
}