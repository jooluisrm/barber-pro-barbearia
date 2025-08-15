"use client"

import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { useEffect, useState } from "react"
import { useAuth } from "@/contexts/AuthContext"
import { getServices } from "@/api/barbearia/barbeariaServices"
import { Services } from "@/types/services"
import { ItemService } from "./itemService"
import { Barbeiro, HorariosDisponiveis } from "@/types/barbeiros"
import { getBarbeiros, getHorariosDisponiveis } from "@/api/barbeiros/barbeirosServices"
import { ItemBarbeiro } from "./itemBarbeiro"
import { ItemHorario } from "./itemHorario"
import { DataNewAgendamento, getAgendamentos, postAgendamento } from "@/api/agendamentos/agendamentoServices"
import { useScheduleContext } from "@/contexts/scheduleContext"
import { LoaderCircle, User, Calendar, Scissors, Clock, Phone } from "lucide-react"
import { format, parse } from "date-fns"
import { ptBR } from "date-fns/locale"
import { Calendar as CalendarComponent } from "@/components/ui/calendar"
import { Input } from "../ui/input"
import InputMask from "react-input-mask";

export function DialogNovoAgendamento() {
    const { barbearia, usuario } = useAuth();
    const { setAgendamentos } = useScheduleContext();

    // Estados do formulário
    const [nomeVisitante, setNomeVisitante] = useState("");
    const [telefoneVisitante, setTelefoneVisitante] = useState("");
    const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
    const [selectedService, setSelectedService] = useState("");
    const [selectedBarbeiro, setSelectedBarbeiro] = useState("");
    const [selectedHorario, setSelectedHorario] = useState("");

    // Estados de controle e dados
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [services, setServices] = useState<Services[] | null>(null);
    const [barbeiros, setBarbeiros] = useState<Barbeiro[] | null>(null);
    const [horariosDisponiveis, setHorariosDisponiveis] = useState<HorariosDisponiveis[] | null>(null);

    // Carrega dados iniciais (serviços e barbeiros)
    useEffect(() => {
        if (!barbearia) return;
        getServices(barbearia.id).then(setServices);
        if (usuario?.role === "ADMIN") {
            getBarbeiros(barbearia.id).then(setBarbeiros);
        }
    }, [barbearia, usuario, open]); // 'open' para recarregar se necessário

    // Carrega horários disponíveis quando a data ou o barbeiro mudam
    useEffect(() => {
        const carregarHorarios = async () => {
            const barbeiroId = usuario?.role === "ADMIN" ? selectedBarbeiro : usuario?.perfilBarbeiro?.id;
            if (!barbeiroId || !selectedDate) {
                setHorariosDisponiveis([]);
                return;
            };

            setHorariosDisponiveis(null);
            const dataFormatada = format(selectedDate, "yyyy-MM-dd");

            // --- CORREÇÃO AQUI ---
            // 1. Obter a hora atual no formato "HH:mm"
            const horaAtual = new Date().toLocaleTimeString('pt-BR', {
                hour: '2-digit',
                minute: '2-digit',
                hour12: false,
            });

            // 2. Passar a hora atual como terceiro argumento
            const dados = await getHorariosDisponiveis(barbeiroId, dataFormatada, horaAtual);
            // --- FIM DA CORREÇÃO ---

            setHorariosDisponiveis(dados || []);
        };


        carregarHorarios();
    }, [selectedBarbeiro, selectedDate, usuario]);

    // Função para criar o agendamento
    const handleNewAgendamento = async () => {
        const barbeiroId = usuario?.role === "ADMIN" ? selectedBarbeiro : usuario?.perfilBarbeiro?.id;
        if (!barbearia || !barbeiroId || !selectedHorario || !selectedService || !selectedDate || !nomeVisitante) {
            // Adicionar toast de erro aqui
            return;
        }

        setLoading(true);
        try {
            const data: DataNewAgendamento = {
                barbeariaId: barbearia.id,
                barbeiroId: barbeiroId,
                data: format(selectedDate, "yyyy-MM-dd"),
                hora: selectedHorario,
                servicoId: selectedService,
                nomeVisitante: nomeVisitante,
                telefoneVisitante: telefoneVisitante,
            };

            await postAgendamento(data);
            // Recarrega a lista principal de agendamentos
            const agendamentosAtualizados = await getAgendamentos(barbearia.id, { data: new Date() });
            setAgendamentos(agendamentosAtualizados);

            // Reset e fecha o dialog
            setOpen(false);
            setNomeVisitante("");
            setTelefoneVisitante("");
            setSelectedService("");
            setSelectedHorario("");

        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button variant="default" className="font-bold truncate">Criar Agendamento</Button>
            </DialogTrigger>
            <DialogContent className="max-w-lg p-0 overflow-hidden max-h-[90vh] flex flex-col">
                <DialogHeader className="p-6 border-b">
                    <DialogTitle className="text-xl">Novo Agendamento para Visitante</DialogTitle>
                    <DialogDescription>
                        Preencha os dados para criar um novo horário na agenda.
                    </DialogDescription>
                </DialogHeader>

                {/* Corpo Rolável */}
                <div className="flex-1 overflow-y-auto p-6 space-y-6">
                    {/* Dados do Cliente */}
                    <div className="space-y-4 border rounded-lg p-4">
                        <label className="font-semibold flex items-center gap-2"><User className="w-4 h-4" /> Dados do Cliente</label>
                        <Input placeholder="Nome do Cliente*" value={nomeVisitante} onChange={(e) => setNomeVisitante(e.target.value)} />
                        <InputMask
                            mask="(99) 99999-9999"
                            value={telefoneVisitante}
                            onChange={(e) => setTelefoneVisitante(e.target.value)}
                        >
                            {(inputProps: any) => <Input {...inputProps} placeholder="Telefone (Opcional)" />}
                        </InputMask>
                    </div>

                    {/* Seleção de Serviço */}
                    <div className="space-y-2 border rounded-lg p-4">
                        <label className="font-semibold flex items-center gap-2"><Scissors className="w-4 h-4" /> Selecione o Serviço*</label>
                        <div className="flex flex-wrap gap-2 pt-2">
                            {services?.map((item) => (
                                <ItemService key={item.id} item={item} onClick={setSelectedService} isSelected={selectedService === item.id} />
                            ))}
                        </div>
                    </div>

                    {/* Seleção de Barbeiro (Apenas para ADMIN) */}
                    {usuario?.role === "ADMIN" && (
                        <div className="space-y-2 border rounded-lg p-4">
                            <label className="font-semibold">Selecione o Barbeiro*</label>
                            <div className="flex flex-wrap gap-2 pt-2">
                                {barbeiros?.map((item) => (
                                    <ItemBarbeiro key={item.id} item={item} onClick={setSelectedBarbeiro} isSelected={selectedBarbeiro === item.id} />
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Data e Hora */}
                    <div className="space-y-4 border rounded-lg p-4">
                        <div className="space-y-2">
                            <label className="font-semibold flex items-center gap-2"><Calendar className="w-4 h-4" /> Selecione o Dia*</label>
                            <CalendarComponent mode="single" selected={selectedDate} onSelect={setSelectedDate}  className="rounded-md border" />
                        </div>
                        <div className="space-y-2">
                            <label className="font-semibold flex items-center gap-2"><Clock className="w-4 h-4" /> Selecione o Horário*</label>
                            <div className="flex flex-wrap gap-2 pt-2">
                                {horariosDisponiveis === null ? <p className="text-sm text-muted-foreground">Selecione um barbeiro e uma data.</p>
                                    : horariosDisponiveis.length > 0 ? horariosDisponiveis.map((item) => (
                                        <ItemHorario key={item.id} item={item} onClick={setSelectedHorario} isSelected={selectedHorario === item.hora} />
                                    ))
                                        : <p className="text-sm text-muted-foreground">Nenhum horário disponível.</p>}
                            </div>
                        </div>
                    </div>
                </div>

                <DialogFooter className="p-6 border-t flex justify-end">
                    <Button
                        onClick={handleNewAgendamento}
                        disabled={loading || !nomeVisitante || !selectedService || !selectedDate || !selectedHorario || (usuario?.role === 'ADMIN' && !selectedBarbeiro)}
                    >
                        {loading ? <LoaderCircle className="animate-spin" /> : "Criar Agendamento"}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}