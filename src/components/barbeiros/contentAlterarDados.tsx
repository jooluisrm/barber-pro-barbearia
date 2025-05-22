import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "../ui/input";
import { AlertDialogHeader } from "../ui/alert-dialog";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "../ui/tooltip";
import { AlertDeletar } from "./alertDeletar";
import { Button } from "../ui/button";
import { Barbeiro } from "@/types/barbeiros";
import { useState } from "react";
import { editBarbeiro, getBarbeiros } from "@/api/barbeiros/barbeirosServices";
import { Clock } from "lucide-react";
import { loadItems } from "@/utils/loadItems";
import { useAuth } from "@/contexts/AuthContext";
import { useBarberContext } from "@/contexts/BarberContext";
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import InputMask from 'react-input-mask'


type Props = {
    barbeiro: Barbeiro;
    nextPage: VoidFunction;
    setOpen: (e: boolean) => void;
}

const formSchema = z.object({
    nome: z.string().min(2, 'Precisa ter minimo 2 caracteres!'),
    email: z.string().email('E-mail inválido!'),
    telefone: z
        .string()
        .regex(/^\(\d{2}\) \d{5}-\d{4}$/, {
            message: 'Celular inválido (ex: (11) 91234-5678)',
        }),
});

export const ContentAlterarDados = ({ barbeiro, nextPage, setOpen }: Props) => {
    const { barbearia } = useAuth();
    const { setBarbeiros } = useBarberContext();

    const [inputNome, setInputNome] = useState(barbeiro.nome);
    const [inputEmail, setInputEmail] = useState(barbeiro.email);
    const [inputTelefone, setInputTelefone] = useState(barbeiro.telefone);


    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: { nome: barbeiro.nome, email: barbeiro.email, telefone: barbeiro.telefone },
    })

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        const { nome, email, telefone } = values
        const done = await editBarbeiro(barbeiro.id, {nome, email, telefone});

        if(done) {
            setOpen(false);
            await loadItems(barbearia, getBarbeiros, setBarbeiros);
        }
        console.log(values);
    }

    const handleEdit = async () => {
        const done = await editBarbeiro(barbeiro.id, { nome: inputNome, email: inputEmail, telefone: inputTelefone });
        if (done) {
            setOpen(false);
            await loadItems(barbearia, getBarbeiros, setBarbeiros);
        }
    }

    return (
        <>
            <AlertDialogHeader>
                <DialogTitle>Editar Barbeiro</DialogTitle>
                <DialogDescription>
                    Atualize as informações do profissional abaixo
                </DialogDescription>
            </AlertDialogHeader>
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

                        <div className="block">
                            <TooltipProvider>
                                <Tooltip>
                                    <TooltipTrigger>
                                        <Button variant="outline" onClick={() => nextPage()}><Clock /></Button>
                                    </TooltipTrigger>
                                    <TooltipContent>
                                        Gerenciar Horários
                                    </TooltipContent>
                                </Tooltip>
                            </TooltipProvider>
                        </div>

                        <div className="mt-5 flex justify-between">
                            <AlertDeletar barbeiro={barbeiro} />
                            <Button className="font-bold" type="submit">Salvar Alterações</Button>
                        </div>
                    </form>
                </Form>
            </main>
        </>
    );
}