import { HorariosDisponiveis } from "@/types/barbeiros";
import { Button } from "../ui/button";

type Props = {
    item: HorariosDisponiveis;
    onClick: (id: string) => void;
    isSelected: boolean;
}

export const ItemHorario = ({ item, onClick, isSelected }: Props) => {
    return (
        <Button
            onClick={() => onClick(item.hora)}
            variant={isSelected ? "default" : "outline"}
            className={isSelected ? "bg-primary text-white dark:text-black" : ""}
        >
            {item.hora}
        </Button>
    );
}