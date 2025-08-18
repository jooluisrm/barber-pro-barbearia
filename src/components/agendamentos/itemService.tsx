import { Services } from "@/types/services";
import { Button } from "../ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

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
            className={`h-fit w-28 ${isSelected ? "bg-primary text-white dark:text-black" : ""}`}
        >
            <div className="overflow-hidden truncate">
                <Avatar className="mx-auto">
                    <AvatarImage src={`${item?.imagemUrl || "/favicon.png"}`}/>
                    <AvatarFallback>CN</AvatarFallback>
                </Avatar>
                <span className="truncate">{item.nome}</span>
            </div>
        </Button>
    );
}