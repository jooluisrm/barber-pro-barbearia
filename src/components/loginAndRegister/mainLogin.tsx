"use client"

import { Eye, EyeClosed } from "lucide-react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { useState } from "react";

export const MainLogin = () => {

    const [mostrarSenha, setMostrarSenha] = useState(false);

    const VerSenha = () => {
        if (!mostrarSenha){
            setMostrarSenha(true);
        } else {
            setMostrarSenha(false);
        }
    }

    return (
        <div className="min-w-[450px] mt-20">
            <div className="text-center">
                <div className="text-4xl font-extrabold pb-5">
                    BarberPro
                </div>
                <h1 className="text-4xl pb-5">
                    Entrar na plataforma
                </h1>
            </div>
            <form className="flex flex-col gap-5">
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
                            {!mostrarSenha ? <EyeClosed  /> : <Eye  />}
                        </div>
                    </div>
                </div>
                <Button className="font-bold">Entrar</Button>
                <div className="text-sm dark:text-gray-400 text-gray-600">
                    Não tem uma conta?  <span className="font-bold text-blue-500 cursor-pointer">Cadastre-se aqui</span> e comece agora!
                </div>
            </form>
        </div>
    );
}