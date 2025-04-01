"use client"

import { Eye, EyeClosed } from "lucide-react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { useState } from "react";
import { TitlePage } from "./titlePage";
import { ocultarMostrarSenha } from "@/utils/ocultarMostrarSenha";
import { loginUser } from "@/api/auth/authService";
import { useAuth } from "@/contexts/AuthContext";
import Link from "next/link";
import { toast } from "sonner";
import { handleConfetti } from "@/utils/confetti";


export const MainLogin = () => {
    const { login } = useAuth();

    const [mostrarSenha, setMostrarSenha] = useState(false);

    const [inputEmail, setInputEmail] = useState("");
    const [inputSenha, setInputSenha] = useState("");

    const fazerLogin = async (email: string, senha: string) => {
        try {
            const userData = await loginUser({ email, senha });
            login(userData);
            handleConfetti(); // efeito de confetti
            toast.success("Login realizado com sucesso!", {
                action: {
                    label: "Fechar",
                    onClick: () => console.log("Fechar"),
                }
            });

        } catch (error: any) {
            const errorMessage = error.message || "Erro ao fazer login";
    
            toast.error(errorMessage, {
                action: {
                    label: "Fechar",
                    onClick: () => console.log("Fechar"),
                }
            });
        }
    };
    

    return (
        <main className="min-w-[450px] mt-20 flex flex-col items-center">
            <TitlePage title="BarberPro" subtitle="Entrar na plataforma" />
            <div className="flex flex-col gap-5">
                <div>
                    <label htmlFor="email">E-mail:</label>
                    <Input
                        id="email"
                        type="email"
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
                <Button onClick={() => fazerLogin(inputEmail, inputSenha)} className="font-bold">Entrar</Button>
                <div className="text-sm dark:text-gray-400 text-gray-600">
                    Não tem uma conta?  <Link href={"/register"}><span className="font-bold text-blue-500 cursor-pointer">Cadastre-se aqui</span></Link> e comece agora!
                </div>
            </div>
        </main>
    );
}