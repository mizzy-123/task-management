import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export interface SelectOption {
  value: string;
  label: string;
}

export interface SelectBasicProps {
  placeholder?: string;
  options: SelectOption[];
  groupLabel?: string;
  value?: string;
  onValueChange?: (value: string) => void;
  className?: string;
}

export default function SelectBasic({
  placeholder = "Select an option",
  options = [],
  groupLabel,
  value,
  onValueChange,
  className = "w-45",
}: SelectBasicProps) {
  return (
    <Select value={value} onValueChange={onValueChange}>
      <SelectTrigger className={className}>
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          {groupLabel && <SelectLabel>{groupLabel}</SelectLabel>}
          {options.map((option) => (
            <SelectItem key={option.value} value={option.value}>
              {option.label}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
