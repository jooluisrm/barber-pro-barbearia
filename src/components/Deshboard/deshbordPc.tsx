import { Gem, House, LogOut, NotebookPen, Store, Users } from "lucide-react";
import Link from "next/link";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "../ui/tooltip";
import Image from "next/image";
import imgIcon from "../../../public/assets/BarberProIcone-removebg-preview.png";
import { AlertLogout } from "../loginAndRegister/alertLogout";
import { ModeToggle } from "../buttonTheme";

type Props = {
    token: string | null;
    rotaAtual: string;
}

export const DeshboardPc = ({ token, rotaAtual }: Props) => {
    return (
        <aside className="fixed inset-y-0 left-0 z-10 hidden w-14 border-r bg-background sm:flex flex-col">
            <nav className="flex flex-col items-center gap-4 px-2 py-5">
                <TooltipProvider>
                    <Link href={"#"} className="flex h-12 w-12 shrink-0 items-center dark:bg-primary justify-center text-primary-foreground rounded-full border">
                        <Image src={imgIcon} alt="icone" />
                        <span className="sr-only">Deshboard Avatar</span>
                    </Link>

                    <Tooltip>
                        <TooltipTrigger asChild>
                            <Link
                                href={"/"}
                                className={`
                                    flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground 
                                    ${rotaAtual === "/" && "dark:text-white text-black"}
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
                                href={"/agendamentos"}
                                className={`
                                    flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground 
                                    ${rotaAtual === "/agendamentos" && "dark:text-white text-black"}
                                    `}
                            >
                                <NotebookPen className="h-5 w-5" />
                                <span className="sr-only">Agendamentos</span>
                            </Link>
                        </TooltipTrigger>
                        <TooltipContent side="right">Agendamentos</TooltipContent>
                    </Tooltip>

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