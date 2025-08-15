"use client"

import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Button } from "../ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card } from "@/components/ui/card";
import { PlusCircle, MinusCircle, ShoppingBasket, ShoppingCart, Tag, Beer, Search, LoaderCircle } from "lucide-react";
import { Agendamentos } from "@/types/agendamentos";
import { useEffect, useState, useMemo } from "react";
import { formatarPreco } from "@/utils/formatarValores";
import { useAuth } from "@/contexts/AuthContext";
import { Products as ProdutoDisponivel, StatusProduto } from "@/types/products";
import { Services as ServicoDisponivel } from "@/types/services";
import { getProducts } from "@/api/barbearia/barbeariaServices";
import { getServices } from "@/api/barbearia/barbeariaServices"; // Supondo que exista
import { useDebounce } from "@/hooks/useDebounce";



type Props = {
    agendamento: Agendamentos;
    onComandaUpdate: () => void;
}

// Representa um item no nosso carrinho de produtos
type ProdutoCarrinho = {
    produtoId: string;
    nome: string;
    precoVenda: number;
    quantidade: number;
    estoqueDisponivel: number;
}

export const DialogAddProductsAndServices = ({ agendamento, onComandaUpdate }: Props) => {
    const { barbearia } = useAuth();
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);

    // --- ESTADOS ---
    const [availableProducts, setAvailableProducts] = useState<ProdutoDisponivel[]>([]);
    const [availableServices, setAvailableServices] = useState<ServicoDisponivel[]>([]);
    const [newServices, setNewServices] = useState<ServicoDisponivel[]>([]);
    const [newProducts, setNewProducts] = useState<ProdutoCarrinho[]>([]);
    const [searchTerm, setSearchTerm] = useState("");
    const debouncedSearchTerm = useDebounce(searchTerm, 500);

    // --- LÓGICA DE BUSCA DE DADOS ---
    useEffect(() => {
        const fetchData = async () => {
            if (open && barbearia) {
                setLoading(true);
                try {
                    const productsPromise = getProducts(barbearia.id, { q: debouncedSearchTerm, status: 'ATIVO' });
                    const servicesPromise = getServices(barbearia.id); // Supondo que getServices exista

                    const [productsResponse, servicesData] = await Promise.all([productsPromise, servicesPromise]);

                    setAvailableProducts(productsResponse.produtos || []);
                    setAvailableServices(servicesData || []);
                } catch (error) {
                    console.error("Erro ao buscar itens:", error);
                } finally {
                    setLoading(false);
                }
            }
        };
        fetchData();
    }, [open, barbearia, debouncedSearchTerm]);

    // --- LÓGICA DO CARRINHO ---
    const handleAddService = (service: ServicoDisponivel) => {
        if (!newServices.some(s => s.id === service.id)) {
            setNewServices([...newServices, service]);
        }
    };

    const handleUpdateProductQuantity = (product: ProdutoDisponivel, change: number) => {
        setNewProducts(currentCart => {
            const existingItem = currentCart.find(item => item.produtoId === product.id);
            const newQuantity = (existingItem?.quantidade || 0) + change;

            if (newQuantity <= 0) {
                return currentCart.filter(item => item.produtoId !== product.id);
            }
            if (newQuantity > product.quantidade) {
                // TODO: Adicionar toast de erro "Estoque insuficiente"
                return currentCart;
            }
            if (existingItem) {
                return currentCart.map(item => item.produtoId === product.id ? { ...item, quantidade: newQuantity } : item);
            }
            return [...currentCart, { produtoId: product.id, nome: product.nome, precoVenda: product.precoVenda, quantidade: 1, estoqueDisponivel: product.quantidade }];
        });
    };

    // --- LÓGICA DE SALVAR ---
    const handleSaveChanges = async () => {
        if (newProducts.length === 0 && newServices.length === 0) return;
        setLoading(true);
        try {
            // TODO: Criar a rota no backend: PATCH /agendamentos/:id/adicionar-itens
            /*
            await addItemsToComanda(agendamento.id, {
                servicosAdicionais: newServices.map(s => ({ servicoId: s.id })),
                produtosConsumidos: newProducts.map(p => ({ produtoId: p.produtoId, quantidade: p.quantidade })),
            });
            */
            console.log("Simulando salvamento...", { newServices, newProducts });
            onComandaUpdate(); // Atualiza a lista de pendentes
            setOpen(false); // Fecha o dialog
        } catch (error) {
            console.error("Erro ao salvar itens na comanda:", error);
        } finally {
            setLoading(false);
        }
    };

    const valorTotal = useMemo(() => {
        // Converte o valor existente para número
        const valorExistente = Number(agendamento.valorTotal || 0);

        // Soma os preços dos novos serviços
        const valorServicosNovos = newServices.reduce((acc, s) => acc + Number(s.preco), 0);

        // Soma os preços dos novos produtos (preço * quantidade)
        const valorProdutosNovos = newProducts.reduce((acc, p) => acc + (Number(p.precoVenda) * p.quantidade), 0);

        // Soma tudo
        return valorExistente + valorServicosNovos + valorProdutosNovos;
    }, [agendamento.valorTotal, newServices, newProducts]);

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button size={"sm"} variant={"outline"} className="h-8 w-8 p-0 sm:h-auto sm:w-auto sm:p-2">
                    <ShoppingBasket className="h-4 w-4" />
                </Button>
            </DialogTrigger>
            <DialogContent className="max-w-4xl p-0 max-h-[90vh] flex flex-col">
                <DialogHeader className="p-6 border-b">
                    <DialogTitle className="text-xl flex items-center gap-2"><ShoppingCart className="w-5 h-5" />Adicionar Itens à Comanda</DialogTitle>
                    <DialogDescription>Cliente: {agendamento.nomeCliente}</DialogDescription>
                </DialogHeader>

                <div className="flex-1 grid grid-cols-1 md:grid-cols-2 overflow-hidden">
                    {/* Coluna da Esquerda: Itens Disponíveis com Scroll */}
                    <div className="flex flex-col gap-4 p-6 overflow-y-auto">
                        <div className="relative">
                            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                            <Input placeholder="Buscar produto ou serviço..." className="pl-8" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
                        </div>
                        <Tabs defaultValue="produtos">
                            <TabsList className="grid w-full grid-cols-2">
                                <TabsTrigger value="produtos">Produtos</TabsTrigger>
                                <TabsTrigger value="servicos">Serviços</TabsTrigger>
                            </TabsList>
                            <TabsContent value="produtos" className="space-y-3 mt-4">
                                {loading ? <p>Carregando...</p> : availableProducts.map(prod => (
                                    <Card key={prod.id} className="p-3 flex items-center justify-between text-sm">
                                        <div>
                                            <p className="font-semibold">{prod.nome}</p>
                                            <p className="text-xs text-muted-foreground">Estoque: {prod.quantidade}</p>
                                        </div>
                                        <div className="flex items-center gap-3">
                                            <span className="font-bold text-green-600">{formatarPreco(prod.precoVenda.toString())}</span>
                                            <Button size="icon" variant="ghost" className="h-7 w-7" onClick={() => handleUpdateProductQuantity(prod, 1)}><PlusCircle className="w-4 h-4" /></Button>
                                        </div>
                                    </Card>
                                ))}
                            </TabsContent>
                            <TabsContent value="servicos" className="space-y-3 mt-4">
                                {loading ? <p>Carregando...</p> : availableServices.map(serv => (
                                    <Card key={serv.id} className="p-3 flex items-center justify-between text-sm">
                                        <p className="font-semibold">{serv.nome}</p>
                                        <div className="flex items-center gap-3">
                                            <span className="font-bold">{formatarPreco(serv.preco)}</span>
                                            <Button size="icon" variant="ghost" className="h-7 w-7" onClick={() => handleAddService(serv)}><PlusCircle className="w-4 h-4" /></Button>
                                        </div>
                                    </Card>
                                ))}
                            </TabsContent>
                        </Tabs>
                    </div>

                    {/* Coluna da Direita: Resumo da Comanda Fixo */}
                    <div className="flex flex-col bg-muted/50 border-l">
                        <div className="p-6 border-b"><h3 className="font-semibold text-lg">Resumo da Comanda</h3></div>
                        <div className="flex-1 space-y-3 p-6 overflow-y-auto">
                            {agendamento.servicosRealizados.map((item, index) => (<div key={`serv-exist-${index}`} className="flex justify-between items-center text-sm opacity-60"><p className="flex items-center gap-2"><Tag className="w-4 h-4" /> {item.servico.nome}</p><p>{formatarPreco(item.servico.preco || "0")}</p></div>))}
                            {agendamento.produtosConsumidos.map((item, index) => (<div key={`prod-exist-${index}`} className="flex justify-between items-center text-sm opacity-60"><p className="flex items-center gap-2"><Beer className="w-4 h-4" /> {item.produto.nome} <span className="text-muted-foreground">x{item.quantidade}</span></p><p>{formatarPreco(String(Number(item.produto.precoVenda) * item.quantidade))}</p></div>))}

                            {(agendamento.servicosRealizados.length > 0 || agendamento.produtosConsumidos.length > 0) && (newProducts.length > 0 || newServices.length > 0) && (<div className="border-b my-3"></div>)}

                            {newServices.map((item) => (<div key={`serv-new-${item.id}`} className="flex justify-between items-center text-sm"><p className="flex items-center gap-2"><Tag className="w-4 h-4" /> {item.nome}</p><p className="font-semibold">{formatarPreco(item.preco)}</p></div>))}
                            {newProducts.map((item) => (
                                <div key={`prod-new-${item.produtoId}`} className="flex justify-between items-center text-sm">
                                    <p className="flex items-center gap-2"><Beer className="w-4 h-4" /> {item.nome}</p>
                                    <div className="flex items-center gap-2">
                                        <Button size="icon" variant="ghost" className="h-6 w-6" onClick={() => handleUpdateProductQuantity({ id: item.produtoId, quantidade: item.estoqueDisponivel } as ProdutoDisponivel, -1)}><MinusCircle className="w-4 h-4 text-red-500" /></Button>
                                        <span className="font-semibold w-4 text-center">{item.quantidade}</span>
                                        <Button size="icon" variant="ghost" className="h-6 w-6" onClick={() => handleUpdateProductQuantity({ id: item.produtoId, quantidade: item.estoqueDisponivel } as ProdutoDisponivel, 1)}><PlusCircle className="w-4 h-4 text-green-500" /></Button>
                                    </div>
                                </div>
                            ))}

                            {(newProducts.length === 0 && newServices.length === 0) && <p className="text-center text-sm text-muted-foreground py-10">Selecione itens na lista ao lado.</p>}
                        </div>
                        <div className="p-6 border-t mt-auto flex justify-between font-bold text-lg bg-muted/80">
                            <p>Valor Total</p>
                            <p>{formatarPreco(valorTotal.toString())}</p>
                        </div>
                    </div>
                </div>

                <DialogFooter className="p-6 border-t flex justify-end">
                    <Button variant="ghost" onClick={() => setOpen(false)}>Cancelar</Button>
                    <Button onClick={handleSaveChanges} disabled={loading || (newProducts.length === 0 && newServices.length === 0)}>
                        {loading ? <LoaderCircle className="animate-spin h-4 w-4" /> : "Adicionar à Comanda"}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}