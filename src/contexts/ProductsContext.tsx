import { Products } from '@/types/products';
import { createContext, useContext, useState, ReactNode } from 'react';

type ProductContextType = {
    products: Products[] | null;
    setProducts: any;
};

const ProductContext = createContext<ProductContextType | undefined>(undefined);

export const ProductContextProvider = ({ children }: { children: ReactNode }) => {
    const [products, setProducts] = useState<Products[] | null>(null);

    return (
        <ProductContext.Provider value={{ products, setProducts }}>
            {children}
        </ProductContext.Provider>
    );
};

// Hook para usar o contexto com segurança
export const useProductContext = () => {
    const context = useContext(ProductContext);
    if (!context) {
        throw new Error('useServiceContext deve ser usado dentro de um <ProductContextProvider>');
    }
    return context;
};
