import * as React from "react";
import { ReactElement, useMemo, useState } from "react";
import { format } from "date-fns";
// eslint-disable-next-line import/no-duplicates
import { ru } from "date-fns/locale";
import { Calendar as CalendarIcon, X as XIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

type DateType = Date | null;

type DatePickerProps = {
  value: DateType;
  onChange: (value: DateType) => void;
  placeholder?: string;
  label?: string | ReactElement;
  error?: string | ReactElement;
};

export function DatePicker({ value, onChange, placeholder, label, error }: DatePickerProps) {
  const [isOpen, setIsOpen] = useState(false);

  const isActive = useMemo(() => isOpen || value, [isOpen, value]);

  function resetDate(e: React.MouseEvent) {
    e.stopPropagation();
    onChange(null);
    setIsOpen(false);
  }

  function onSelectInternal(value: Date | undefined) {
    onChange(value ?? null);
    setIsOpen(false);
  }

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="default"
          className={cn(
            "relative w-full h-14 bg-gray-1 justify-between border border-transparent text-left font-normal mb-6",
            !value && "text-muted-foreground",
            isOpen && "bg-white border-gray-3",
            error && "bg-red-soft border-none focus:border-none",
          )}
        >
          <div className={cn("absolute flex items-center top-0 bottom-0")}>
            <div
              className={cn("leading-none select-none text-base text-gray-3 transition-all", {
                "text-xs -translate-y-[0.875rem]": isActive,
                "text-red": error,
              })}
            >
              {label}
            </div>
          </div>
          <div className={cn("text-base text-black pt-4 transition-opacity opacity-0", { "opacity-100": isActive })}>
            {value ? format(value, "dd.LL.yyyy", { locale: ru }) : <span>{placeholder}</span>}
          </div>
          <div className="flex space-x-2 items-center">
            <XIcon
              className={cn("h-5 w-5 text-gray-3", "opacity-0 transition-opacity pointer-events-none", {
                "opacity-100 pointer-events-auto": value,
              })}
              onClick={resetDate}
              aria-label="clear"
            >
              x
            </XIcon>
            <CalendarIcon className="mr-2 h-5 w-5 text-gray-3" />
          </div>
          <div className="absolute -bottom-5 text-sm text-red">{error}</div>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0 bg-white">
        <Calendar mode="single" selected={value ?? undefined} onSelect={onSelectInternal} initialFocus />
      </PopoverContent>
    </Popover>
  );
}
