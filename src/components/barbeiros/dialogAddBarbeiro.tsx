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
import { getBarbeiros, RegisterBarbeiro, registerBarbeiro } from "@/api/barbeiros/barbeirosServices";
import { useAuth } from "@/contexts/AuthContext";
import { handleConfetti } from "@/utils/confetti";
import { useBarberContext } from "@/contexts/BarberContext";
import { loadItems } from "@/utils/loadItems";


export const DialogAddBarbeiro = () => {
    const { setBarbeiros } = useBarberContext();
    const { barbearia } = useAuth();

    const [isOpen, setIsOpen] = useState(false);
    const [mostrarSenha, setMostrarSenha] = useState(false);

    const [inputNome, setInputNome] = useState("");
    const [inputTelefone, setInputTelefone] = useState("");
    const [inputEmail, setInputEmail] = useState("");
    const [inputSenha, setInputSenha] = useState("");

    const handleCadastarBarbeiro = async () => {
        if (!barbearia) return;

        const data: RegisterBarbeiro = {
            nome: inputNome,
            telefone: inputTelefone,
            email: inputEmail,
            senha: inputSenha,
            barbeariaId: barbearia?.id
        }
        const sucesso = await registerBarbeiro(data);
        await loadItems(barbearia, getBarbeiros, setBarbeiros);

        if (sucesso) {
            handleConfetti();
            setInputNome("");
            setInputTelefone("");
            setInputEmail("");
            setInputSenha("");
            setIsOpen(false);
        }
    }

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
                <Button onClick={() => setIsOpen(true)}>
                    <UserPlus />
                </Button>
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
                        <Input
                            id="nome"
                            placeholder="Nome do barbeiro"
                            value={inputNome}
                            onChange={(e) => setInputNome(e.target.value)}
                        />
                    </div>
                    <div>
                        <label htmlFor="telefone">Telefone/Celular:</label>
                        <Input
                            id="telefone"
                            type="tel"
                            placeholder="Numero do barbeiro"
                            value={inputTelefone}
                            onChange={(e) => setInputTelefone(e.target.value)}
                        />
                    </div>
                    <div>
                        <label htmlFor="email">E-mail:</label>
                        <Input
                            id="email"
                            type="email"
                            placeholder="Email do barbeiro"
                            value={inputEmail}
                            onChange={(e) => setInputEmail(e.target.value)}
                        />
                    </div>
                    <div>
                        <label htmlFor="senha">Senha:</label>
                        <div className="relative flex items-center">
                            <Input
                                id="senha"
                                type={`${mostrarSenha ? "text" : "password"}`}
                                placeholder="Criar senha para o barbeiro"
                                className="flex-1 pr-10"
                                value={inputSenha}
                                onChange={(e) => setInputSenha(e.target.value)}
                            />
                            <div className="absolute right-3 cursor-pointer" onClick={() => ocultarMostrarSenha(setMostrarSenha, mostrarSenha)}>
                                {!mostrarSenha ? <EyeClosed /> : <Eye />}
                            </div>
                        </div>
                    </div>
                    <Button disabled={!inputNome || !inputEmail || !inputTelefone || !inputSenha} className="mt-5 font-bold" onClick={handleCadastarBarbeiro}>Cadastrar</Button>
                </main>
            </DialogContent>
        </Dialog>
    );
}