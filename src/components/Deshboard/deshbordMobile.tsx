import { Button } from "../ui/button";
import { Sheet, SheetContent, SheetTrigger } from "../ui/sheet";
import Link from "next/link";
import Image from "next/image";
import imgIcon from "../../../public/assets/BarberProIcone-removebg-preview.png";
import { Gem, House, LogOut, NotebookPen, Package, PanelBottom, Store, Users } from "lucide-react";
import { AlertLogout } from "../loginAndRegister/alertLogout";

type Props = {
    token: string | null;
    rotaAtual: string;
}

export const DeshboardMobile = ({ token, rotaAtual }: Props) => {
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
                                className={`flex h-14 w-14 bg-primary rounded-full text-lg items-center justify-center text-primary-foreground md:text-base gap-2`}
                                prefetch={false}
                            >
                                <Image src={imgIcon} alt="icone" className="transition-all" />
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
                                    flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground transition-all
                                    ${rotaAtual === "/agendamentos" && "dark:text-white text-black"}
                                    `}
                                prefetch={false}
                            >
                                <NotebookPen className="h-5 w-5" />
                                Agendamentos
                            </Link>

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

                            <Link
                                href={"/barbearia"}
                                className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground transition-all"
                                prefetch={false}
                            >
                                <Store className="h-5 w-5" />
                                Barbearia
                            </Link>

                            <Link
                                href={"/assinaturas"}
                                className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground transition-all"
                                prefetch={false}
                            >
                                <Gem className="h-5 w-5" />
                                Assinaturas
                            </Link>


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