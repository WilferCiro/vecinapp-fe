"use client"

import * as React from "react"
import { CalendarIcon } from "lucide-react"
import { format } from "date-fns"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { Calendar } from "./calendar"

interface InputCalendarProps {
  value?: Date | { from: Date; to?: Date }
  onChange: (value: Date | { from: Date; to?: Date } | undefined) => void
  mode?: "single" | "range"
  placeholder?: string
  className?: string
}

export function InputCalendar({
  value,
  onChange,
  mode = "single",
  placeholder = "Selecciona fecha",
  className
}: InputCalendarProps) {
  const [open, setOpen] = React.useState(false)

  const renderLabel = () => {
    if (!value) return placeholder

    if (mode === "single" && value instanceof Date) {
      return format(value, "yyyy-MM-dd")
    }

    if (mode === "range" && typeof value === "object" && "from" in value) {
      if (value.to) {
        return `${format(value.from, "yyyy-MM-dd")} - ${format(
          value.to,
          "yyyy-MM-dd"
        )}`
      }
      return format(value.from, "yyyy-MM-dd")
    }

    return placeholder
  }

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className={cn(
            "w-full justify-start text-left font-normal",
            !value && "text-muted-foreground",
            className
          )}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {renderLabel()}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <Calendar
          mode={mode === "range" ? "range" : "single"}
          selected={value}
          onSelect={onChange}
          numberOfMonths={mode === "range" ? 2 : 1}
          {...(mode === "range" ? { required: true } : {})}
        />
      </PopoverContent>
    </Popover>
  )
}
