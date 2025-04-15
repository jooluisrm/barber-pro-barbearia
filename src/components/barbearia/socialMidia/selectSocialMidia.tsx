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
    handleSelectSocialMedia: (value: string) => void;
}

export const SelectSocialMidia = ({handleSelectSocialMedia}: Props) => {
    return (
        <Select onValueChange={(value) => handleSelectSocialMedia(value)}>
            <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Selecionar" />
            </SelectTrigger>
            <SelectContent>
                <SelectGroup>
                    <SelectLabel>Redes Sociais</SelectLabel>
                    <SelectItem value="Instagram">Instagram</SelectItem>
                    <SelectItem value="Facebook">Facebook</SelectItem>
                    <SelectItem value="TikTok">TikTok</SelectItem>
                    <SelectItem value="Youtube">Youtube</SelectItem>
                    <SelectItem value="Twitter">Twitter</SelectItem>
                </SelectGroup>
            </SelectContent>
        </Select>
    )
}
