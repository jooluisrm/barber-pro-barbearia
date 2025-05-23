"use client"

import { useState } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Eye, EyeClosed } from "lucide-react";
import { TitlePage } from "./titlePage";
import { ocultarMostrarSenha } from "@/utils/ocultarMostrarSenha";
import Link from "next/link";
import { criarPagamento, loginUser, registerUser } from "@/api/auth/authService";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { useForm } from "react-hook-form";
import { useAuth } from "@/contexts/AuthContext";
import InputMask from 'react-input-mask'
import { useRouter } from "next/navigation";

const formSchema = z.object({
    nomeCompleto: z.string().min(2, "Precisa ter no mínimo 2 caracteres!"),
    taxId: z.string(),
    nome: z.string().min(1, 'Nome é obrigatório'),
    email: z.string().email('E-mail inválido!'),
    senha: z.string().min(6, 'Precisa ter no mínimo 6 caracteres!'),
    celular: z
        .string()
        .regex(/^\(\d{2}\) \d{5}-\d{4}$/, {
            message: 'Celular inválido (ex: (11) 91234-5678)',
        }),
    telefone: z
        .string()
        .optional()
        .refine(
            (val) => !val || /^\(\d{2}\) \d{4}-\d{4}$/.test(val),
            {
                message: 'Telefone inválido (ex: (11) 3123-4567)',
            }
        ),
    endereco: z.string().min(1, 'Endereço é obrigatório'),
    latitude: z.string().min(1, 'Latitude é obrigatória'),
    longitude: z.string().min(1, 'Longitude é obrigatória'),
});


export const MainRegister = () => {
    const router = useRouter();
    const { login, barbearia } = useAuth();
    const [mostrarSenha, setMostrarSenha] = useState(false);

    const [loading, setLoading] = useState(false);

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: { nomeCompleto: "", taxId: "" , email: "", senha: "", celular: "", endereco: "", latitude: "", longitude: "", nome: "", telefone: "" },
    });

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        setLoading(true);
        const { nome, email, senha, celular, telefone, endereco, latitude, longitude, nomeCompleto, taxId } = values;

        try {
            const dados = await criarPagamento({email, nome: nomeCompleto, plano: "Mensal", taxId, telefone, celular, valorCentavos: 1500, endereco, latitude, longitude, senha});
            console.log(dados.billing.data.url)
            await router.push(dados.billing.data.url);
            //await registerUser({ nome, email, senha, celular, telefone, endereco, latitude, longitude });
            //const userData = await loginUser({ email, senha });
            //await login(userData);
        } catch (error: any) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

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
                                name="nomeCompleto"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Nome Completo:</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Digite seu nome completo..." {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="taxId"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>CPF/CNPJ</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Digite seu CPF ou CNPJ" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
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
                                            <InputMask
                                                mask="(99) 99999-9999"
                                                value={field.value}
                                                onChange={field.onChange}
                                                onBlur={field.onBlur}
                                            >
                                                {(inputProps: any) => (
                                                    <Input
                                                        {...inputProps}
                                                        inputRef={field.ref} // ESSENCIAL: envia ref correta ao RHF
                                                        placeholder="Digite seu celular..."
                                                    />
                                                )}
                                            </InputMask>
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
                                            <InputMask
                                                mask="(99) 9999-9999"
                                                value={field.value}
                                                onChange={field.onChange}
                                                onBlur={field.onBlur}
                                            >
                                                {(inputProps: any) => (
                                                    <Input
                                                        {...inputProps}
                                                        inputRef={field.ref} // ESSENCIAL: envia ref correta ao RHF
                                                        placeholder="Digite seu telefone..."
                                                    />
                                                )}
                                            </InputMask>
                                        </FormControl>
                                        <FormDescription>Opcional</FormDescription>
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