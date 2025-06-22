"use client"

import { Eye, EyeClosed, LoaderCircle } from "lucide-react";
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
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { useForm } from "react-hook-form";
import Image from "next/image";

const formSchema = z.object({
    email: z.string().email('E-mail inválido!'),
    senha: z.string().min(6, 'Precisa ter minimo 6 caracteres!')
});

export const MainLogin = () => {
    const { login, barbearia } = useAuth();

    const [mostrarSenha, setMostrarSenha] = useState(false);

    const [loading, setLoading] = useState(false);

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: { email: "", senha: "" },
    });

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        setLoading(true);
        const { email, senha } = values;
        try {
            const userData = await loginUser({ email, senha })
            login(userData);
            handleConfetti();
            toast.success("Login realizado com sucesso!", {
                action: {
                    label: "Fechar",
                    onClick: () => console.log("Fechar"),
                }
            });
            setLoading(false);
        } catch (error: any) {
            const errorMessage = error.message || "Erro ao fazer login";
            toast.error(errorMessage, {
                action: {
                    label: "Fechar",
                    onClick: () => console.log("Fechar"),
                }
            });
            setLoading(false);
        }
    }

    return (
        <main className="flex min-h-screen w-full items-center justify-center p-4">
            {/* Painel principal que será centralizado */}
            <div className="w-full max-w-4xl lg:grid lg:grid-cols-2 rounded-2xl bg-card overflow-hidden">

                {/* Coluna da Esquerda (Boas-vindas e Logo) */}
                <div className="hidden lg:flex flex-col items-center justify-center gap-6 p-12 text-center bg-[#f7f7f7] dark:bg-[#1d1d1d]">
                    <Image
                        alt="Logo BarberPro"
                        width={150}
                        height={150}
                        src={"/barberpro-removebg.png"}
                        className="bg-white rounded-full border"
                    />
                    <div className="space-y-2">
                        <h1 className="text-3xl font-bold">Bem-vindo ao <span className="font-extrabold">BarberPro</span>!</h1>
                        <p className="text-muted-foreground">
                            A plataforma completa para gerenciar sua barbearia com eficiência e estilo.
                        </p>
                    </div>
                </div>

                {/* Coluna da Direita (Formulário) */}
                <div className="max-w-[500px] mx-auto flex flex-col justify-center p-8 sm:p-12 border-l border-t border-r border-b rounded-tl-2xl rounded-bl-2xl lg:rounded-tl-none lg:rounded-bl-none rounded-tr-2xl rounded-br-2xl">
                    <TitlePage title="Acesse sua conta" subtitle="Entre na plataforma para começar" />

                    <div className="mt-6 flex flex-col gap-5">
                        <Form {...form}>
                            <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-5">
                                <FormField
                                    control={form.control}
                                    name="email"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>E-mail</FormLabel>
                                            <FormControl>
                                                <Input placeholder="Digite seu e-mail" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="senha"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Senha</FormLabel>
                                            <FormControl>
                                                <div className="relative flex items-center">
                                                    <Input
                                                        id="senha"
                                                        type={`${mostrarSenha ? "text" : "password"}`}
                                                        placeholder="Digite sua senha"
                                                        className="pr-10"
                                                        {...field}
                                                    />
                                                    <div className="absolute right-3 cursor-pointer" onClick={() => setMostrarSenha(!mostrarSenha)}>
                                                        {!mostrarSenha ? <EyeClosed className="h-5 w-5 text-muted-foreground" /> : <Eye className="h-5 w-5 text-muted-foreground" />}
                                                    </div>
                                                </div>
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <Button type="submit" className="font-bold w-full" disabled={loading || barbearia != null}>
                                    {loading ? <LoaderCircle className="animate-spin" /> : "Entrar"}
                                </Button>
                                <div className="text-center text-sm text-muted-foreground">
                                    Não tem uma conta?{" "}
                                    <Link href={"/register"}>
                                        <span className="font-bold text-blue-500 underline-offset-4 hover:underline">
                                            Cadastre-se aqui
                                        </span>
                                    </Link>
                                </div>
                            </form>
                        </Form>
                    </div>
                </div>

            </div>
        </main>
    );
}