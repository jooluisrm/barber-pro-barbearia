// seu-arquivo/HeaderPage.tsx
"use client"

import { LiveClock } from "../home/liveClock";
import { useCurrentDate } from "@/hooks/useCurrentDate"; // ✨ 1. Importe o novo hook

type Props = {
    title?: string;
    subTitle: string;
    usuarioName?: string;
    barbeariaName?: string;
    role?: string;
}

export const HeaderPage = ({ subTitle, title, usuarioName, barbeariaName, role }: Props) => {
    
    // ✨ 1. Use o hook para obter as partes da data de forma otimizada
    const { diaSemana, diaDoMes, nomeDoMes, ano } = useCurrentDate();

    // ✨ 2. Lógica de renderização mais limpa para o título
    const renderTitle = () => {
        if (usuarioName) {
            return (
                <h1 className="text-xl md:text-2xl">
                    Bem-vindo(a) ao <span className="font-bold">BarberPro</span>, <span className="font-bold text-blue-500 text-nowrap">{usuarioName}</span>!
                </h1>
            );
        }
        return (
            <h1 className="text-2xl sm:text-3xl font-semibold">
                Painel de <span className="text-blue-500">{title}</span>
            </h1>
        );
    };

    // ✨ 3. Garante que o separador só apareça se ambas as props existirem
    const establishmentInfo = [barbeariaName, role].filter(Boolean).join(' - ');

    return (
        <div className="pb-10 pt-5 flex flex-col-reverse md:flex-row md:justify-between md:items-center">
            <div>
                {establishmentInfo && (
                    <h2 className="text-sm text-muted-foreground">{establishmentInfo}</h2>
                )}
                
                {renderTitle()}
                
                <p className="text-muted-foreground">{subTitle}</p>
            </div>

            <div className="flex flex-col items-start md:items-end mb-4 md:mb-0">
                <span className="font-medium text-lg">
                    {diaSemana}, <span className="font-bold text-blue-500">{diaDoMes} de {nomeDoMes}</span> de {ano}
                </span>
                <span className="text-sm font-bold text-blue-500">
                    <LiveClock />
                </span>
            </div>
        </div>
    );
}