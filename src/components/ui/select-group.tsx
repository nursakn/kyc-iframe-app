import { ReactElement } from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select.tsx";

export type SelectGroupOption = {
  name: string;
  value: string;
};

type SelectStyleClasses = {
  selectTrigger?: string;
  selectValue?: string;
  selectContent?: string;
  selectItem?: string;
};

type SelectGroupProps = {
  value: string | undefined;
  onChange: (value: string) => void;
  options: SelectGroupOption[];
  classNames?: SelectStyleClasses;
  label?: string | ReactElement;
  error?: string | ReactElement;
  placeholder?: string;
};

export function SelectGroupCustom({
  value,
  onChange,
  options,
  classNames,
  label,
  error,
  placeholder,
}: SelectGroupProps) {
  return (
    <Select value={value} onValueChange={onChange} defaultValue="">
      <SelectTrigger className={classNames?.selectTrigger} value={value} label={label} error={error}>
        <SelectValue className={classNames?.selectValue} aria-label={value}>
          <p>{value || placeholder}</p>
        </SelectValue>
      </SelectTrigger>
      <SelectContent className={classNames?.selectContent}>
        {options.map((option) => (
          <SelectItem className={classNames?.selectItem} value={option.value} key={option.value}>
            {option.name}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
