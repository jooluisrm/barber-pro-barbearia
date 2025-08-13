"use client"

import { useState } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Eye, EyeClosed, LoaderCircle } from "lucide-react";
import { TitlePage } from "./titlePage";
import Link from "next/link";
import { loginUser, registerUser } from "@/api/auth/authService";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage, FormDescription } from "../ui/form";
import { useForm } from "react-hook-form";
import { useAuth } from "@/contexts/AuthContext";
import InputMask from 'react-input-mask'
import { useRouter } from "next/navigation";
import { toast } from "sonner";

const formSchema = z.object({
    nomeAdmin: z.string().min(2, 'Seu nome é obrigatório.'),
    emailAdmin: z.string().email('E-mail inválido!'),
    senhaAdmin: z.string().min(6, 'A senha precisa ter no mínimo 6 caracteres!'),
    nomeBarbearia: z.string().min(1, 'Nome da barbearia é obrigatório.'),
    celular: z.string().regex(/^\(\d{2}\) \d{5}-\d{4}$/, 'Celular inválido (ex: (11) 91234-5678)'),
    telefone: z.string().optional().refine(val => !val || /^\(\d{2}\) \d{4}-\d{4}$/.test(val), {
        message: 'Telefone inválido (ex: (11) 3123-4567)',
    }),
    endereco: z.string().min(1, 'Endereço é obrigatório.'),
    latitude: z.string().min(1, 'Latitude é obrigatória.'),
    longitude: z.string().min(1, 'Longitude é obrigatória.'),
});

export const MainRegister = () => {
    const router = useRouter();
    const { login, usuario } = useAuth();
    const [mostrarSenha, setMostrarSenha] = useState(false);
    const [loading, setLoading] = useState(false);

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            nomeAdmin: "",
            emailAdmin: "",
            senhaAdmin: "",
            nomeBarbearia: "",
            celular: "",
            telefone: "",
            endereco: "",
            latitude: "",
            longitude: "",
        },
    });

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        setLoading(true);
        try {
            await registerUser({
                nomeBarbearia: values.nomeBarbearia,
                endereco: values.endereco,
                celular: values.celular,
                telefone: values.telefone,
                latitude: values.latitude,
                longitude: values.longitude,
                nomeAdmin: values.nomeAdmin,
                emailAdmin: values.emailAdmin,
                senhaAdmin: values.senhaAdmin,
            });

            const apiResponse = await loginUser({ email: values.emailAdmin, senha: values.senhaAdmin });

            const barbeariaCompativel = {
                id: apiResponse.usuario.barbeariaId,
                nome: apiResponse.usuario.nome,
                email: apiResponse.usuario.email,
                telefone: values.celular,
                fotoPerfil: apiResponse.usuario.fotoPerfil,
                endereco: apiResponse.usuario.endereco,
                stripeCurrentPeriodEnd: null
            };
            
            login({
                usuario: apiResponse.usuario,
                barbearia: barbeariaCompativel,
                token: apiResponse.token
            });

        } catch (error: any) {
            console.error("Falha no processo de registro:", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <main className="w-full flex justify-center py-10 px-4">
            <div className="w-full max-w-4xl">
                <TitlePage title="BarberPro" subtitle="Registre sua barbearia" />
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="mt-8">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-6 mb-8">
                            
                            <div className="flex flex-col gap-4">
                                <h2 className="text-lg font-semibold border-b pb-2">Dados do Administrador</h2>
                                <FormField
                                    control={form.control}
                                    name="nomeAdmin"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Seu Nome Completo</FormLabel>
                                            <FormControl>
                                                <Input placeholder="Digite seu nome..." {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="emailAdmin"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Seu E-mail de Acesso</FormLabel>
                                            <FormControl>
                                                <Input type="email" placeholder="ex: seuemail@email.com" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="senhaAdmin"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Sua Senha de Acesso</FormLabel>
                                            <FormControl>
                                                <div className="relative flex items-center">
                                                    <Input type={mostrarSenha ? "text" : "password"} placeholder="Crie uma senha forte..." {...field} />
                                                    <div className="absolute right-3 cursor-pointer" onClick={() => setMostrarSenha(!mostrarSenha)}>
                                                        {!mostrarSenha ? <EyeClosed className="w-5 h-5 text-muted-foreground"/> : <Eye className="w-5 h-5 text-muted-foreground"/>}
                                                    </div>
                                                </div>
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>

                            <div className="flex flex-col gap-4">
                                <h2 className="text-lg font-semibold border-b pb-2">Dados da Barbearia</h2>
                                <FormField
                                    control={form.control}
                                    name="nomeBarbearia"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Nome da Barbearia</FormLabel>
                                            <FormControl>
                                                <Input placeholder="Digite o nome do estabelecimento" {...field} />
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
                                            <FormLabel>Celular (WhatsApp)</FormLabel>
                                            <FormControl>
                                                <InputMask mask="(99) 99999-9999" value={field.value} onChange={field.onChange} onBlur={field.onBlur}>
                                                    {(inputProps: any) => <Input {...inputProps} placeholder="Digite o celular principal..." />}
                                                </InputMask>
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                
                                {/* ============================================ */}
                                {/* O CAMPO DE TELEFONE ADICIONADO DE VOLTA AQUI */}
                                <FormField
                                    control={form.control}
                                    name="telefone"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Telefone Fixo</FormLabel>
                                            <FormControl>
                                                <InputMask mask="(99) 9999-9999" value={field.value || ''} onChange={field.onChange} onBlur={field.onBlur}>
                                                    {(inputProps: any) => <Input {...inputProps} placeholder="Digite um telefone fixo..." />}
                                                </InputMask>
                                            </FormControl>
                                            <FormDescription>Opcional</FormDescription>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                {/* ============================================ */}

                                <FormField
                                    control={form.control}
                                    name="endereco"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Endereço da Barbearia</FormLabel>
                                            <FormControl>
                                                <Input placeholder="ex: Rua Brasil, Centro, 999" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                 <div className="flex gap-4">
                                    <FormField
                                        control={form.control}
                                        name="latitude"
                                        render={({ field }) => (
                                            <FormItem className="w-full">
                                                <FormLabel>Latitude</FormLabel>
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
                                            <FormItem className="w-full">
                                                <FormLabel>Longitude</FormLabel>
                                                <FormControl>
                                                    <Input placeholder="Digite a longitude..." {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="min-w-full flex justify-center ">
                            <Button
                                type="submit"
                                className="font-bold w-full md:w-1/2"
                                disabled={loading || usuario != null}
                            >
                                {loading ? <LoaderCircle className="animate-spin" /> : "Criar Barbearia e Acessar"}
                            </Button>
                        </div>
                    </form>
                </Form>
                <div className="text-center text-sm text-muted-foreground mt-4 mb-10">
                    Já tem uma conta? <Link href={"/login"}><span className="font-bold text-primary hover:underline">Faça seu login.</span></Link>
                </div>
            </div>
        </main>
    );
}