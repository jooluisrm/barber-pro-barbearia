import { BarberShop } from '@/types/barberShop';
import { createContext, useContext, useState, ReactNode } from 'react';

type BarbershopContextType = {
    barbershop: BarberShop | null;
    setBarbershop: any;
};

const BarbershopContext = createContext<BarbershopContextType | undefined>(undefined);

export const BarbershopContextProvider = ({ children }: { children: ReactNode }) => {
    const [barbershop, setBarbershop] = useState<BarberShop | null>(null);

    return (
        <BarbershopContext.Provider value={{ barbershop, setBarbershop }}>
            {children}
        </BarbershopContext.Provider>
    );
};

// Hook para usar o contexto com segurança
export const useBarbershopContext = () => {
    const context = useContext(BarbershopContext);
    if (!context) {
        throw new Error('useBarbershopContext deve ser usado dentro de um <BarbershopContextProvider>');
    }
    return context;
};
