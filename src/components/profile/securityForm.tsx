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
import { useAuth } from "@/contexts/AuthContext";
import { editSenha } from "@/api/perfil/perfilServices";

export const SecurityForm = () => {

    const { usuario, logout } = useAuth();

    const form = useForm<SecurityFormValues>({
        resolver: zodResolver(securityFormSchema),
        defaultValues: {
            currentPassword: "",
            newPassword: "",
            confirmPassword: "",
        },
        mode: "onChange",
    });

    async function onSubmit(data: SecurityFormValues) {
        if (!usuario) return;
        const success = await editSenha(usuario.id, {
            currentPassword: data.currentPassword,
            newPassword: data.newPassword
        });
        if (success) {
            setTimeout(() => logout(), 1000)
        }
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
                            <FormMessage />
                        </FormItem>
                    )}
                />

                {/* Aviso sobre logout */}
                <p className="text-sm text-muted-foreground">
                    Ao alterar sua senha, você será deslogado imediatamente por motivos de segurança.
                </p>

                <div className="flex justify-end pt-4">
                    <Button type="submit" variant="destructive">
                        Alterar Senha
                    </Button>
                </div>
            </form>
        </Form>

    );
};