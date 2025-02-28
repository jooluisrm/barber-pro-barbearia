import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet"
import { House, LogOut, NotebookPen, Package, PanelBottom, Store, Users } from "lucide-react";
import { Button } from "../ui/button";
import Link from "next/link";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "../ui/tooltip";

export const Deshboard = () => {
    return (
        <div className="flex w-full flex-col bg-muted/40">

            <aside className="fixed inset-y-0 left-0 z-10 hidden w-14 border-r bg-background sm:flex flex-col">
                <nav className="flex flex-col items-center gap-4 px-2 py-5">
                    <TooltipProvider>
                        <Link href={"#"} className="flex h-9 w-9 shrink-0 items-center justify-center bg-primary text-primary-foreground rounded-full">
                            <Package className="h-4 w-4" />
                            <span className="sr-only">Deshboard Avatar</span>
                        </Link>

                        <Tooltip>
                            <TooltipTrigger asChild>
                                <Link
                                    href={"#"}
                                    className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground"
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
                                    href={"#"}
                                    className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground"
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
                                    href={"#"}
                                    className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground"
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
                                    href={"#"}
                                    className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground"
                                >
                                    <Store className="h-5 w-5" />
                                    <span className="sr-only">Barbearia</span>
                                </Link>
                            </TooltipTrigger>
                            <TooltipContent side="right">Barbearia</TooltipContent>
                        </Tooltip>

                    </TooltipProvider>
                </nav>

                <nav className="mt-auto flex flex-col items-center gap-4 px-2 py-5">
                    <TooltipProvider>
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <Link
                                    href={"#"}
                                    className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground"
                                >
                                    <LogOut className="h-5 w-5 text-red-500" />
                                    <span className="sr-only">Sair</span>
                                </Link>
                            </TooltipTrigger>
                            <TooltipContent side="right">Sair</TooltipContent>
                        </Tooltip>
                    </TooltipProvider>
                </nav>

            </aside>

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
                                    className="flex h-10 w-10 bg-primary rounded-full text-lg items-center justify-center text-primary-foreground md:text-base gap-2"
                                    prefetch={false}
                                >
                                    <Package className="h-5 w-5 transition-all" />
                                    <span className="sr-only">Logo do projeto</span>
                                </Link>

                                <Link
                                    href={"#"}
                                    className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground transition-all"
                                    prefetch={false}
                                >
                                    <House className="h-5 w-5" />
                                    Início
                                </Link>

                                <Link
                                    href={"#"}
                                    className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground transition-all"
                                    prefetch={false}
                                >
                                    <NotebookPen className="h-5 w-5" />
                                    Agendamentos
                                </Link>

                                <Link
                                    href={"#"}
                                    className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground transition-all"
                                    prefetch={false}
                                >
                                    <Users className="h-5 w-5" />
                                    Barbeiros
                                </Link>

                                <Link
                                    href={"#"}
                                    className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground transition-all"
                                    prefetch={false}
                                >
                                    <Store className="h-5 w-5" />
                                    Barbearia
                                </Link>


                            </nav>
                        </SheetContent>
                    </Sheet>
                    <h2>Menu</h2>
                </header>
            </div>

        </div>
    );
}
