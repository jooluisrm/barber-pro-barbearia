import { SocialMedia } from '@/types/socialMedia';
import { createContext, useContext, useState, ReactNode } from 'react';

type SocialContextType = {
    socialMedia: SocialMedia[] | null;
    setSocialMedia: any;
};

const SocialContext = createContext<SocialContextType | undefined>(undefined);

export const SocialContextProvider = ({ children }: { children: ReactNode }) => {
    const [socialMedia, setSocialMedia] = useState<SocialMedia[] | null>(null);

    return (
        <SocialContext.Provider value={{ socialMedia, setSocialMedia }}>
            {children}
        </SocialContext.Provider>
    );
};

// Hook para usar o contexto com segurança
export const useSocialContext = () => {
    const context = useContext(SocialContext);
    if (!context) {
        throw new Error('useServiceContext deve ser usado dentro de um <SocialContextProvider>');
    }
    return context;
};
