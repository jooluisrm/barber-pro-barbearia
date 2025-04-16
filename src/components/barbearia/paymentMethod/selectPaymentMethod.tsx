import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"

type Props = {
    handleSelectPayment: (value: string) => void;
}


export const SelectPaymentMethod = ({ handleSelectPayment }: Props) => {
    return (
        <Select onValueChange={handleSelectPayment}>
            <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Selecionar" />
            </SelectTrigger>
            <SelectContent>
                <SelectGroup>
                    <SelectLabel>Pagamentos</SelectLabel>
                    <SelectItem value="Pix">Pix</SelectItem>
                    <SelectItem value="Dinheiro">Dinheiro</SelectItem>
                    <SelectItem value="Cartão de Crédito">Cartão de Crédito</SelectItem>
                    <SelectItem value="Cartão de Débito">Cartão de Débito</SelectItem>
                    <SelectItem value="Vale Alimentação">Vale Alimentação</SelectItem>
                </SelectGroup>
            </SelectContent>
        </Select>
    )
}
