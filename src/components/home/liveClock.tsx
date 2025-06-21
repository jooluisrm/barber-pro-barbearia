// src/components/dashboard/LiveClock.tsx

"use client"

import { useLiveTime } from "@/hooks/useLiveTime"; // Ajuste o caminho se necessário

export const LiveClock = () => {
    const time = useLiveTime();

    // Formata as horas e minutos, garantindo dois dígitos
    const hours = time.getHours().toString().padStart(2, '0');
    const minutes = time.getMinutes().toString().padStart(2, '0');

    return (
        <div className="flex items-center text-sm font-bold text-blue-500 dark:text-blue-400">
            {/* Usamos a chave 'key' para forçar o React a recriar o elemento */}
            {/* e disparar a animação a cada minuto. */}
            <span key={hours} className="animate-fade-in-up">{hours}</span>
            <span className="animate-pulse mx-0.5">:</span>
            <span key={minutes} className="animate-fade-in-up">{minutes}</span>
        </div>
    );
};