"use client"

import { format, parse } from "date-fns"
import { CalendarIcon } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { useEffect } from "react"

type Props = {
  date: any;
  setDate: any;
}

export function CalendarioFilter({ date, setDate }: Props) {
  useEffect(() => {
    if (!date) {
      setDate(format(new Date(), "yyyy-MM-dd")); // Armazena a data no formato "yyyy-MM-dd"
    }
  }, [date, setDate]);

  const handleSelect = (selectedDate: Date | undefined) => {
    if (selectedDate) {
      setDate(format(selectedDate, "yyyy-MM-dd")); // Salva sempre no formato "yyyy-MM-dd"
    }
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={cn(
            "w-[240px] justify-start text-left font-normal",
            !date && "text-muted-foreground"
          )}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {date ? format(parse(date, "yyyy-MM-dd", new Date()), "PPP") : <span>Escolha uma data</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <Calendar
          mode="single"
          selected={date ? parse(date, "yyyy-MM-dd", new Date()) : undefined}
          onSelect={handleSelect}
          initialFocus
        />
      </PopoverContent>
    </Popover>
  )
}
