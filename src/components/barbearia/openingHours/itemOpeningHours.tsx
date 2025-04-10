"use client"

import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { DialogEditOpeningHours } from "./dialogEditOpeningHours";

export const ItemOpeningHours = () => {

    const [diaSemanaHoje, setDiaSemanaHoje] = useState<Date | number>(4);

    useEffect(() => {
        const pegarDiaSemanaHoje = () => {
            const date = new Date();
            setDiaSemanaHoje(date.getDay());
        }

        pegarDiaSemanaHoje();
    }, []);

    return (
        <div className={`flex justify-between items-center py-2 ${diaSemanaHoje === 4 && "font-bold"}`}>
            <div className="flex items-center gap-2">
                <h2>Segunda-Feira</h2>
                {
                    diaSemanaHoje === 4 &&
                    <span className={`text-sm text-green-600 border-2 border-green-700 rounded-full py-1 px-2 font-bold`}>Hoje</span>
                }
            </div>
            <div className="flex items-center gap-2">
                <span>08:00 - 18:00</span>
                <DialogEditOpeningHours />
            </div>
        </div>
    );
}