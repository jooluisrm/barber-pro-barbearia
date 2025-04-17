"use client"

import { useEffect, useState } from "react";
import { DialogEditOpeningHours } from "./dialogEditOpeningHours";
import { useOpeningHoursContext } from "@/contexts/OpeningHoursContext";
import { getNomeDiaSemana } from "@/utils/diaSemana";

export const ItemOpeningHours = () => {
    const { openingHours } = useOpeningHoursContext();
    const [diaSemanaHoje, setDiaSemanaHoje] = useState<Date | number>(4);

    useEffect(() => {
        const pegarDiaSemanaHoje = () => {
            const date = new Date();
            setDiaSemanaHoje(date.getDay());
        }

        pegarDiaSemanaHoje();
    }, []);

    return (
        <div>
            {
                openingHours && openingHours.map((item) => (
                    <div className={`flex justify-between items-center py-2 ${diaSemanaHoje === item.diaSemana && "font-bold"}`} key={item.id}>
                        <div className="flex items-center gap-2">
                            <h2>{getNomeDiaSemana(item.diaSemana)}</h2>
                            {
                                diaSemanaHoje === item.diaSemana &&
                                <span className={`text-sm text-green-600 border-2 border-green-700 rounded-full py-1 px-2 font-bold`}>Hoje</span>
                            }
                        </div>
                        <div className="flex items-center gap-2">
                            <span>{item.horaInicio} - {item.horaFim}</span>
                            <DialogEditOpeningHours itemOpeningHours={item}/>
                        </div>
                    </div>
                ))
            }
        </div>
    );
}