"use client"

import * as React from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"
import { Minus, Plus } from "lucide-react"

interface InputNumberProps {
  value?: number
  onChange?: (value: number | undefined) => void
  min?: number
  max?: number
  step?: number
  className?: string
  disabled?: boolean
}

export function InputNumber({
  value,
  onChange,
  min,
  max,
  step = 1,
  className,
  disabled,
  ...params
}: InputNumberProps) {
  const handleChange = (val: number | undefined) => {
    if (onChange) {
      onChange(val)
    }
  }

  const increment = () => {
    if (value === undefined) return handleChange(min ?? 0)
    if (max !== undefined && value + step > max) return
    handleChange(value + step)
  }

  const decrement = () => {
    if (value === undefined) return handleChange(min ?? 0)
    if (min !== undefined && value - step < min) return
    handleChange(value - step)
  }

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value
    if (val === "") {
      handleChange(undefined)
    } else {
      const parsed = parseFloat(val)
      if (!isNaN(parsed)) {
        handleChange(parsed)
      }
    }
  }

  return (
    <div className={cn("flex items-center space-x-1", className)}>
      <Input
        type="number"
        value={value ?? ""}
        onChange={handleInput}
        min={min}
        max={max}
        step={step}
        disabled={disabled}
        {...params}
      />
      <Button
        type="button"
        variant="outline"
        size="icon"
        onClick={decrement}
        disabled={disabled}
      >
        <Minus className="h-4 w-4" />
      </Button>
      <Button
        type="button"
        variant="outline"
        size="icon"
        onClick={increment}
        disabled={disabled}
      >
        <Plus className="h-4 w-4" />
      </Button>
    </div>
  )
}
