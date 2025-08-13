import {
    HoverCard,
    HoverCardContent,
    HoverCardTrigger,
} from "@/components/ui/hover-card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { useAuth, Usuario } from "@/contexts/AuthContext";
import { Label } from "../ui/label";
import { Gem } from "lucide-react";

type Props = {
    usuario: Usuario | null;
};

export const DeshboardAvatarHover = () => {
    const { usuario, barbearia } = useAuth();
    if (!usuario || !barbearia) return;

    const getStatusAssinatura = () => {
        const end = usuario.barbearia?.stripeCurrentPeriodEnd;
        if (!end) return { label: "Não contratada", variant: "outline" as const };

        const endDate = new Date(end);
        const now = new Date();

        if (endDate >= now) {
            return { label: "Ativa", variant: "success" as const };
        }
        return { label: "Vencida", variant: "destructive" as const };
    };

    const assinaturaStatus = getStatusAssinatura();

    return (
        <HoverCard>
            <HoverCardTrigger>
                <Avatar className="w-12 h-12 cursor-pointer border border-gray-200 dark:border-gray-700 shadow-sm">
                    <AvatarImage src={usuario.fotoPerfil || "/favicon.png"} />
                    <AvatarFallback>
                        {usuario.nome.substring(0, 2).toUpperCase()}
                    </AvatarFallback>
                </Avatar>
            </HoverCardTrigger>

            <HoverCardContent
                className="
                    w-72 p-4 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700
                    transition-colors duration-200 ml-14 -mt-5
                "
            >
                <div className="flex items-center gap-4">
                    <Avatar className="w-16 h-16">
                        <AvatarImage src={usuario.fotoPerfil || "/favicon.png"} />
                        <AvatarFallback>
                            {usuario.nome.substring(0, 2).toUpperCase()}
                        </AvatarFallback>
                    </Avatar>

                    <div className="flex flex-col overflow-x-hidden">
                        <span className="text-lg font-semibold text-gray-900 truncate dark:text-gray-100 text-nowrap">
                            {usuario.nome}
                        </span>
                        <span className="text-sm text-gray-500 dark:text-gray-400 truncate text-nowrap">
                            {usuario.email}
                        </span>
                        <Badge
                            variant={usuario.role === "ADMIN" ? "default" : "secondary"}
                            className="mt-1 w-fit"
                        >
                            {usuario.role}
                        </Badge>
                    </div>
                </div>

                <div className="mt-4 border-t border-gray-200 dark:border-gray-700 pt-3 space-y-1 text-sm text-gray-700 dark:text-gray-300 overflow-x-hidden">
                    <p className="text-nowrap truncate flex items-center gap-4 pb-2">
                        <Avatar className="w-16 h-16">
                            <AvatarImage src={barbearia.fotoPerfil || "/favicon.png"} />
                            <AvatarFallback>
                                {barbearia.nome.substring(0, 2).toUpperCase()}
                            </AvatarFallback>
                        </Avatar>
                        <div className="overflow-x-hidden flex flex-col">
                            <span className="text-lg font-semibold text-gray-900 truncate dark:text-gray-100 text-nowrap">
                                {barbearia.nome}
                            </span>
                            <span className="text-sm text-gray-500 dark:text-gray-400 truncate text-nowrap pb-2">
                                {barbearia.endereco}
                            </span>
                            {usuario.role === "ADMIN" && (
                                <div className="flex items-center gap-2">
                                    <Label className="flex items-center gap-1">
                                        <Badge variant={assinaturaStatus.variant as any}>{assinaturaStatus.label}</Badge>
                                    </Label>
                                    {usuario.barbearia?.stripeCurrentPeriodEnd && (
                                        <span className="text-xs text-gray-500 dark:text-gray-400">
                                            até {new Date(usuario.barbearia.stripeCurrentPeriodEnd).toLocaleDateString()}
                                        </span>
                                    )}
                                </div>
                            )}
                        </div>
                    </p>

                </div>
            </HoverCardContent>
        </HoverCard>
    );
};
