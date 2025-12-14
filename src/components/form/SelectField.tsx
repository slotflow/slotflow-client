import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import {
  FieldValues,
  FieldError,
  Path,
  UseFormRegister,
} from "react-hook-form";
import { Input } from '../ui/input';

export type OptionType = {
  label: string;
  value: string | number | boolean;
};

interface SelectFieldProps<T extends FieldValues> {
  id: Path<T>;
  label: string;
  options: OptionType[];
  placeholder?: string;
  error?: FieldError | string;
  register: UseFormRegister<T>;
  required?: boolean;
  defaultValue?: string | number | boolean;
}

export const SelectField = <T extends FieldValues>({
  id,
  label,
  options,
  placeholder = "Select an option",
  error,
  register,
  required = false,
  defaultValue,
}: SelectFieldProps<T>) => {
  const reg = register(id);

  // FULLY TYPE-SAFE PARSER — NO ANY
  const parseValue = (value: string): string | number | boolean => {
    if (value === "true") return true;
    if (value === "false") return false;

    if (!isNaN(Number(value)) && value.trim() !== "") {
      return Number(value);
    }

    return value;
  };

  return (
    <div className="space-y-2">
      <Label htmlFor={id} className="text-sm">
        {label} {required && <span className="text-red-500">*</span>}
      </Label>

      <Input
        type="hidden"
        name={reg.name}
        ref={reg.ref}
        defaultValue={
          defaultValue !== undefined ? String(defaultValue) : undefined
        }
      />

      <Select
        defaultValue={
          defaultValue !== undefined ? String(defaultValue) : undefined
        }
        onValueChange={(val) => {
          const parsedValue = parseValue(val);

          reg.onChange({
            target: { name: reg.name, value: parsedValue },
          });
        }}
      >
        <SelectTrigger className={`w-full ${error ? "border-red-500" : ""}`}>
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>

        <SelectContent>
          {options.map((opt) => (
            <SelectItem key={String(opt.value)} value={String(opt.value)}>
              {opt.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      {error && (
        <p className="text-xs text-red-500">
          {typeof error === "string" ? error : error.message}
        </p>
      )}
    </div>
  );
};
