import { cn } from "@/lib/utils";
import { HorariosDeTrabalho } from "@/types/barbeiros";
import { Clock, Pencil } from "lucide-react";
import { Button } from "../ui/button";

type Props = {
    item: HorariosDeTrabalho;
    toggleSelectTime: (itemTime: HorariosDeTrabalho) => void;
    selected: boolean;
};


export const ItemHorariosTrabalho = ({ item, toggleSelectTime, selected }: Props) => {
    return (
        <div
            className={cn(
                "flex items-center justify-center rounded-lg border",
                "transition-colors duration-200 cursor-pointer group hover:shadow-sm px-5 py-2",
                selected ? "bg-primary dark:text-black text-white" : "bg-card text-card-foreground hover:bg-accent/50"
            )}
            onClick={() => toggleSelectTime(item)}
        >
            <div className="flex items-center justify-center">
                <span className="font-bold">{item.hora}</span>
            </div>
        </div>

    )
}