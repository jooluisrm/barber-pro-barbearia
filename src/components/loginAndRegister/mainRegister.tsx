"use client"

import { useState } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Eye, EyeClosed } from "lucide-react";
import { TitlePage } from "./titlePage";

export const MainRegister = () => {

    const [mostrarSenha, setMostrarSenha] = useState(false);

    const VerSenha = () => {
        if (!mostrarSenha) {
            setMostrarSenha(true);
        } else {
            setMostrarSenha(false);
        }
    }

    return (
        <main className="min-w-[450px] mt-20 flex flex-col items-center">
            <TitlePage title="BarberPro" subtitle="Registre sua barbearia" />
            <form className="grid grid-cols-1 md:grid-cols-2 gap-10 md:min-w-[700px] mb-5">
                <div className="flex flex-col gap-3">
                    <h1 className="text-lg font-bold">Dados Pessoais:</h1>
                    <div>
                        <label htmlFor="email">E-mail:</label>
                        <Input id="email" placeholder="Digite seu email" />
                    </div>
                    <div>
                        <label htmlFor="senha">Senha:</label>
                        <div className="relative flex items-center">
                            <Input
                                id="senha"
                                type={`${mostrarSenha ? "text" : "password"}`}
                                placeholder="Digite sua senha"
                                className="flex-1 pr-10"
                            />
                            <div className="absolute right-3" onClick={() => VerSenha()}>
                                {!mostrarSenha ? <EyeClosed /> : <Eye />}
                            </div>
                        </div>
                    </div>
                    <div>
                        <label htmlFor="celular">Celular:</label>
                        <Input id="celular" placeholder="Digite seu celular" />
                    </div>
                    <div>
                        <label htmlFor="telefone">Telefone:</label>
                        <Input id="telefone" placeholder="Digite sua senha" />
                    </div>
                </div>
                <div className="flex flex-col gap-3">
                    <h1 className="text-lg font-bold">Dados da Barbearia:</h1>
                    <div>
                        <label htmlFor="nomeBarbearia">Nome da Barbearia:</label>
                        <Input id="nomeBarbearia" placeholder="Digite o nome da sua barbearia" />
                    </div>
                    <div>
                        <label htmlFor="endereco">Endereço da Barbearia:</label>
                        <Input id="endereco" placeholder="ex: Rua Brasil, Centro, 999" />
                    </div>
                    <div>
                        <label htmlFor="latitude">Latitude:</label>
                        <Input id="latitude" placeholder="Digite a Latitude" />
                    </div>
                    <div>
                        <label htmlFor="lontitude">Lontitude:</label>
                        <Input id="lontitude" placeholder="Digite a Lontitude" />
                    </div>
                </div>
            </form>
            <Button className="font-bold mb-10 mt-5 min-w-[246px] md:w-full">Criar Barbearia</Button>
        </main>
    );
}