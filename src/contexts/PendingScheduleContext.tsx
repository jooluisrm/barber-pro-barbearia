"use client";

import { AgendamentoPendente, Agendamentos } from '@/types/agendamentos';
import { createContext, useContext, useState, ReactNode } from 'react';

type PendingScheduleContextType = {
    agendamentosPendentes: AgendamentoPendente[] | null;
    setAgendamentosPendentes: React.Dispatch<React.SetStateAction<AgendamentoPendente[] | null>>;
};

const PendingScheduleContext = createContext<PendingScheduleContextType | undefined>(undefined);

export const PendingScheduleContextProvider = ({ children }: { children: ReactNode }) => {
    const [agendamentosPendentes, setAgendamentosPendentes] = useState<AgendamentoPendente[] | null>(null);

    return (
        <PendingScheduleContext.Provider value={{ agendamentosPendentes, setAgendamentosPendentes }}>
            {children}
        </PendingScheduleContext.Provider>
    );
};

// Hook para usar o contexto com segurança
export const usePendingScheduleContext = () => {
    const context = useContext(PendingScheduleContext);
    if (!context) {
        throw new Error('usePendingScheduleContext deve ser usado dentro de um <PendingScheduleContextProvider>');
    }
    return context;
};
