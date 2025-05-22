"use client"

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
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import InputMask from 'react-input-mask'

const formSchema = z.object({
    nome: z.string().min(2, 'Precisa ter minimo 2 caracteres!'),
    telefone: z
        .string()
        .regex(/^\(\d{2}\) \d{5}-\d{4}$/, {
            message: 'Celular inválido (ex: (11) 91234-5678)',
        }),
    email: z.string().email('E-mail inválido!'),
    senha: z.string().min(6, 'Precisa ter minimo 6 caracteres!')
});


export const DialogAddBarbeiro = () => {
    const { setBarbeiros } = useBarberContext();
    const { barbearia } = useAuth();

    const [isOpen, setIsOpen] = useState(false);
    const [mostrarSenha, setMostrarSenha] = useState(false);

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            nome: "", telefone: "", email: "", senha: ""
        },
    });

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        if (!barbearia) return;
        const { nome, telefone, email, senha } = values;
        const  barbeariaId: any = barbearia.id;
        const sucesso = await registerBarbeiro({ nome, telefone, email, senha, barbeariaId });
        console.log(values)
        if(sucesso) {
            handleConfetti();
            await loadItems(barbearia, getBarbeiros, setBarbeiros);
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
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-5">
                            <FormField
                                control={form.control}
                                name="nome"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Nome Completo:</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Nome do barbeiro" {...field} />
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
                                name="email"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>E-mail:</FormLabel>
                                        <FormControl>
                                            <Input placeholder="E-mail do barbeiro" {...field} />
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
                                                    placeholder="Criar senha para o barbeiro"
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
                            <Button type="submit" className="mt-5 font-bold">Submit</Button>
                        </form>
                    </Form>
                </main>
            </DialogContent>
        </Dialog>
    );
}