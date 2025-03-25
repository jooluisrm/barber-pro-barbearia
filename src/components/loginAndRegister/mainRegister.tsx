"use client"

import { useState } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Eye, EyeClosed } from "lucide-react";
import { TitlePage } from "./titlePage";
import { ocultarMostrarSenha } from "@/utils/ocultarMostrarSenha";
import Link from "next/link";
import { toast } from "sonner";
import { registerUser } from "@/api/auth/authService";

export const MainRegister = () => {

    const [mostrarSenha, setMostrarSenha] = useState(false);

    const [inputEmail, setInputEmail] = useState("");
    const [inputSenha, setInputSenha] = useState("");
    const [inputCelular, setInputCelular] = useState("");
    const [inputTelefone, setInputTelefone] = useState("");
    const [inputNome, setInputNome] = useState("");
    const [inputEndereco, setInputEndereco] = useState("");
    const [inputLatitude, setInputLatitude] = useState("");
    const [inputLongitude, setInputLongitude] = useState("");
    
    const fazerRegistro = async (nome: string, email: string, senha: string, celular: string, telefone: string, endereco: string, latitude: string, longitude: string) => {
        try {
            await registerUser({nome, email, senha, celular, telefone, endereco, latitude, longitude});
        } catch (error) {
            console.log("Erro!");
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
                        <Input
                            id="email"
                            placeholder="Digite seu email"
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
                        <label htmlFor="celular">Celular:</label>
                        <Input
                            id="celular"
                            placeholder="Digite seu celular"
                            value={inputCelular}
                            onChange={(e) => setInputCelular(e.target.value)}
                        />
                    </div>
                    <div>
                        <label htmlFor="telefone">Telefone:</label>
                        <Input
                            id="telefone"
                            placeholder="Digite seu telefone (Opcional)"
                            value={inputTelefone}
                            onChange={(e) => setInputTelefone(e.target.value)}
                        />
                    </div>
                </div>
                <div className="flex flex-col gap-3">
                    <h1 className="text-lg font-bold">Dados da Barbearia:</h1>
                    <div>
                        <label htmlFor="nomeBarbearia">Nome da Barbearia:</label>
                        <Input
                            id="nomeBarbearia"
                            placeholder="Digite o nome da sua barbearia"
                            value={inputNome}
                            onChange={(e) => setInputNome(e.target.value)}
                        />
                    </div>
                    <div>
                        <label htmlFor="endereco">Endereço da Barbearia:</label>
                        <Input
                            id="endereco"
                            placeholder="ex: Rua Brasil, Centro, 999"
                            value={inputEndereco}
                            onChange={(e) => setInputEndereco(e.target.value)}
                        />
                    </div>
                    <div>
                        <label htmlFor="latitude">Latitude:</label>
                        <Input
                            id="latitude"
                            placeholder="Digite a Latitude"
                            value={inputLatitude}
                            onChange={(e) => setInputLatitude(e.target.value)}
                        />
                    </div>
                    <div>
                        <label htmlFor="lontitude">Lontitude:</label>
                        <Input
                            id="lontitude"
                            placeholder="Digite a Lontitude"
                            value={inputLongitude}
                            onChange={(e) => setInputLongitude(e.target.value)}
                        />
                    </div>
                </div>
            </form>
            <Button onClick={() => fazerRegistro(inputNome, inputEmail, inputSenha, inputCelular, inputTelefone, inputEndereco, inputLatitude, inputLongitude)} className="font-bold mt-5 min-w-[246px] md:w-full">Criar Barbearia</Button>
            <div className="text-sm dark:text-gray-400 text-gray-600 mb-10 mt-2">
                Já tem uma conta?  <Link href={"/login"}><span className="font-bold text-blue-500 cursor-pointer">Faça seu login.</span></Link>
            </div>
        </main>
    );
}