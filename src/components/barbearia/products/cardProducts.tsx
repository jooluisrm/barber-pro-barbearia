import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { TableProducts } from "./tableProducts"
import { DialogNewProduct } from "./dialogNewProduct";
import { useEffect, useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { getProducts } from "@/api/barbearia/barbeariaServices";
import { useProductContext } from "@/contexts/ProductsContext";
import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { StatusProduto } from "@/types/products";
import { useDebounce } from "@/hooks/useDebounce";

export const CardProducts = () => {
    const { barbearia } = useAuth();
    const { setProductData } = useProductContext(); 

    const [currentPage, setCurrentPage] = useState(1);
    const [statusFilter, setStatusFilter] = useState<StatusProduto>('ATIVO');
    const [searchTerm, setSearchTerm] = useState('');
    const debouncedSearchTerm = useDebounce(searchTerm, 500);

    // --- LÓGICA DE CARREGAMENTO CORRIGIDA ---
    useEffect(() => {
        // Só executa a busca se o objeto 'barbearia' já estiver carregado
        if (!barbearia) {
            return;
        }

        const fetchProducts = async () => {
            try {
                const data = await getProducts(barbearia.id, {
                    page: currentPage, // Usa a página atual
                    limit: 10,
                    status: statusFilter,
                    q: debouncedSearchTerm,
                });
                setProductData(data);
            } catch (error) {
                console.error("Falha ao buscar produtos:", error);
                setProductData(null);
            }
        };

        fetchProducts();

    // Este ÚNICO useEffect agora observa todas as dependências
    }, [barbearia, currentPage, debouncedSearchTerm, statusFilter, setProductData]);


    // Função para resetar a página quando os filtros mudam
    const handleFilterChange = (newStatus: StatusProduto) => {
        setStatusFilter(newStatus);
        setCurrentPage(1); // Reseta para a página 1
    };

    const handleSearchChange = (term: string) => {
        setSearchTerm(term);
        setCurrentPage(1); // Reseta para a página 1
    };


    return (
        <Card>
            <CardHeader>
                <CardTitle>Produtos</CardTitle>
                <CardDescription>Gerencie os produtos e o estoque da sua barbearia.</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="flex flex-col sm:flex-row items-center gap-4 mb-6">
                    <Input
                        placeholder="Buscar por nome..."
                        value={searchTerm}
                        onChange={(e) => handleSearchChange(e.target.value)}
                        className="flex-1"
                    />
                    <Tabs value={statusFilter} onValueChange={(value) => handleFilterChange(value as StatusProduto)}>
                        <TabsList>
                            <TabsTrigger value="ATIVO">Ativos</TabsTrigger>
                            <TabsTrigger value="ARQUIVADO">Arquivados</TabsTrigger>
                        </TabsList>
                    </Tabs>
                </div>
                
                <TableProducts 
                    currentPage={currentPage}
                    setCurrentPage={setCurrentPage}
                />
            </CardContent>
            <CardFooter>
                <DialogNewProduct />
            </CardFooter>
        </Card>
    );
}