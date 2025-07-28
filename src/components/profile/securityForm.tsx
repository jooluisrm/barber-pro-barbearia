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
import { Eye, EyeClosed } from "lucide-react";
import { useState } from "react";

export const SecurityForm = () => {

    const { usuario, logout } = useAuth();
    const [mostrarSenha, setMostrarSenha] = useState(false);
    const [mostrarSenha2, setMostrarSenha2] = useState(false);
    const [mostrarSenha3, setMostrarSenha3] = useState(false);

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
                                <div className="relative flex items-center">
                                    <Input type={`${mostrarSenha ? "text" : "password"}`} {...field} />
                                    <div className="absolute right-3 cursor-pointer" onClick={() => setMostrarSenha(!mostrarSenha)}>
                                        {!mostrarSenha ? <EyeClosed className="h-5 w-5 text-muted-foreground" /> : <Eye className="h-5 w-5 text-muted-foreground" />}
                                    </div>
                                </div>
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
                                <div className="relative flex items-center">
                                    <Input type={`${mostrarSenha2 ? "text" : "password"}`} {...field} />
                                    <div className="absolute right-3 cursor-pointer" onClick={() => setMostrarSenha2(!mostrarSenha2)}>
                                        {!mostrarSenha2 ? <EyeClosed className="h-5 w-5 text-muted-foreground" /> : <Eye className="h-5 w-5 text-muted-foreground" />}
                                    </div>
                                </div>
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
                                <div className="relative flex items-center">
                                    <Input type={`${mostrarSenha3 ? "text" : "password"}`} {...field} />
                                    <div className="absolute right-3 cursor-pointer" onClick={() => setMostrarSenha3(!mostrarSenha3)}>
                                        {!mostrarSenha3 ? <EyeClosed className="h-5 w-5 text-muted-foreground" /> : <Eye className="h-5 w-5 text-muted-foreground" />}
                                    </div>
                                </div>
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