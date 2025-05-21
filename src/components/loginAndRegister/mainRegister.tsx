"use client"

import { useState } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Eye, EyeClosed } from "lucide-react";
import { TitlePage } from "./titlePage";
import { ocultarMostrarSenha } from "@/utils/ocultarMostrarSenha";
import Link from "next/link";
import { loginUser, registerUser } from "@/api/auth/authService";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { useForm } from "react-hook-form";
import { useAuth } from "@/contexts/AuthContext";

const formSchema = z.object({
    nome: z.string().min(1, 'Nome é obrigatório'),
    email: z.string().email('E-mail inválido!'),
    senha: z.string().min(6, 'Precisa ter no mínimo 6 caracteres!'),
    celular: z.string().min(8, 'Celular inválido'),
    telefone: z.string().optional(),
    endereco: z.string().min(1, 'Endereço é obrigatório'),
    latitude: z.string().min(1, 'Latitude é obrigatória'),
    longitude: z.string().min(1, 'Longitude é obrigatória'),
});

export const MainRegister = () => {
    const { login, barbearia } = useAuth();
    const [mostrarSenha, setMostrarSenha] = useState(false);

    const [loading, setLoading] = useState(false);

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: { email: "", senha: "", celular: "", endereco: "", latitude: "", longitude: "", nome: "", telefone: "" },
    });

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        setLoading(true)
        const { nome, email, senha, celular, telefone, endereco, latitude, longitude } = values;
        try {
            console.log(values)
            await registerUser({ nome, email, senha, celular, telefone, endereco, latitude, longitude });
            const userData = await loginUser({ email, senha });
            await login(userData);
            setLoading(false);
        } catch (error: any) {
            console.log(error);
            setLoading(false);
        }
    }

    return (
        <main className="min-w-[450px] mt-20 flex flex-col items-center">
            <TitlePage title="BarberPro" subtitle="Registre sua barbearia" />
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:min-w-[700px] mb-5">
                        <div className="flex flex-col gap-3">
                            <h1 className="text-lg font-bold">Dados Pessoais:</h1>
                            <FormField
                                control={form.control}
                                name="email"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>E-mail:</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Digite seu email..." {...field} />
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
                                        <FormLabel>Senha:</FormLabel>
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

                            <FormField
                                control={form.control}
                                name="celular"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Celular:</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Digite seu celular..." {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="telefone"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Telefone:</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Digite seu telefone..." {...field} />
                                        </FormControl>
                                        <FormDescription>
                                            Opcional
                                        </FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                        <div className="flex flex-col gap-3">
                            <h1 className="text-lg font-bold">Dados da Barbearia:</h1>

                            <FormField
                                control={form.control}
                                name="nome"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Nome da Barbearia:</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Digite o nome da sua Barbearia" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="endereco"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Endereço da Barbearia:</FormLabel>
                                        <FormControl>
                                            <Input placeholder="ex: Rua Brasil, Centro, 999" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="latitude"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Latitude:</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Digite a latitude..." {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="longitude"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Lontitude:</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Digite a lontitude..." {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                    </div>
                    <div className="min-w-full flex justify-center ">
                        <Button
                            type="submit"
                            className="font-bold md:w-[200px] lg:w-[300px] xl:w-[400px]"
                            disabled={loading || barbearia != null}
                        >Criar Barbearia</Button>
                    </div>
                </form>
            </Form>
            <div className="text-sm dark:text-gray-400 text-gray-600 mb-10 mt-2">
                Já tem uma conta?  <Link href={"/login"}><span className="font-bold text-blue-500 cursor-pointer">Faça seu login.</span></Link>
            </div>
        </main>
    );
}