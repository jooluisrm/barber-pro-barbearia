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
import { AddItemsComandaPayload, getProducts } from "@/api/barbearia/barbeariaServices";
import { getServices } from "@/api/barbearia/barbeariaServices"; // Supondo que exista
import { useDebounce } from "@/hooks/useDebounce";
import { patchConcluirAgendamento } from "@/api/agendamentos/agendamentoServices";


type Props = {
    item: Agendamentos;
    onActionSuccess: () => void;
}

// Representa um item no nosso carrinho de produtos
type ProdutoCarrinho = {
    produtoId: string;
    nome: string;
    precoVenda: number;
    quantidade: number;
    estoqueDisponivel: number;
}

export const DialogConcluirComanda = ({ item, onActionSuccess }: Props) => {

    const { barbearia, usuario } = useAuth();
    const [open, setOpen] = useState(false);
    const [loadingData, setLoadingData] = useState(false);
    const [loadingAction, setLoadingAction] = useState(false);

    const [availableProducts, setAvailableProducts] = useState<ProdutoDisponivel[]>([]);
    const [availableServices, setAvailableServices] = useState<ServicoDisponivel[]>([]);
    const [newServices, setNewServices] = useState<ServicoDisponivel[]>([]);
    const [newProducts, setNewProducts] = useState<ProdutoCarrinho[]>([]);
    const [searchTerm, setSearchTerm] = useState("");
    const debouncedSearchTerm = useDebounce(searchTerm, 500);

    useEffect(() => {
        const fetchData = async () => {
            if (open && barbearia) {
                setLoadingData(true);
                try {
                    const productsPromise = getProducts(barbearia.id, { q: debouncedSearchTerm, status: 'ATIVO' });
                    const servicesPromise = getServices(barbearia.id);
                    const [productsResponse, servicesData] = await Promise.all([productsPromise, servicesPromise]);
                    setAvailableProducts(productsResponse.produtos || []);
                    setAvailableServices(servicesData || []);
                } catch (error) { console.error("Erro ao buscar itens:", error); }
                finally { setLoadingData(false); }
            }
        };
        fetchData();
    }, [open, barbearia, debouncedSearchTerm]);

    const handleAddService = (service: ServicoDisponivel) => {
        const isAlreadyInComanda = item.servicosRealizados?.some(s => s.servico.id === service.id);
        const isAlreadyInCart = newServices.some(s => s.id === service.id);
        if (!isAlreadyInComanda && !isAlreadyInCart) {
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
                return currentCart; // Estoque insuficiente
            }
            if (existingItem) {
                return currentCart.map(item => item.produtoId === product.id ? { ...item, quantidade: newQuantity } : item);
            }
            return [...currentCart, { produtoId: product.id, nome: product.nome, precoVenda: product.precoVenda, quantidade: 1, estoqueDisponivel: product.quantidade }];
        });
    };

    const handleConcluirComanda = async () => {
        if (!barbearia || !usuario) return;
        setLoadingAction(true);
        try {
            const payload: AddItemsComandaPayload = {
                produtosConsumidos: newProducts.map(p => ({ produtoId: p.produtoId, quantidade: p.quantidade })),
                servicosAdicionais: newServices.map(s => ({ servicoId: s.id })),
            };

            await patchConcluirAgendamento(barbearia.id, item.id, payload);

            onActionSuccess();
            setOpen(false);
            setNewProducts([]);
            setNewServices([]);
        } catch (error) {
            console.error("Erro ao concluir comanda:", error);
        } finally {
            setLoadingAction(false);
        }
    };

    const valorTotalCalculado = useMemo(() => {
        const valorServicosExistentes = item.servicosRealizados?.reduce((acc, s) => acc + Number(s.precoNoMomento || 0), 0) || 0;
        const valorProdutosExistentes = item.produtosConsumidos?.reduce((acc, p) => acc + (Number(p.precoVendaNoMomento || 0) * p.quantidade), 0) || 0;
        const valorServicosNovos = newServices.reduce((acc, s) => acc + Number(s.preco), 0);
        const valorProdutosNovos = newProducts.reduce((acc, p) => acc + (Number(p.precoVenda) * p.quantidade), 0);
        return valorServicosExistentes + valorProdutosExistentes + valorServicosNovos + valorProdutosNovos;
    }, [item, newServices, newProducts]);

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button size="sm">Concluir</Button>
            </DialogTrigger>
            <DialogContent className="max-w-4xl p-0 max-h-[90vh] flex flex-col">
                <DialogHeader className="p-6 border-b">
                    <DialogTitle className="text-xl flex items-center gap-2"><ShoppingCart className="w-5 h-5" />Adicionar Itens à Comanda</DialogTitle>
                    <DialogDescription>Cliente: {item.nomeCliente}</DialogDescription>
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
                                {loadingData ? <p>Carregando...</p> : availableProducts.map(prod => (
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
                                {loadingData ? <p>Carregando...</p> : availableServices.map(serv => (
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
                            {/* CORREÇÃO: Variáveis com nomes claros e usando o preço histórico */}
                            {item.servicosRealizados.map((servicoRealizado) => (
                                <div key={`serv-exist-${servicoRealizado.id}`} className="flex justify-between items-center text-sm opacity-70">
                                    <p className="flex items-center gap-2"><Tag className="w-4 h-4" /> {servicoRealizado.servico.nome}</p>
                                    <p>{formatarPreco(servicoRealizado.precoNoMomento || "0")}</p>
                                </div>
                            ))}
                            {item.produtosConsumidos.map((produtoConsumido) => (
                                <div key={`prod-exist-${produtoConsumido.id}`} className="flex justify-between items-center text-sm opacity-70">
                                    <p className="flex items-center gap-2"><Beer className="w-4 h-4" /> {produtoConsumido.produto.nome} <span className="text-muted-foreground">x{produtoConsumido.quantidade}</span></p>
                                    <p>{formatarPreco(String(Number(produtoConsumido.precoVendaNoMomento || 0) * produtoConsumido.quantidade))}</p>
                                </div>
                            ))}
                            
                            {(item.servicosRealizados.length > 0 || item.produtosConsumidos.length > 0) && (newProducts.length > 0 || newServices.length > 0) && (<div className="border-b my-3"></div>)}

                            {newServices.map((novoServico) => (
                                <div key={`serv-new-${novoServico.id}`} className="flex justify-between items-center text-sm">
                                    <p className="flex items-center gap-2"><Tag className="w-4 h-4 text-green-500" /> {novoServico.nome}</p>
                                    <p className="font-semibold">{formatarPreco(novoServico.preco)}</p>
                                </div>
                            ))}
                            {newProducts.map((novoProduto) => (
                                <div key={`prod-new-${novoProduto.produtoId}`} className="flex justify-between items-center text-sm">
                                    <p className="flex items-center gap-2"><Beer className="w-4 h-4 text-green-500" /> {novoProduto.nome}</p>
                                    <div className="flex items-center gap-2">
                                        <Button size="icon" variant="ghost" className="h-6 w-6" onClick={() => handleUpdateProductQuantity({ id: novoProduto.produtoId, quantidade: novoProduto.estoqueDisponivel } as ProdutoDisponivel, -1)}><MinusCircle className="w-4 h-4 text-red-500" /></Button>
                                        <span className="font-semibold w-4 text-center">{novoProduto.quantidade}</span>
                                        <Button size="icon" variant="ghost" className="h-6 w-6" onClick={() => handleUpdateProductQuantity({ id: novoProduto.produtoId, quantidade: novoProduto.estoqueDisponivel } as ProdutoDisponivel, 1)}><PlusCircle className="w-4 h-4 text-green-500" /></Button>
                                    </div>
                                </div>
                            ))}
                            {(newProducts.length === 0 && newServices.length === 0) && <p className="text-center text-sm text-muted-foreground py-10">Selecione itens na lista ao lado.</p>}
                        </div>
                        <div className="p-6 border-t mt-auto flex justify-between font-bold text-lg bg-muted/80">
                            <p>Valor Total</p>
                            <p>{formatarPreco(valorTotalCalculado.toFixed(2))}</p>
                        </div>
                    </div>
                </div>

                <DialogFooter className="p-6 border-t flex justify-between items-center">
                    <p className="text-sm text-muted-foreground">Total: <span className="font-bold text-lg text-green-600">{formatarPreco(valorTotalCalculado.toFixed(2))}</span></p>
                    <div>
                        <Button variant="ghost" onClick={() => setOpen(false)}>Cancelar</Button>
                        <Button onClick={handleConcluirComanda} disabled={loadingAction}>
                            {loadingAction ? <LoaderCircle className="animate-spin h-4 w-4" /> : "Confirmar e Concluir"}
                        </Button>
                    </div>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}