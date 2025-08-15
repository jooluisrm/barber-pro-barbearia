"use client"

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "../ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { PlusCircle, MinusCircle, ShoppingBasket, ShoppingCart, Tag, Beer } from "lucide-react";
import { Agendamentos } from "@/types/agendamentos";
import { useState } from "react";

// Tipo para as props do componente
type Props = {
    agendamento: Agendamentos;
    onComandaUpdate: () => void; // Para atualizar a lista de pendentes após salvar
}

// Dados de exemplo (substituir por chamadas de API)
const mockServices = [
    { id: 'serv1', nome: 'Sobrancelha', preco: '25.00' },
    { id: 'serv2', nome: 'Barba Terapia', preco: '40.00' },
    { id: 'serv3', nome: 'Pintura de Cabelo', preco: '60.00' },
];
const mockProducts = [
    { id: 'prod1', nome: 'Cerveja Artesanal', precoVenda: '15.00', quantidade: 20 },
    { id: 'prod2', nome: 'Pomada Modeladora', precoVenda: '35.00', quantidade: 12 },
    { id: 'prod3', nome: 'Refrigerante', precoVenda: '5.00', quantidade: 30 },
];

export const DialogAddProductsAndServices = ({ agendamento, onComandaUpdate }: Props) => {
    // TODO: Adicionar estados para gerenciar:
    // 1. A lista de serviços e produtos disponíveis (buscados da API)
    // 2. Os itens que o usuário está adicionando (o "carrinho")
    
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button size={"sm"} variant={"secondary"} className="h-8 w-8 p-0 sm:h-auto sm:w-auto sm:p-2">
                    <ShoppingBasket className="h-4 w-4" />
                </Button>
            </DialogTrigger>
            <DialogContent className="max-w-4xl p-0 max-h-[90vh] flex flex-col">
                <DialogHeader className="p-6 border-b">
                    <DialogTitle className="text-xl flex items-center gap-2">
                        <ShoppingCart className="w-5 h-5" />
                        Adicionar Itens à Comanda
                    </DialogTitle>
                    <DialogDescription>
                        Cliente: {agendamento.nomeCliente}
                    </DialogDescription>
                </DialogHeader>

                {/* Corpo Rolável */}
                <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-6 p-6 overflow-y-auto">
                    
                    {/* Coluna da Esquerda: Itens Disponíveis */}
                    <div className="flex flex-col gap-4">
                        <Tabs defaultValue="produtos">
                            <TabsList className="grid w-full grid-cols-2">
                                <TabsTrigger value="produtos">Produtos</TabsTrigger>
                                <TabsTrigger value="servicos">Serviços Adicionais</TabsTrigger>
                            </TabsList>
                            <TabsContent value="produtos" className="space-y-3">
                                {mockProducts.map(prod => (
                                    <Card key={prod.id} className="p-3 flex items-center justify-between">
                                        <div>
                                            <p className="font-semibold">{prod.nome}</p>
                                            <p className="text-sm text-muted-foreground">Em estoque: {prod.quantidade}</p>
                                        </div>
                                        <div className="flex items-center gap-3">
                                            <span className="font-bold text-green-600">R$ {prod.precoVenda}</span>
                                            {/* TODO: Lógica de adicionar ao carrinho */}
                                            <Button size="icon" variant="outline"><PlusCircle className="w-4 h-4" /></Button>
                                        </div>
                                    </Card>
                                ))}
                            </TabsContent>
                            <TabsContent value="servicos" className="space-y-3">
                                 {mockServices.map(serv => (
                                    <Card key={serv.id} className="p-3 flex items-center justify-between">
                                        <p className="font-semibold">{serv.nome}</p>
                                        <div className="flex items-center gap-3">
                                            <span className="font-bold">R$ {serv.preco}</span>
                                            {/* TODO: Lógica de adicionar ao carrinho */}
                                            <Button size="icon" variant="outline"><PlusCircle className="w-4 h-4" /></Button>
                                        </div>
                                    </Card>
                                ))}
                            </TabsContent>
                        </Tabs>
                    </div>

                    {/* Coluna da Direita: Resumo da Comanda */}
                    <div className="space-y-4">
                        <h3 className="font-semibold text-lg border-b pb-2">Resumo da Comanda</h3>
                        <div className="space-y-3">
                            {/* Itens já existentes */}
                            {agendamento.servicosRealizados.map((item, index) => (
                                <div key={`serv-exist-${index}`} className="flex justify-between items-center text-sm">
                                    <p className="flex items-center gap-2"><Tag className="w-4 h-4 text-muted-foreground" /> {item.servico.nome}</p>
                                    <p>R$ {item.servico.preco}</p>
                                </div>
                            ))}
                            {agendamento.produtosConsumidos.map((item, index) => (
                                 <div key={`prod-exist-${index}`} className="flex justify-between items-center text-sm">
                                    <p className="flex items-center gap-2"><Beer className="w-4 h-4 text-muted-foreground" /> {item.produto.nome} <span className="text-muted-foreground">x{item.quantidade}</span></p>
                                    <p>R$ {Number(item.produto.precoVenda) * item.quantidade}</p>
                                </div>
                            ))}

                            {/* TODO: Renderizar aqui os itens recém-adicionados do "carrinho" */}
                            <p className="text-center text-muted-foreground pt-4">Nenhum item novo adicionado.</p>

                        </div>
                        <div className="border-t pt-4 flex justify-between font-bold text-lg">
                            <p>Valor Total</p>
                            {/* TODO: Calcular o valor total (existentes + novos) */}
                            <p>R$ {agendamento.valorTotal || '0.00'}</p>
                        </div>
                    </div>
                </div>

                <DialogFooter className="p-6 border-t flex justify-end">
                    {/* TODO: Lógica para salvar os itens adicionados */}
                    <Button>Adicionar à Comanda</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}