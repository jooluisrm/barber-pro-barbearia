"use client";

import { useAuth } from "@/contexts/AuthContext";
import { DeshboardMobile } from "./deshbordMobile";
import { DeshboardPc } from "./deshbordPc";
import { usePathname } from "next/navigation"; // Adicionando usePathname
import { useEffect, useState } from "react";
import { usePendingScheduleContext } from "@/contexts/PendingScheduleContext";

export const Deshboard = () => {
    const {agendamentosPendentes} = usePendingScheduleContext();

    const [rotaAtual, setRotaAtual] = useState("");
    const { token } = useAuth();
    const pathname = usePathname(); // Pega o caminho da URL

    useEffect(() => {
        console.log("Caminho atual:", pathname); // Exibe a rota atual no console
        setRotaAtual(pathname);
    }, [pathname]); // Executa o efeito sempre que a rota mudar

    return (
        <div className="flex w-full flex-col bg-muted/40">
            <DeshboardPc token={token} rotaAtual={rotaAtual} agendamentosPendentes={agendamentosPendentes}/>
            <DeshboardMobile token={token} rotaAtual={rotaAtual} agendamentosPendentes={agendamentosPendentes}/>
        </div>
    );
};
