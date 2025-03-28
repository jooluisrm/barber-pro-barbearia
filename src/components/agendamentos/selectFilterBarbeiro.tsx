import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Barbeiro } from "@/types/barbeiros";

type Props = {
    handleSelect: (value: string) => void;
    barbeiros: Barbeiro[] | null;
}

export const SelectFilterBarbeiro = ({ handleSelect, barbeiros }: Props) => {
    return (
        <Select onValueChange={handleSelect} defaultValue="todos">
            <SelectTrigger className="min-w-[180px]">
                <SelectValue placeholder="Filtar Barbeiros" />
            </SelectTrigger>
            <SelectContent>
                <SelectGroup>
                    <SelectLabel>Barbeiros</SelectLabel>
                    {barbeiros && barbeiros.map((item) => (
                        <SelectItem key={item.id} value={item.id}>{item.nome}</SelectItem>
                    ))}
                    <SelectItem value="todos">Todos</SelectItem>
                </SelectGroup>
            </SelectContent>
        </Select>
    );
}