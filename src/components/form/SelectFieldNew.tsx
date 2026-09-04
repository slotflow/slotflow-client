import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from '@/components/ui/select';
import FormLabelWithInfo from './FormLabelWithInfo';
import { FieldValues, Control, Controller, Path } from 'react-hook-form';

interface SelectOption<K> {
  label: string;
  value: K;
}

interface SelectFieldProps<T extends FieldValues, K> {
  id: Path<T>;
  label: string;
  options: SelectOption<K>[];
  placeholder?: string;
  error?: string;
  control: Control<T>; // Use control instead of register/setValue
  required?: boolean;
  infoText?: string;
}

const SelectField = <T extends FieldValues, K>({
  id,
  label,
  options,
  placeholder = 'Select an option',
  error,
  control,
  required = false,
  infoText,
}: SelectFieldProps<T, K>) => {
  const parseValue = (val: string): string | number | boolean => {
    if (val === 'true') return true;
    if (val === 'false') return false;
    if (!isNaN(Number(val)) && val.trim() !== '') {
      return Number(val);
    }
    return val;
  };

  return (
    <div className="space-y-2">
      <FormLabelWithInfo label={label} htmlFor={id} infoText={infoText} />

      <Controller
        name={id}
        control={control}
        render={({ field }) => {
          const stringifiedValue =
            field.value !== undefined && field.value !== null ? String(field.value) : '';

          return (
            <Select
              value={stringifiedValue}
              onValueChange={(val) => {
                // Ignore empty strings emitted by Radix UI internally
                if (!val) return;
                const parsedValue = parseValue(val);
                field.onChange(parsedValue);
              }}
              required={required}
            >
              <SelectTrigger className={`w-full ${error ? 'border-red-500' : ''}`}>
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
          );
        }}
      />

      {error && <p className="text-xs text-red-500">{error}</p>}
    </div>
  );
};

export default SelectField;
