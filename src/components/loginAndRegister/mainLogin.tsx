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
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { useForm } from "react-hook-form";

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
        <main className="min-w-[450px] mt-20 flex flex-col items-center">
            <TitlePage title="BarberPro" subtitle="Entrar na plataforma" />

            <div className="flex flex-col gap-5">
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-5">
                        <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>E-mail</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Digite seu e-mail..." {...field} />
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
                                                placeholder="Digite sua senha..."
                                                className="flex-1 pr-10"
                                                {...field}
                                            />
                                            <div className="absolute right-3 cursor-pointer" onClick={() => ocultarMostrarSenha(setMostrarSenha, mostrarSenha)}>
                                                {!mostrarSenha ? <EyeClosed /> : <Eye />}
                                            </div>
                                        </div>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <Button type="submit" className="font-bold" disabled={loading || barbearia != null}>Entrar</Button>
                        <div className="text-sm dark:text-gray-400 text-gray-600">
                            Não tem uma conta?  <Link href={"/register"}><span className="font-bold text-blue-500 cursor-pointer">Cadastre-se aqui</span></Link> e comece agora!
                        </div>
                    </form>
                </Form>
            </div>
        </main>
    );
}