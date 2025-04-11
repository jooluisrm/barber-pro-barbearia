import { Services } from '@/types/services';
import { createContext, useContext, useState, ReactNode } from 'react';

type ServiceContextType = {
    services: any;
    setServices: any;
};

const ServiceContext = createContext<ServiceContextType | undefined>(undefined);

export const ServiceContextProvider = ({ children }: { children: ReactNode }) => {
    const [services, setServices] = useState<Services[] | null>(null);

    return (
        <ServiceContext.Provider value={{ services, setServices }}>
            {children}
        </ServiceContext.Provider>
    );
};

// Hook para usar o contexto com segurança
export const useServiceContext = () => {
    const context = useContext(ServiceContext);
    if (!context) {
        throw new Error('useServiceContext deve ser usado dentro de um <ServiceContextProvider>');
    }
    return context;
};
