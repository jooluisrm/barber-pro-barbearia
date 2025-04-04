import { cn } from "@/lib/utils";
import { HorariosDeTrabalho } from "@/types/barbeiros";
import { Clock, Pencil } from "lucide-react";
import { Button } from "../ui/button";

type Props = {
    item: HorariosDeTrabalho;
}

export const ItemHorariosTrabalho = ({ item }: Props) => {
    return (
        <div className={cn(
            "flex items-center justify-center rounded-lg border",
            "bg-card text-card-foreground hover:bg-accent/50",
            "transition-colors duration-200 cursor-pointer",
            "group hover:shadow-sm px-5 py-2"
        )}>
            <div className="flex items-center justify-center">
                <span className="font-bold">{item.hora}</span>
            </div>
        </div>
    )
}