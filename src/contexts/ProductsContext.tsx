import { Products } from '@/types/products';
import { createContext, useContext, useState, ReactNode } from 'react';

// NOVO: Tipo para a resposta da API com paginação
type PaginatedProductsResponse = {
    produtos: Products[];
    total: number;
    page: number;
    pageSize: number;
    totalPages: number;
};

// ATUALIZADO: O contexto agora lida com o objeto de resposta
type ProductContextType = {
    // O estado pode ser o objeto completo ou nulo
    productData: PaginatedProductsResponse | null; 
    setProductData: (data: PaginatedProductsResponse | null) => void;
};

const ProductContext = createContext<ProductContextType | undefined>(undefined);

export const ProductContextProvider = ({ children }: { children: ReactNode }) => {
    // ATUALIZADO: O estado inicial é nulo e espera o objeto de resposta
    const [productData, setProductData] = useState<PaginatedProductsResponse | null>(null);

    return (
        <ProductContext.Provider value={{ productData, setProductData }}>
            {children}
        </ProductContext.Provider>
    );
};

// Hook para usar o contexto
export const useProductContext = () => {
    const context = useContext(ProductContext);
    if (!context) {
        throw new Error('useProductContext deve ser usado dentro de um ProductContextProvider');
    }
    return context;
};