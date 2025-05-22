import { CirclePlus, Newspaper, Plus, Save } from "lucide-react";
import { Button } from "../ui/button";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip"

type Props = {
    onCLick: (value: boolean) => void;
}

export const NovoItem = ({ onCLick }: Props) => {
    return (
        <TooltipProvider>
            <Tooltip>
                <TooltipTrigger asChild>
                    <Button onClick={() => onCLick(true)}>
                        <Plus />
                    </Button>
                </TooltipTrigger>
                <TooltipContent>
                    <p>Novo</p>
                </TooltipContent>
            </Tooltip>
        </TooltipProvider>
    );
}