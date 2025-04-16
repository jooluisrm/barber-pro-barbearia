"use client"
import { Check, ChevronsUpDown } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from "@/components/ui/command"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { gerarHorarios } from "@/utils/gerarHorarios"
import { useState } from "react"



type Props = {
    value: string;
    setValue: (value: string) => void;
}

export const SelectHourEnd = ({ value, setValue }: Props) => {
    const [open, setOpen] = useState(false);

    const horariosDisponiveis = gerarHorarios("00:00", "23:30", 30);

    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <Button
                    variant="outline"
                    role="combobox"
                    aria-expanded={open}
                    className="w-[110px] justify-between"
                >
                    {value
                        ? horariosDisponiveis.find((framework) => framework.value === value)?.label
                        : "Fim"}
                    <ChevronsUpDown className="opacity-50" />
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[110px] p-0">
                <Command>
                    <CommandInput placeholder="Buscar" className="h-9" />
                    <CommandList>
                        <CommandEmpty>Horário Inválido!</CommandEmpty>
                        <CommandGroup>
                            {horariosDisponiveis.map((framework, index) => (
                                <CommandItem
                                    key={index}
                                    value={framework.value}
                                    onSelect={(currentValue) => {
                                        setValue(currentValue === value ? "" : currentValue)
                                        setOpen(false)
                                    }}
                                >
                                    {framework.label}
                                    <Check
                                        className={cn(
                                            "ml-auto",
                                            value === framework.value ? "opacity-100" : "opacity-0"
                                        )}
                                    />
                                </CommandItem>
                            ))}
                        </CommandGroup>
                    </CommandList>
                </Command>
            </PopoverContent>
        </Popover>
    )
}
