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

export function DialogNovoAgendamento() {
    const { barbearia } = useAuth();

    const [date, setDate] = useState<Date>();
    const [services, setServices] = useState<Services[] | null>(null);

    useEffect(() => {
        if (!barbearia) return;
        const carregarServicos = async () => {
            const dados = await getServices(barbearia.id);
            if (dados) {
                setServices(dados);
                console.log(dados)
            }
        }
        carregarServicos();
    }, [barbearia]);

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="default" className="font-bold">Criar Agendamento</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Criar Novo Agendamento</DialogTitle>
                    <DialogDescription>
                        Crie um agendamento para Visitantes.
                    </DialogDescription>
                </DialogHeader>
                <div>
                    <CalendarioNovoAgendamento date={date} setDate={setDate} />
                    <div className="py-3">
                        <h1>Selecione um Serviço:</h1>
                        <div className="flex flex-wrap gap-2 py-2">
                            {
                                services && services.map((item) => (
                                    <ItemService item={item} />
                                ))
                            }
                        </div>
                    </div>

                </div>
                <DialogFooter>
                    <Button type="submit">Criar</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
