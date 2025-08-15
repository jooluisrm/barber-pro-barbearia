"use client"

import { format } from "date-fns" // Apenas 'format' é necessário aqui
import { ptBR } from "date-fns/locale"; // Importar o locale para datas em português
import { CalendarIcon } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"

// 1. Tipagem correta e mais segura para as props
type Props = {
    date: Date;
    setDate: any;
}

export function CalendarioFilter({ date, setDate }: Props) {
    // 2. O useEffect foi removido. A data inicial agora é controlada
    //    pelo componente pai (MainAgendamentos), que é o correto.

    // 3. O handleSelect agora simplesmente passa o objeto Date diretamente, sem formatar
    const handleSelect = (selectedDate: any ) => {
        setDate(selectedDate);
    };

    return (
        <Popover>
            <PopoverTrigger asChild>
                <Button
                    variant={"outline"}
                    className={cn(
                        "w-[240px] justify-start text-left font-normal",
                        !date && "text-muted-foreground"
                    )}
                >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {/* 4. A renderização foi simplificada: se 'date' é um objeto Date, apenas o formatamos */}
                    {date ? format(date, "PPP", { locale: ptBR }) : <span>Escolha uma data</span>}
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                    mode="single"
                    // 5. 'selected' agora recebe o objeto 'date' diretamente
                    selected={date} 
                    onSelect={handleSelect}
                    initialFocus
                />
            </PopoverContent>
        </Popover>
    )
}