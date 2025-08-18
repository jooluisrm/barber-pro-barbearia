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
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "../ui/tooltip";
import { Button } from "../ui/button";
import { useState } from "react";
import { Eye, User, Scissors, Clock, Calendar, Beer, Tag, Phone, Mail, MailIcon } from "lucide-react";
import { Agendamentos } from "@/types/agendamentos";
import { ItemInfo } from "../reultilizar/ItemInfo";
import { formatarPreco } from "@/utils/formatarValores";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

type Props = {
    item: Agendamentos;
}

export const DialogViewAgendamento = ({ item }: Props) => {
    const [open, setOpen] = useState(false);

    const valorTotal = item.status === 'Feito'
        ? Number(item.valorTotal || 0)
        : (item.servicosRealizados?.reduce((acc, s) => acc + Number(s.precoNoMomento || 0), 0) || 0) +
        (item.produtosConsumidos?.reduce((acc, p) => acc + (Number(p.precoVendaNoMomento || 0) * p.quantidade), 0) || 0);

    const statusColors = {
        'Feito': 'bg-green-500 text-green-500',
        'Confirmado': 'bg-yellow-500 text-yellow-500',
        'Cancelado': 'bg-red-500 text-red-500',
    };
    const colorClass = statusColors[item.status as keyof typeof statusColors] || 'bg-gray-400 text-muted-foreground';

    // NOVO: Função para criar o link do WhatsApp
    const formatWhatsAppLink = (phone: string | null | undefined): string | undefined => {
        if (!phone) return undefined;
        // Remove todos os caracteres não numéricos e adiciona o código do Brasil (55)
        const numeroLimpo = phone.replace(/\D/g, '');
        return `https://wa.me/55${numeroLimpo}`;
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <TooltipProvider>
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <Button variant={"ghost"} size="icon" onClick={() => setOpen(true)}>
                                <Eye className="w-4 h-4" />
                            </Button>
                        </TooltipTrigger>
                        <TooltipContent><p>Ver mais detalhes</p></TooltipContent>
                    </Tooltip>
                </TooltipProvider>
            </DialogTrigger>
            <DialogContent className="max-w-2xl p-0 max-h-[90vh] flex flex-col">
                <DialogHeader className="p-6 border-b">
                    <DialogTitle>Detalhes do Agendamento</DialogTitle>
                    <DialogDescription>
                        Resumo completo da comanda e informações do cliente.
                    </DialogDescription>
                </DialogHeader>

                {/* --- MUDANÇA ESTRUTURAL AQUI --- */}
                {/* 1. O corpo rolável agora engloba apenas o conteúdo principal */}
                <div className="flex-1 overflow-y-auto p-6 space-y-6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="flex items-center gap-3 border rounded-lg p-3">
                            <Avatar className="h-10 w-10">
                                <AvatarImage src={item.fotoPerfilCliente || undefined} />
                                <AvatarFallback><User /></AvatarFallback>
                            </Avatar>
                            <div className="flex flex-col">
                                <span className="text-xs text-muted-foreground">Cliente</span>
                                <span className="font-semibold text-sm">{item.nomeCliente}</span>
                            </div>
                        </div>
                        <div className="flex items-center gap-3 border rounded-lg p-3">
                            <Avatar className="h-10 w-10">
                                <AvatarImage src={item.barbeiro.fotoPerfil || undefined} />
                                <AvatarFallback><Scissors /></AvatarFallback>
                            </Avatar>
                            <div className="flex flex-col">
                                <span className="text-xs text-muted-foreground">Barbeiro</span>
                                <span className="font-semibold text-sm">{item.barbeiro.nome}</span>
                            </div>
                        </div>
                    </div>

                    {/* Informações de Contato do Cliente (agora com links) */}
                    {(item.telefoneCliente || item.emailCliente) && (
                        <div className="space-y-2">
                            <h3 className="font-semibold text-sm">Informações de Contato</h3>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

                                {item.telefoneCliente && (
                                    <ItemInfo
                                        icon={<Phone className="w-5 h-5" />}
                                        label="Telefone"
                                        value={item.telefoneCliente}
                                        href={formatWhatsAppLink(item.telefoneCliente)}
                                        valueClassName="text-blue-500"
                                    />
                                )}

                                {item.emailCliente && (
                                    <ItemInfo
                                        icon={<Mail className="w-5 h-5" />}
                                        label="Email"
                                        value={item.emailCliente}
                                        href={`mailto:${item.emailCliente}`}
                                        valueClassName="text-blue-500"
                                    />
                                )}

                            </div>
                        </div>
                    )}

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        <ItemInfo icon={<Calendar className="w-5 h-5" />} label="Data" value={new Date(item.data).toLocaleDateString('pt-BR', { timeZone: 'UTC' })} />
                        <ItemInfo icon={<Clock className="w-5 h-5" />} label="Hora" value={item.hora} />
                        <ItemInfo
                            icon={<div className={`w-2 h-2 rounded-full mt-1 ${colorClass.split(' ')[0]}`} />}
                            label="Status"
                            value={item.status}
                            valueClassName={colorClass.split(' ')[1]}
                        />
                    </div>

                    <div className="space-y-2">
                        <h3 className="font-semibold flex items-center gap-2"><Tag className="w-4 h-4" /> Serviços Realizados</h3>
                        <div className="border rounded-lg p-3 space-y-2">
                            {item.servicosRealizados.length > 0 ? item.servicosRealizados.map(s => (
                                <div key={s.id} className="flex justify-between text-sm">
                                    <span>{s.servico.nome}</span>
                                    <span className="text-muted-foreground">{formatarPreco(s.precoNoMomento)}</span>
                                </div>
                            )) : <p className="text-sm text-muted-foreground">Nenhum serviço na comanda.</p>}
                        </div>
                    </div>

                    <div className="space-y-2">
                        <h3 className="font-semibold flex items-center gap-2"><Beer className="w-4 h-4" /> Produtos Consumidos</h3>
                        <div className="border rounded-lg p-3 space-y-2">
                            {item.produtosConsumidos.length > 0 ? item.produtosConsumidos.map(p => (
                                <div key={p.id} className="flex justify-between text-sm">
                                    <span>{p.produto.nome} <span className="text-muted-foreground/70">x{p.quantidade}</span></span>
                                    <span className="text-muted-foreground">{formatarPreco(String(Number(p.precoVendaNoMomento) * p.quantidade))}</span>
                                </div>
                            )) : <p className="text-sm text-muted-foreground">Nenhum produto na comanda.</p>}
                        </div>
                    </div>
                </div>

                {/* 2. O rodapé agora fica FORA da área de scroll */}
                <DialogFooter className="p-6 border-t flex justify-between items-center">
                    <div className="text-lg font-bold">Valor Total</div>
                    <div className={`text-lg font-bold ${colorClass.split(' ')[1]}`}>
                        {formatarPreco(valorTotal.toFixed(2))}
                    </div>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}