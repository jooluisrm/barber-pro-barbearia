import { Barbeiro } from "@/types/barbeiros";
import { Button } from "../ui/button";

type Props = {
    item: Barbeiro;
}

export const ItemBarbeiro = ({item}: Props) => {
    return (
        <Button variant={"outline"}>
            {item.nome}
        </Button>
    );
}