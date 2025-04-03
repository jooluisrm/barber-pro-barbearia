import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"


export const SelectDiaSemana = () => {
    return (
        <Select>
            <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Dia da Semana" />
            </SelectTrigger>
            <SelectContent>
                <SelectItem value="0">Domingo</SelectItem>
                <SelectItem value="1">Segunda-feira</SelectItem>
                <SelectItem value="2">Terça-feira</SelectItem>
                <SelectItem value="3">Quarta-feira</SelectItem>
                <SelectItem value="4">Quinta-feira</SelectItem>
                <SelectItem value="5">Sexta-feira</SelectItem>
                <SelectItem value="6">Sábado</SelectItem>
            </SelectContent>
        </Select>

    );
}