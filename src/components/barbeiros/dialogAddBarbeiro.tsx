import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Eye, EyeClosed, UserPlus } from "lucide-react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { useState } from "react";
import { ocultarMostrarSenha } from "@/utils/ocultarMostrarSenha";

export const DialogAddBarbeiro = () => {
    const [mostrarSenha, setMostrarSenha] = useState(false);
    const [inputSenha, setInputSenha] = useState("");
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button><UserPlus /></Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Registrar Novo Barbeiro</DialogTitle>
                    <DialogDescription>
                        Preencha os dados abaixo para cadastrar um novo profissional na sua barbearia
                    </DialogDescription>
                </DialogHeader>
                <main className="flex flex-col gap-5">
                    <div>
                        <label htmlFor="nome">Nome Completo:</label>
                        <Input id="nome" placeholder="Digite seu nome completo"/>
                    </div>
                    <div>
                        <label htmlFor="email">E-mail:</label>
                        <Input id="email" type="email" placeholder="Digite seu email"/>
                    </div>
                    <div>
                        <label htmlFor="senha">Senha:</label>
                        <div className="relative flex items-center">
                            <Input
                                id="senha"
                                type={`${mostrarSenha ? "text" : "password"}`}
                                placeholder="Digite sua senha"
                                className="flex-1 pr-10"
                                value={inputSenha}
                                onChange={(e) => setInputSenha(e.target.value)}
                            />
                            <div className="absolute right-3" onClick={() => ocultarMostrarSenha(setMostrarSenha, mostrarSenha)}>
                                {!mostrarSenha ? <EyeClosed /> : <Eye />}
                            </div>
                        </div>
                    </div>
                    <div>
                        <label htmlFor="telefone">Telefone/Celular:</label>
                        <Input id="telefone" type="tel" placeholder="Digite seu numero"/>
                    </div>
                    <Button className="mt-5 font-bold">Criar</Button>
                </main>
            </DialogContent>
        </Dialog>
    );
}