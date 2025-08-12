import { Button } from "../ui/button";
import { Sheet, SheetContent, SheetTrigger } from "../ui/sheet";
import Link from "next/link";
import Image from "next/image";
import imgIcon from "../../../public/assets/BarberProIcone-removebg-preview.png";
import { CircleUserRound, Gem, House, LogOut, NotebookPen, Package, PanelBottom, Store, Users } from "lucide-react";
import { AlertLogout } from "../loginAndRegister/alertLogout";
import { AgendamentoPendente } from "@/types/agendamentos";
import { Usuario } from "@/contexts/AuthContext";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

type Props = {
    token: string | null;
    usuario: Usuario | null;
    rotaAtual: string;
    agendamentosPendentes: AgendamentoPendente[] | null;
}

export const DeshboardMobile = ({ token, rotaAtual, agendamentosPendentes, usuario }: Props) => {
    return (
        <div className="sm:hidden flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
            <header className="sticky top-0 z-30 flex h-14 items-center px-4 border-b bg-background gap-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6">
                <Sheet>
                    <SheetTrigger asChild>
                        <Button size={"icon"} variant={"outline"} className="sm:hidden">
                            <PanelBottom className="w-5 h-5" />
                            <span className="sr-only">Abrir / Fechar menu</span>
                        </Button>
                    </SheetTrigger>

                    <SheetContent side={"left"} className="sm:max-w-x">
                        <nav className="grid gap-6 text-lg font-medium">
                            <Link
                                href={"#"}
                                className={`flex h-14 w-14 rounded-full text-lg items-center justify-center text-primary-foreground md:text-base gap-2`}
                                prefetch={false}
                            >
                                <Avatar className="w-14 h-14">
                                    <AvatarImage src={`${usuario?.fotoPerfil ? usuario.fotoPerfil : `/favicon.png`}`} />
                                    <AvatarFallback>{usuario?.nome.substring(0, 2).toUpperCase()}</AvatarFallback>
                                </Avatar>
                                <span className="sr-only">Logo do projeto</span>
                            </Link>

                            <Link
                                href={"/"}
                                className={`
                                    flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground transition-all
                                    ${rotaAtual === "/" && "dark:text-white text-black"}
                                    `}
                                prefetch={false}
                            >
                                <House className="h-5 w-5" />
                                Início
                            </Link>

                            <Link
                                href={"/agendamentos"}
                                className={`
                                    relative flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground transition-all
                                    ${rotaAtual === "/agendamentos" && "dark:text-white text-black"}
                                    `}
                                prefetch={false}
                            >
                                <NotebookPen className="h-5 w-5" />
                                <span
                                    className={`
                                    absolute -right-1 w-5 h-5 bg-red-600 rounded-full
                                    flex items-center justify-center text-[10px] text-white
                                    ${rotaAtual === "/agendamentos" && "hidden"}
                                    ${agendamentosPendentes === null && "hidden"}
                                    ${agendamentosPendentes && agendamentosPendentes.length <= 0 && "hidden"}
                                    `}
                                >
                                    {agendamentosPendentes && (agendamentosPendentes.length > 9 ? "9+" : agendamentosPendentes.length)}
                                </span>
                                Agendamentos
                            </Link>

                            {
                                usuario?.role === "ADMIN" && (
                                    <Link
                                        href={"/barbeiros"}
                                        className={`
                                    flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground transition-all
                                    ${rotaAtual === "/barbeiros" && "dark:text-white text-black"}
                                    `}
                                        prefetch={false}
                                    >
                                        <Users className="h-5 w-5" />
                                        Barbeiros
                                    </Link>
                                )
                            }

                            {
                                usuario?.role === "ADMIN" && (
                                    <Link
                                        href={"/barbearia"}
                                        className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground transition-all"
                                        prefetch={false}
                                    >
                                        <Store className="h-5 w-5" />
                                        Barbearia
                                    </Link>
                                )
                            }

                            <Link
                                href={"/perfil"}
                                className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground transition-all"
                                prefetch={false}
                            >
                                <CircleUserRound className="h-5 w-5" />
                                Perfil
                            </Link>

                            {
                                usuario?.role === "ADMIN" && (
                                    <Link
                                        href={"/assinaturas"}
                                        className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground transition-all"
                                        prefetch={false}
                                    >
                                        <Gem className="h-5 w-5" />
                                        Assinaturas
                                    </Link>
                                )
                            }


                            {
                                token && (
                                    <AlertLogout />
                                )
                            }

                        </nav>
                    </SheetContent>
                </Sheet>
                <h2>Menu</h2>
            </header>
        </div>
    );
}