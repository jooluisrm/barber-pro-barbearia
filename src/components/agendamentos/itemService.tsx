import { Services } from "@/types/services";
import { Button } from "../ui/button";

type Props = {
    item: Services;
}

export const ItemService = ({ item }: Props) => {
    return (
        <Button variant={"outline"}>
            {item.nome}
        </Button>
    );
}