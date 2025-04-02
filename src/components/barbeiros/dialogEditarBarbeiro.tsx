import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { EditIcon } from "lucide-react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Barbeiro } from "@/types/barbeiros";
import { useState } from "react";

type Props = {
    barbeiro: Barbeiro;
}

export const DialogEditarBarbeiro = ({ barbeiro }: Props) => {

    const [inputNome, setInputNome] = useState(barbeiro.nome);
    const [inputEmail, setInputEmail] = useState(barbeiro.email);
    const [inputTelefone, setInputTelefone] = useState(barbeiro.telefone);

    return (
        <Dialog>
            <DialogTrigger>
                <EditIcon />
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Editar Barbeiro</DialogTitle>
                    <DialogDescription>
                        Atualize as informações do profissional abaixo
                    </DialogDescription>
                </DialogHeader>
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
                    <div className="mt-5 flex justify-between">
                        <Button variant={"destructive"} className="font-bold">Deletar</Button>
                        <Button className="font-bold">Salvar Alterações</Button>
                    </div>
                </main>
            </DialogContent>
        </Dialog>
    );
}