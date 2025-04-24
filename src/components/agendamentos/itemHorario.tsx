import { HorariosDisponiveis } from "@/types/barbeiros";
import { Button } from "../ui/button";

type Props = {
    item: HorariosDisponiveis;
}

export const ItemHorario = ({ item }: Props) => {
    return (
        <Button variant={"outline"}>
            {item.hora}
        </Button>
    );
}