import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"

type Props = {
    handleSelect: (value: "Confirmado" | "Feito" | "Cancelado") => void;
    status: string;
}

export const SelectStatus = ({ status, handleSelect }: Props) => {
    return (
        <Select onValueChange={handleSelect} defaultValue={status}>
            <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filtar Agendamentos" />
            </SelectTrigger>
            <SelectContent>
                <SelectGroup>
                    <SelectLabel>Status</SelectLabel>
                    <SelectItem value="Confirmado">Confirmado</SelectItem>
                    <SelectItem value="Feito">Feito</SelectItem>
                    <SelectItem value="Cancelado">Cancelado</SelectItem>
                </SelectGroup>
            </SelectContent>
        </Select>
    );
}