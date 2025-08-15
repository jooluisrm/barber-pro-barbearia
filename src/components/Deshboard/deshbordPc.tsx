import { CircleUserRound, Gem, House, LogOut, NotebookPen, Store, UserRoundPen, Users } from "lucide-react";
import Link from "next/link";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "../ui/tooltip";
import Image from "next/image";
import imgIcon from "../../../public/assets/BarberProIcone-removebg-preview.png";
import { AlertLogout } from "../loginAndRegister/alertLogout";
import { ModeToggle } from "../buttonTheme";
import { AgendamentoPendente } from "@/types/agendamentos";
import { useAuth, Usuario } from "@/contexts/AuthContext";
import { DeshboardAvatarHover } from "./deshboardAvatarHover";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

type Props = {
    token: string | null;
    usuario: Usuario | null;
    rotaAtual: string;
    pendingCount: number;
}

export const DeshboardPc = ({ token, rotaAtual, usuario, pendingCount }: Props) => {

    return (
        <aside className="fixed inset-y-0 left-0 z-10 hidden w-14 border-r bg-background sm:flex flex-col">
            <nav className="flex flex-col items-center gap-4 px-2 py-5">
                <TooltipProvider>
                    <Link href={"#"} className="flex shrink-0 items-center justify-center">
                        {!usuario ? (
                            <Avatar className="w-12 h-12">
                                <AvatarImage src={"/favicon.png"} />
                                <AvatarFallback>
                                    BA
                                </AvatarFallback>
                            </Avatar>
                        ) : (
                            <DeshboardAvatarHover />
                        )
                        }

                        <span className="sr-only">Deshboard Avatar</span>
                    </Link>

                    <Tooltip>
                        <TooltipTrigger asChild>
                            <Link
                                href={`/`}
                                className={`
                                    flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground 
                                    ${rotaAtual === `/` && "dark:text-white text-black"}
                                    `}
                            >
                                <House className="h-5 w-5" />
                                <span className="sr-only">Início</span>
                            </Link>
                        </TooltipTrigger>
                        <TooltipContent side="right">Início</TooltipContent>
                    </Tooltip>

                    <Tooltip>
                        <TooltipTrigger asChild>
                            <Link
                                href={`/agendamentos`}
                                className={`
                                    relative flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground 
                                    ${rotaAtual === `/agendamentos` && "dark:text-white text-black"}
                                `}
                            >
                                <NotebookPen className="h-5 w-5" />
                                
                                {/* LÓGICA DO BADGE ATUALIZADA */}
                                {pendingCount > 0 && (
                                    <span className={`
                                        absolute -top-1 -right-1 w-5 h-5 bg-red-600 rounded-full
                                        flex items-center justify-center text-[10px] text-white
                                        ${rotaAtual === `/agendamentos` && "hidden"}
                                    `}>
                                        {pendingCount > 9 ? "9+" : pendingCount}
                                    </span>
                                )}
                                <span className="sr-only">Agendamentos</span>
                            </Link>
                        </TooltipTrigger>
                        <TooltipContent side="right">Agendamentos</TooltipContent>
                    </Tooltip>

                    {
                        usuario && usuario.role != `BARBEIRO` && (
                            <Tooltip>
                                <TooltipTrigger asChild>
                                    <Link
                                        href={"/barbeiros"}
                                        className={`
                                    flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground 
                                    ${rotaAtual === "/barbeiros" && "dark:text-white text-black"}
                                    `}
                                    >
                                        <Users className="h-5 w-5" />
                                        <span className="sr-only">Barbeiros</span>
                                    </Link>
                                </TooltipTrigger>
                                <TooltipContent side="right">Barbeiros</TooltipContent>
                            </Tooltip>
                        )
                    }

                    {
                        usuario && usuario.role != `BARBEIRO` && (
                            <Tooltip>
                                <TooltipTrigger asChild>
                                    <Link
                                        href={"/barbearia"}
                                        className={`
                                    flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground 
                                    ${rotaAtual === "/barbearia" && "dark:text-white text-black"}
                                    `}
                                    >
                                        <Store className="h-5 w-5" />
                                        <span className="sr-only">Barbearia</span>
                                    </Link>
                                </TooltipTrigger>
                                <TooltipContent side="right">Barbearia</TooltipContent>
                            </Tooltip>
                        )
                    }

                    <Tooltip>
                        <TooltipTrigger asChild>
                            <Link
                                href={"/perfil"}
                                className={`
                                    flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground 
                                    ${rotaAtual === "/perfil" && "dark:text-white text-black"}
                                    `}
                            >
                                <CircleUserRound className="h-5 w-5" />
                                <span className="sr-only">Perfil</span>
                            </Link>
                        </TooltipTrigger>
                        <TooltipContent side="right">Perfil</TooltipContent>
                    </Tooltip>

                    {
                        usuario && usuario.role != `BARBEIRO` && (
                            <Tooltip>
                                <TooltipTrigger asChild>
                                    <Link
                                        href={"/assinaturas"}
                                        className={`
                                    flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground 
                                    ${rotaAtual === "/assinaturas" && "dark:text-white text-black"}
                                    `}
                                    >
                                        <Gem className="h-5 w-5" />
                                        <span className="sr-only">Assinaturas</span>
                                    </Link>
                                </TooltipTrigger>
                                <TooltipContent side="right">Assinaturas</TooltipContent>
                            </Tooltip>
                        )
                    }

                </TooltipProvider>
            </nav>

            {
                token && (
                    <nav className="mt-auto flex flex-col items-center gap-4 px-2 py-5">
                        <TooltipProvider>
                            <Tooltip>
                                <TooltipTrigger asChild>
                                    <Link
                                        href={"#"}
                                        className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground"
                                    >
                                        <AlertLogout />
                                        <span className="sr-only">Sair</span>
                                    </Link>
                                </TooltipTrigger>
                                <TooltipContent side="right">Sair</TooltipContent>
                            </Tooltip>
                        </TooltipProvider>
                    </nav>
                )
            }
            <ModeToggle />

        </aside>
    );
}