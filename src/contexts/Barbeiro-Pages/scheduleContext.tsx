"use client"

import { Agendamentos } from '@/types/agendamentos';
import { createContext, useContext, useState, ReactNode } from 'react';

type ScheduleContextType = {
    agendamentos: Agendamentos[] | null;
    setAgendamentos: any;
};

const ScheduleContext = createContext<ScheduleContextType | undefined>(undefined);

export const ScheduleContextProvider = ({ children }: { children: ReactNode }) => {
    const [agendamentos, setAgendamentos] = useState<Agendamentos[] | null>(null);

    return (
        <ScheduleContext.Provider value={{ agendamentos, setAgendamentos }}>
            {children}
        </ScheduleContext.Provider>
    );
};

// Hook para usar o contexto com segurança
export const useScheduleContext = () => {
    const context = useContext(ScheduleContext);
    if (!context) {
        throw new Error('useScheduleContext deve ser usado dentro de um <ScheduleContextProvider>');
    }
    return context;
};
