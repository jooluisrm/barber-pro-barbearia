import { Barbeiro, HorariosDeTrabalho } from "@/types/barbeiros";
import { AlertDialogHeader } from "../ui/alert-dialog";
import { DialogDescription, DialogTitle } from "../ui/dialog";
import { SelectDiaSemana } from "./selectDiaSemana";
import { AlertSelectDiaSemana } from "./alertSelectDiaSemana";
import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { Plus, Trash2 } from "lucide-react";
import { addNewHorarioTrabalho, deleteWorkTime, getHorarioTrabalho } from "@/api/barbeiros/barbeirosServices";
import { ItemHorariosTrabalho } from "./itemHorariosTrabalho";
import { SelectHorarioAdd } from "./selectHorarioAdd";
import { gerarHorarios } from "@/utils/gerarHorarios";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "../ui/tooltip";
import { AlertDialogDeleteTime } from "./alertDialogDeleteTime";

type Props = {
    barbeiro: Barbeiro;
    backPage: VoidFunction;
}

export const ContentGerenciarHorarios = ({ barbeiro, backPage }: Props) => {

    const [selectDia, setSelectDia] = useState<string | null>(null);
    const [horariosTrabalho, setHorariosTrabalho] = useState<null | HorariosDeTrabalho[]>(null);

    const [selectNovoHorario, setSelectNovoHorario] = useState("");

    const [selectItemTime, setSelectItemTime] = useState<HorariosDeTrabalho[]>([]);

    const carregarHorarioTrabalho = async () => {
        if (!selectDia) return;
        const dados = await getHorarioTrabalho(barbeiro.id, selectDia);
        setHorariosTrabalho(dados.horarios);
    }

    const handleSelectDia = (value: string) => {
        setSelectDia(value);
        setSelectNovoHorario("");
    }

    const handleAddNewHorario = async () => {
        if (!selectDia || selectNovoHorario === "") return;
        const data = {
            diaSemana: Number(selectDia),
            hora: selectNovoHorario
        }

        try {
            await addNewHorarioTrabalho(barbeiro.id, data);
            await carregarHorarioTrabalho();
        } catch (error) {
            console.error("Erro ao adicionar horário:", error);
        }
    }

    const toggleSelectTime = (itemTime: HorariosDeTrabalho) => {
        setSelectItemTime((prev) => {
            const jaSelecionado = prev.some((i) => i.id === itemTime.id);
            if (jaSelecionado) {
                // Remove da lista
                return prev.filter((i) => i.id !== itemTime.id);
            } else {
                // Adiciona na lista
                return [...prev, itemTime];
            }
        });
    };

    const handleDeleteWorkTime = async () => {
        const horariosFormatados = selectItemTime.map((item) => ({
            diaSemana: item.diaSemana,
            hora: item.hora,
        }));

        try {
            await deleteWorkTime(barbeiro.id, { horarios: horariosFormatados });
            await carregarHorarioTrabalho();
            await setSelectItemTime([]);
        } catch (error) {
            console.error("Erro ao deletar horário:", error);
        }
    };



    useEffect(() => {
        carregarHorarioTrabalho();
    }, [selectDia]);

    return (
        <>
            <AlertDialogHeader>
                <DialogTitle className="text-xl font-semibold">
                    ⏱️ Configurar Horários de Atendimento
                </DialogTitle>
                <DialogDescription>
                    Estabeleça os horários disponíveis para agendamentos dos seus serviços
                </DialogDescription>
            </AlertDialogHeader>
            <main className="flex flex-col gap-5">
                <div>
                    <div className={`flex pb-5 ${!selectDia ? "justify-end" : "justify-between"}`}>
                        <div className="flex gap-2">
                            <div className={`${!selectDia ? "hidden" : "flex"}`}>
                                <SelectHorarioAdd setValue={setSelectNovoHorario} value={selectNovoHorario} />
                            </div>
                            <TooltipProvider>
                                <Tooltip>
                                    <TooltipTrigger asChild>
                                        <Button className={`${!selectDia ? "hidden" : "flex"}`} onClick={handleAddNewHorario} disabled={!selectDia || !selectNovoHorario}>
                                            <Plus />
                                        </Button>
                                    </TooltipTrigger>
                                    <TooltipContent>
                                        Adicionar Horário
                                    </TooltipContent>
                                </Tooltip>
                            </TooltipProvider>
                        </div>
                        <SelectDiaSemana handleSelectDia={handleSelectDia} />
                    </div>
                    <div>
                        {
                            !selectDia && <AlertSelectDiaSemana />
                        }
                        <div className="flex gap-2 flex-wrap">

                            {selectDia && horariosTrabalho && horariosTrabalho.length > 0 ? (
                                horariosTrabalho.map((item) => (
                                    <ItemHorariosTrabalho
                                        key={item.id}
                                        item={item}
                                        toggleSelectTime={toggleSelectTime}
                                        selected={selectItemTime.some((i) => i.id === item.id)}
                                    />

                                ))
                            ) : (
                                selectDia && <p>Não há horários cadastrados</p>
                            )}

                        </div>
                    </div>
                </div>

                <div className={`flex ${!selectDia ? "justify-start" : "justify-between"}`}>
                    <Button variant="ghost" onClick={backPage}>Voltar</Button>
                    <div className={`${selectItemTime.length === 0 ? "hidden" : "flex items-center gap-2"}`}>
                        <p className="text-sm dark:text-gray-400 text-gray-700">items selecionados: <span className="font-bold">{selectItemTime.length}</span></p>
                        <AlertDialogDeleteTime selectDia={selectDia} handleDeleteWorkTime={handleDeleteWorkTime} selectItemTime={selectItemTime} />
                    </div>
                </div>
            </main>
        </>
    );
}