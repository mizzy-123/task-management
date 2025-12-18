"use client";

import * as React from "react";
import { ChevronDownIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

export interface DatePickerBasicProps {
  placeholder?: string;
  value?: Date;
  onChange?: (date: Date | undefined) => void;
  className?: string;
  buttonClassName?: string;
  format?: (date: Date) => string;
}

export function DatePickerBasic({
  placeholder = "Select date",
  value,
  onChange,
  className,
  buttonClassName = "w-48 justify-between font-normal",
  format = (date) => date.toLocaleDateString(),
}: DatePickerBasicProps) {
  const [open, setOpen] = React.useState(false);

  return (
    <div className={className}>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button variant="outline" id="date" className={buttonClassName}>
            {value ? format(value) : placeholder}
            <ChevronDownIcon />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto overflow-hidden p-0" align="start">
          <Calendar
            mode="single"
            selected={value}
            captionLayout="dropdown"
            onSelect={(date) => {
              onChange?.(date);
              setOpen(false);
            }}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
}
