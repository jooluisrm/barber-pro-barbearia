"use client"

import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { CalendarioNovoAgendamento } from "./calendarioNovoAgendamento"
import { useEffect, useState } from "react"
import { useAuth } from "@/contexts/AuthContext"
import { loadItems } from "@/utils/loadItems"
import { getServices } from "@/api/barbearia/barbeariaServices"
import { Services } from "@/types/services"
import { ItemService } from "./itemService"
import { Barbeiro, HorariosDeTrabalho, HorariosDisponiveis } from "@/types/barbeiros"
import { getBarbeiros, getHorariosDisponiveis } from "@/api/barbeiros/barbeirosServices"
import { ItemBarbeiro } from "./itemBarbeiro"
import { AlertSelectBarber } from "./alertSelectBarber"
import { ItemHorario } from "./itemHorario"
import { DataNewAgendamento, getAgendamentos, postAgendamento } from "@/api/agendamentos/agendamentoServices"
import { handleConfetti } from "@/utils/confetti"
import { useScheduleContext } from "@/contexts/scheduleContext"
import { LoaderCircle } from "lucide-react"

export function DialogNovoAgendamento() {
    const { barbearia, usuario } = useAuth();
    const { setAgendamentos } = useScheduleContext();

    const [date, setDate] = useState<string>("");
    const [services, setServices] = useState<Services[] | null>(null);
    const [barbeiros, setBarbeiros] = useState<Barbeiro[] | null>(null);
    const [horariosDisponiveis, setHorariosDisponiveis] = useState<HorariosDisponiveis[] | null>(null);

    const [selectBarbeiro, setSelectBarbeiro] = useState("");
    const [selectService, setSelectService] = useState("");
    const [selectHorario, setSelectHorario] = useState("");

    const [loading, setLoading] = useState(false);

    const [open, setOpen] = useState(false);

    useEffect(() => {
        if (!barbearia) return;
        const carregarServicos = async () => {
            const dados = await getServices(barbearia.id);
            if (dados) {
                setServices(dados);
            }
        }
        const carregarBarbeiros = async () => {
            const dados = await getBarbeiros(barbearia.id);
            if (dados) {
                setBarbeiros(dados);
            }
        }
        if (usuario?.role === "ADMIN") {
            carregarBarbeiros();
        }
        carregarServicos();

    }, [barbearia, usuario]);


    useEffect(() => {
        if (usuario?.role === "ADMIN") {
            if (selectBarbeiro) {
                carregarHorarios();
            }
        } else {
            if(!date) return;
            carregarHorarios();
        }
    }, [selectBarbeiro, date]);


    const carregarHorarios = async () => {
        const horaAtual = getHoraAtual();

        if (usuario?.role === "ADMIN") {
            const dados = await getHorariosDisponiveis(selectBarbeiro, date, horaAtual);
            if (dados) {
                setHorariosDisponiveis(dados);
                console.log(dados);
            } else {
                setHorariosDisponiveis([]);
            }
        } else {
            if (!usuario?.perfilBarbeiro) return;
            const dados = await getHorariosDisponiveis(usuario.perfilBarbeiro.id, date, horaAtual);
            if (dados) {
                setHorariosDisponiveis(dados);
                console.log(dados);
            } else {
                setHorariosDisponiveis([]);
            }
        }

    };

    // Retorna a hora atual no formato: "14:59"
    function getHoraAtual(): string {
        const agora = new Date();
        const horas = agora.getHours().toString().padStart(2, '0');
        const minutos = agora.getMinutes().toString().padStart(2, '0');
        return `${horas}:${minutos}`;
    }


    const handleSelectBarbeiro = (value: string) => {
        if (value === selectBarbeiro) {
            setSelectBarbeiro("");
            setHorariosDisponiveis([]); // limpa os horários quando deselecionar
        } else {
            setSelectBarbeiro(value);
            setSelectHorario("");
        }
    };

    const handleSelectService = (value: string) => {
        if (value === selectService) {
            setSelectService("");
        } else {
            setSelectService(value);
        }
    };

    const handleHorarioService = (value: string) => {
        if (value === selectHorario) {
            setSelectHorario("");
        } else {
            setSelectHorario(value);
        }
    }

    const handleNewAgendamento = async () => {
        setLoading(true);
        if (usuario && usuario.role === "ADMIN") {
            if (!barbearia || !selectBarbeiro || !selectHorario || !selectService || !date) return;
            try {
                const data: DataNewAgendamento = {
                    barbeariaId: barbearia.id,
                    barbeiroId: selectBarbeiro,
                    data: date,
                    hora: selectHorario,
                    servicoId: selectService
                }
                await postAgendamento(data);
                await loadItems(barbearia, getAgendamentos, setAgendamentos);
                carregarHorarios();
                setSelectHorario("");
                setSelectService("");
                setSelectBarbeiro("");
                handleConfetti();
                setLoading(false);
                setOpen(false);

            } catch (error: any) {
                console.log(error);
            }
        } else {
            if (!barbearia || !selectHorario || !selectService || !date || !usuario?.perfilBarbeiro) return;
            try {
                const data: DataNewAgendamento = {
                    barbeariaId: barbearia.id,
                    barbeiroId: usuario.perfilBarbeiro.id,
                    data: date,
                    hora: selectHorario,
                    servicoId: selectService
                }
                await postAgendamento(data);
                await loadItems(barbearia, getAgendamentos, setAgendamentos);
                carregarHorarios();
                setSelectHorario("");
                setSelectService("");
                setSelectBarbeiro("");
                handleConfetti();
                setLoading(false);
                setOpen(false);
            } catch (error: any) {
                console.log(error);
                setLoading(false);
            }
        }

    }


    return (
        <Dialog open={open} onOpenChange={setOpen} >
            <DialogTrigger asChild>
                <Button
                    variant="default"
                    className="font-bold truncate"
                    onClick={() => setOpen(true)}
                >Criar Agendamento</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Criar Novo Agendamento</DialogTitle>
                    <DialogDescription>
                        Crie um agendamento para Visitantes.
                    </DialogDescription>
                </DialogHeader>
                <div>
                    <div className="py-3">
                        <h1>Selecione o dia:</h1>
                        <CalendarioNovoAgendamento
                            date={date}
                            setDate={setDate}
                            setSelectHorario={setSelectHorario}
                        />
                    </div>

                    <div className="py-3">
                        <h1>Selecione um Serviço:</h1>
                        <div className="flex flex-wrap gap-2 py-2">
                            {
                                services && services.map((item) => (
                                    <ItemService
                                        key={item.id}
                                        item={item}
                                        onClick={handleSelectService}
                                        isSelected={selectService === item.id}
                                    />
                                ))
                            }
                        </div>
                    </div>

                    {
                        usuario?.role === "ADMIN" && (
                            <div>
                                <h1>Selecione um Barbeiro:</h1>
                                <div className="flex flex-wrap gap-2 py-2">
                                    {barbeiros && barbeiros.map((item) => (
                                        <ItemBarbeiro
                                            key={item.id}
                                            item={item}
                                            onClick={handleSelectBarbeiro}
                                            isSelected={selectBarbeiro === item.id}
                                        />
                                    ))}
                                </div>
                            </div>
                        )
                    }

                    <div>
                        <h1>Selecione um Horário:</h1>
                        <div className="flex flex-wrap gap-2 py-2">
                            {(!selectBarbeiro && usuario?.role === "ADMIN") && <AlertSelectBarber />}
                            {(usuario?.role === "ADMIN") && selectBarbeiro && horariosDisponiveis === null && <p className="dark:text-gray-400 text-gray-500">Carregando horários...</p>}
                            {(usuario?.role === "BARBEIRO") && horariosDisponiveis === null && <p className="dark:text-gray-400 text-gray-500">Carregando horários...</p>}
                            {(usuario?.role === "ADMIN") && selectBarbeiro && horariosDisponiveis && horariosDisponiveis.length > 0 && horariosDisponiveis.map((item) => (
                                <ItemHorario
                                    key={item.id}
                                    item={item}
                                    onClick={handleHorarioService}
                                    isSelected={selectHorario === item.hora}
                                />
                            ))}
                            {(usuario?.role === "BARBEIRO") && horariosDisponiveis && horariosDisponiveis.length > 0 && horariosDisponiveis.map((item) => (
                                <ItemHorario
                                    key={item.id}
                                    item={item}
                                    onClick={handleHorarioService}
                                    isSelected={selectHorario === item.hora}
                                />
                            ))}
                            {(usuario?.role === "ADMIN") && selectBarbeiro && horariosDisponiveis && horariosDisponiveis.length === 0 && <p className="dark:text-gray-400 text-gray-500">Sem horário disponível</p>}
                            {(usuario?.role === "BARBEIRO") && horariosDisponiveis && horariosDisponiveis.length === 0 && <p className="dark:text-gray-400 text-gray-500">Sem horário disponível</p>}
                        </div>
                    </div>

                </div>
                <DialogFooter>
                    <Button
                        onClick={handleNewAgendamento}
                        disabled={
                            usuario?.role === "ADMIN" ? (!selectBarbeiro || !selectHorario || !selectService || !date) : (
                                !selectHorario || !selectService || !date
                            )}
                    >
                        {loading ? <LoaderCircle className="animate-spin" /> : "Criar"}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
