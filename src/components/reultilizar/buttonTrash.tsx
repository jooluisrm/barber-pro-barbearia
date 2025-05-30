import { Trash, Trash2 } from "lucide-react";
import { Button } from "../ui/button";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip"


type Props = {
    deleteFunction?: () => void;
}

export const ButtonTrash = ({ deleteFunction }: Props) => {
    return (
        <TooltipProvider>
            <Tooltip>
                <TooltipTrigger>
                    <Button variant={"destructive"} onClick={deleteFunction}>
                        <Trash2 className="h-4 w-4" />
                    </Button>
                </TooltipTrigger>
                <TooltipContent>
                    <p>Deletar</p>
                </TooltipContent>
            </Tooltip>
        </TooltipProvider>
    );
}