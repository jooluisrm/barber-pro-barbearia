import { Payment } from '@/types/payment';
import { createContext, useContext, useState, ReactNode } from 'react';

type PaymentContextType = {
    payment: Payment[] | null;
    setPayment: any;
};

const PaymentContext = createContext<PaymentContextType | undefined>(undefined);

export const PaymentContextProvider = ({ children }: { children: ReactNode }) => {
    const [payment, setPayment] = useState<Payment[] | null>(null);

    return (
        <PaymentContext.Provider value={{ payment, setPayment }}>
            {children}
        </PaymentContext.Provider>
    );
};

// Hook para usar o contexto com segurança
export const usePaymentContext = () => {
    const context = useContext(PaymentContext);
    if (!context) {
        throw new Error('useServiceContext deve ser usado dentro de um <PaymentContextProvider>');
    }
    return context;
};
