import * as React from "react"

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
    handleSelect: (value: string) => void;
}

export const SelectFilter = ({handleSelect}: Props) => {
    return (
        <Select onValueChange={handleSelect} defaultValue="confirmado">
            <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filtar Agendamentos" />
            </SelectTrigger>
            <SelectContent>
                <SelectGroup>
                    <SelectLabel>Status</SelectLabel>
                    <SelectItem value="confirmado">Confirmado</SelectItem>
                    <SelectItem value="feito">Feito</SelectItem>
                    <SelectItem value="cancelado">Cancelado</SelectItem>
                    <SelectItem value="todos">Todos</SelectItem>
                </SelectGroup>
            </SelectContent>
        </Select>
    );
}