// src/hooks/useLiveTime.ts

import { useState, useEffect } from 'react';

// Este hook gerencia a lógica de atualizar o tempo a cada segundo.
export const useLiveTime = () => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    // Define um intervalo para atualizar o tempo a cada 1000ms (1 segundo)
    const intervalId = setInterval(() => {
      setTime(new Date());
    }, 1000);

    // Função de limpeza: remove o intervalo quando o componente que usa o hook é desmontado.
    // Isso é VITAL para evitar vazamentos de memória.
    return () => clearInterval(intervalId);
  }, []); // O array vazio [] garante que o efeito rode apenas uma vez (na montagem)

  return time;
};