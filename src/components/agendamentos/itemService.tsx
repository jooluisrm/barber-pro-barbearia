import { Services } from "@/types/services";
import { Button } from "../ui/button";

type Props = {
    item: Services;
    onClick: (id: string) => void;
    isSelected: boolean;
}

export const ItemService = ({ item, onClick, isSelected }: Props) => {
    return (
        <Button
            onClick={() => onClick(item.id)}
            variant={isSelected ? "default" : "outline"}
            className={isSelected ? "bg-primary text-white dark:text-black" : ""}
        >
            {item.nome}
        </Button>
    );
}