"use client"

import { Barbeiro } from '@/types/barbeiros';
import { createContext, useContext, useState, ReactNode } from 'react';

type BarberContextType = {
    barbeiros: Barbeiro[] | null;
    setBarbeiros: any;
};

const BarberContext = createContext<BarberContextType | undefined>(undefined);

export const BarberContextProvider = ({ children }: { children: ReactNode }) => {
    const [barbeiros, setBarbeiros] = useState<Barbeiro[] | null>(null);

    return (
        <BarberContext.Provider value={{ barbeiros, setBarbeiros }}>
            {children}
        </BarberContext.Provider>
    );
};

// Hook para usar o contexto com segurança
export const useBarberContext = () => {
    const context = useContext(BarberContext);
    if (!context) {
        throw new Error('useBarberContext deve ser usado dentro de um <BarberContextProvider>');
    }
    return context;
};
