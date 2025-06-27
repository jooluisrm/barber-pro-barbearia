// src/hooks/useCurrentDate.ts
import { useState, useEffect } from 'react';

// Função auxiliar para formatar a data, mantida fora do hook para não ser recriada
const formatDate = () => {
    const hoje = new Date();
    let diaSemana = new Intl.DateTimeFormat('pt-BR', { weekday: 'long' }).format(hoje);

    return {
        diaSemana: diaSemana.charAt(0).toUpperCase() + diaSemana.slice(1),
        diaDoMes: hoje.getDate(),
        nomeDoMes: new Intl.DateTimeFormat('pt-BR', { month: 'long' }).format(hoje),
        ano: hoje.getFullYear(),
    };
};

export const useCurrentDate = () => {
    const [dateParts, setDateParts] = useState(formatDate());

    useEffect(() => {
        // Define um intervalo para verificar a data a cada minuto.
        // Isso garante que a data mude se o usuário ficar na página durante a meia-noite.
        const intervalId = setInterval(() => {
            setDateParts(formatDate());
        }, 60000); // 60000 ms = 1 minuto

        // Função de limpeza para remover o intervalo quando o componente for desmontado
        return () => clearInterval(intervalId);
    }, []); // O array vazio [] garante que o efeito rode apenas uma vez (montagem/desmontagem)

    return dateParts;
};