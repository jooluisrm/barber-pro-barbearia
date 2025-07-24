// src/app/profile/SecurityForm.tsx
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
import { SecurityFormValues, securityFormSchema } from "./profile.schema";

export const SecurityForm = () => {
    const form = useForm<SecurityFormValues>({
        resolver: zodResolver(securityFormSchema),
        defaultValues: {
            currentPassword: "",
            newPassword: "",
            confirmPassword: "",
        },
        mode: "onChange",
    });

    function onSubmit(data: SecurityFormValues) {
        // TODO: Chamar a API para alterar a senha.
        // Você enviaria apenas data.currentPassword e data.newPassword.
        console.log("Dados para alterar a senha:", {
            currentPassword: data.currentPassword,
            newPassword: data.newPassword
        });

        // Limpa os campos do formulário após a submissão bem-sucedida
        form.reset();
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                {/* Campo de Senha Atual */}
                <FormField
                    control={form.control}
                    name="currentPassword"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Senha Atual</FormLabel>
                            <FormControl>
                                <Input type="password" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                {/* Campo de Nova Senha */}
                <FormField
                    control={form.control}
                    name="newPassword"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Nova Senha</FormLabel>
                            <FormControl>
                                <Input type="password" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                {/* Campo de Confirmar Nova Senha */}
                <FormField
                    control={form.control}
                    name="confirmPassword"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Confirmar Nova Senha</FormLabel>
                            <FormControl>
                                <Input type="password" {...field} />
                            </FormControl>
                            <FormMessage /> {/* Exibirá o erro "As senhas não coincidem" */}
                        </FormItem>
                    )}
                />
                <div className="flex justify-end pt-4">
                    <Button type="submit" variant="destructive">
                        Alterar Senha
                    </Button>
                </div>
            </form>
        </Form>
    );
};