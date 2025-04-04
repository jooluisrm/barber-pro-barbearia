import { Barbeiro, HorariosDeTrabalho } from "@/types/barbeiros";
import { AlertDialogHeader } from "../ui/alert-dialog";
import { DialogDescription, DialogTitle } from "../ui/dialog";
import { SelectDiaSemana } from "./selectDiaSemana";
import { AlertSelectDiaSemana } from "./alertSelectDiaSemana";
import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { Plus, Trash2 } from "lucide-react";
import { getHorarioTrabalho } from "@/api/barbeiros/barbeirosServices";
import { ItemHorariosTrabalho } from "./itemHorariosTrabalho";

type Props = {
    barbeiro: Barbeiro;
    backPage: VoidFunction;
}

export const ContentGerenciarHorarios = ({ barbeiro, backPage }: Props) => {

    const [selectDia, setSelectDia] = useState<string | null>(null);
    const [horariosTrabalho, setHorariosTrabalho] = useState<null | HorariosDeTrabalho[]>(null);

    const handleSelectDia = (value: string) => {
        setSelectDia(value);
    }

    useEffect(() => {
        if (!selectDia) return;
        const carregarHorarioTrabalho = async () => {
            const dados = await getHorarioTrabalho(barbeiro.id, selectDia);
            setHorariosTrabalho(dados.horarios);
            console.log(dados.horarios)
        }
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
                        <Button className={`${!selectDia ? "hidden" : "flex"}`}>
                            <Plus />
                        </Button>
                        <SelectDiaSemana handleSelectDia={handleSelectDia} />
                    </div>
                    <div>
                        {
                            !selectDia && <AlertSelectDiaSemana />
                        }
                        <div className="flex gap-3">

                            {selectDia && horariosTrabalho && horariosTrabalho.length > 0 ? (
                                horariosTrabalho.map((item) => (
                                    <ItemHorariosTrabalho key={item.id} item={item} />
                                ))
                            ) : (
                                selectDia && <p>Não há horários cadastrados</p>
                            )}

                        </div>
                    </div>
                </div>

                <div className={`flex ${!selectDia ? "justify-start" : "justify-between"}`}>
                    <Button variant="ghost" onClick={backPage}>Voltar</Button>
                    <Button variant="destructive" className={`${!selectDia ? "hidden" : "flex"}`}><Trash2 /></Button>
                </div>
            </main>
        </>
    );
}