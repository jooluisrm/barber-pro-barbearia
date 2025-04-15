import { OpeningHours } from '@/types/openingHours';
import { createContext, useContext, useState, ReactNode } from 'react';

type OpeningHoursContextType = {
    openingHours: OpeningHours[] | null;
    setOpeningHours: any;
};

const OpeningHoursContext = createContext<OpeningHoursContextType | undefined>(undefined);

export const OpeningHoursContextProvider = ({ children }: { children: ReactNode }) => {
    const [openingHours, setOpeningHours] = useState<OpeningHours[] | null>(null);

    return (
        <OpeningHoursContext.Provider value={{ openingHours, setOpeningHours }}>
            {children}
        </OpeningHoursContext.Provider>
    );
};

// Hook para usar o contexto com segurança
export const useOpeningHoursContext = () => {
    const context = useContext(OpeningHoursContext);
    if (!context) {
        throw new Error('useOpeningHoursContext deve ser usado dentro de um <OpeningHoursContextProvider>');
    }
    return context;
};
