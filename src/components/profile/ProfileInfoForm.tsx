// src/app/profile/ProfileInfoForm.tsx
"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { useAuth } from "@/contexts/AuthContext";
import { useEffect } from "react";
import { profileFormSchema, ProfileFormValues } from "./profile.schema";
// ✨ 1. Importe um ícone de carregamento para usar no botão
import { Loader2 } from "lucide-react";
import { editNomeEmail } from "@/api/perfil/perfilServices";

export const ProfileInfoForm = () => {
    const { usuario, updateUsuario } = useAuth();

    const form = useForm<ProfileFormValues>({
        resolver: zodResolver(profileFormSchema),
        defaultValues: {
            username: "",
            email: "",
        },
        mode: "onChange",
    });

    // ✨ 2. Desestruture 'formState' para acessar isDirty e isSubmitting
    const { formState } = form;

    useEffect(() => {
        if (usuario) {
            form.reset({
                username: usuario.nome,
                email: usuario.email,
            });
        }
    }, [usuario, form.reset]);

    // ✨ 3. Transforme a função em async para simular uma chamada de API
    async function onSubmit(data: ProfileFormValues) {
        if (!usuario) return;

        const dadosAtualizados = await editNomeEmail(usuario.id, {
            nome: data.username,
            email: data.email
        });

        if (dadosAtualizados && dadosAtualizados.usuario) {
            updateUsuario(dadosAtualizados.usuario); // ATUALIZA O CONTEXTO AQUI!
        }

        // Opcional: após o sucesso, o formulário não está mais "dirty"
        // Você pode chamar form.reset com os novos dados para refletir isso
        form.reset(data);
    }

    return (
        <Form {...form}>
            {/* O resto do seu JSX permanece o mesmo */}
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                {/* Campo de Nome de Usuário */}
                <FormField
                    control={form.control}
                    name="username"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Nome de Usuário</FormLabel>
                            <FormControl>
                                <Input placeholder="Seu nome de usuário" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                {/* Campo de E-mail */}
                <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>E-mail</FormLabel>
                            <FormControl>
                                <Input placeholder="seu@email.com" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <div className="flex justify-end pt-4">
                    <Button
                        type="submit"
                        disabled={!formState.isDirty || formState.isSubmitting}
                    >
                        {formState.isSubmitting ? (
                            <>
                                <Loader2 className="h-4 w-4 animate-spin" />
                            </>
                        ) : (
                            "Salvar Informações"
                        )}
                    </Button>
                </div>
            </form>
        </Form>
    );
};