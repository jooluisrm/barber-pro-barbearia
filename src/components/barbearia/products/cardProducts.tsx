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
import { LoaderCircleIcon } from "lucide-react";

export const CardProducts = () => {
    const { barbearia } = useAuth();
    const { setProductData } = useProductContext();

    const [loading, setLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [statusFilter, setStatusFilter] = useState<StatusProduto>('ATIVO');
    const [searchTerm, setSearchTerm] = useState('');
    const debouncedSearchTerm = useDebounce(searchTerm, 500);

    useEffect(() => {
        if (!barbearia) return;

        const fetchProducts = async () => {
            setLoading(true);
            try {
                const data = await getProducts(barbearia.id, {
                    page: currentPage,
                    limit: 10,
                    status: statusFilter,
                    q: debouncedSearchTerm,
                });
                setProductData(data);
            } catch (error) {
                console.error("Falha ao buscar produtos:", error);
                setProductData(null);
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, [barbearia, currentPage, debouncedSearchTerm, statusFilter, setProductData]);

    const handleFilterChange = (newStatus: StatusProduto) => {
        setStatusFilter(newStatus);
        setCurrentPage(1);
    };

    const handleSearchChange = (term: string) => {
        setSearchTerm(term);
        setCurrentPage(1);
    };

    return (
        <Card>
            <CardHeader>
                <CardTitle>Produtos</CardTitle>
                <CardDescription>Gerencie os produtos e o estoque da sua barbearia.</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="flex flex-col sm:flex-row items-center gap-4 mb-6">
                    <div className="flex-1 relative w-full">
                        <Input
                            placeholder="Buscar por nome..."
                            value={searchTerm}
                            onChange={(e) => handleSearchChange(e.target.value)}
                            className="pr-10" 
                        />
                        {loading && (
                            <LoaderCircleIcon 
                                // CORREÇÃO: Adicionado h-5 w-5 para dar tamanho ao ícone
                                className="absolute top-1/2 -translate-y-1/2 right-3 h-5 w-5 animate-spin text-muted-foreground" 
                            />
                        )}
                    </div>
                    {/* MELHORIA DE RESPONSIVIDADE */}
                    <Tabs className="w-full sm:w-auto" value={statusFilter} onValueChange={(value) => handleFilterChange(value as StatusProduto)}>
                        <TabsList className="grid w-full grid-cols-2">
                            <TabsTrigger value="ATIVO" disabled={loading}>Ativos</TabsTrigger>
                            <TabsTrigger value="ARQUIVADO" disabled={loading}>Arquivados</TabsTrigger>
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