// src/app/profile/profile.schema.ts
import { z } from "zod";

// Schema do formulário de perfil (já existente)
export const profileFormSchema = z.object({
  username: z.string()
    .min(3, { message: "O nome de usuário deve ter pelo menos 3 caracteres." })
    .max(30, { message: "O nome de usuário não pode ter mais de 30 caracteres." }),
  email: z.string()
    .email({ message: "Por favor, insira um endereço de e-mail válido." }),
});

export type ProfileFormValues = z.infer<typeof profileFormSchema>;


// ✨ NOVO: Schema para o formulário de segurança
export const securityFormSchema = z.object({
    currentPassword: z.string().min(1, {
        message: "A senha atual é obrigatória.",
    }),
    newPassword: z.string().min(6, {
        message: "A nova senha deve ter no mínimo 6 caracteres.",
    }),
    confirmPassword: z.string()
})
// Validação customizada para garantir que as senhas coincidem
.refine((data) => data.newPassword === data.confirmPassword, {
    message: "As senhas não coincidem.",
    path: ["confirmPassword"], // O erro aparecerá no campo de confirmação
});

export type SecurityFormValues = z.infer<typeof securityFormSchema>;