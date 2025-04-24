import { Barbeiro } from "@/types/barbeiros";
import { Button } from "../ui/button";

type Props = {
    item: Barbeiro;
    onClick: (id: string) => void;
    isSelected: boolean;
};

export const ItemBarbeiro = ({ item, onClick, isSelected }: Props) => {
    return (
        <Button
            onClick={() => onClick(item.id)}
            variant={isSelected ? "default" : "outline"}
            className={isSelected ? "bg-primary text-white dark:text-black" : ""}
        >
            {item.nome}
        </Button>
    );
};