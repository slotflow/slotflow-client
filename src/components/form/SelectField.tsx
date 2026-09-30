import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from '@/components/ui/select';
import FormLabelWithInfo from './FormLabelWithInfo';
import { FieldValues, Control, Controller, Path } from 'react-hook-form';
import { formatString } from '@/shared/utils/helper/formatString';

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
  
  return (
   <div className="space-y-2">
      <FormLabelWithInfo label={label} htmlFor={id} infoText={infoText} />

      <Controller
        name={id}
        control={control}
        render={({ field }) => {
          const selectValue =
            field.value !== undefined && field.value !== null && field.value !== ''
              ? String(field.value)
              : undefined;

          return (
            <Select
              value={selectValue}
              onValueChange={(selectedStringVal) => {
                if (selectedStringVal === undefined || selectedStringVal === null) return;

                // Match exact option value (preserves ENUM, boolean, number types)
                const matchedOption = options.find(
                  (opt) => String(opt.value) === selectedStringVal
                );

                if (matchedOption) {
                  field.onChange(matchedOption.value);
                  return;
                }

                if (selectedStringVal === 'true') field.onChange(true);
                else if (selectedStringVal === 'false') field.onChange(false);
                else if (!isNaN(Number(selectedStringVal)) && selectedStringVal.trim() !== '') {
                  field.onChange(Number(selectedStringVal));
                } else {
                  field.onChange(selectedStringVal);
                }
              }}
              required={required}
            >
              <SelectTrigger className={`cursor-pointer w-full ${error ? 'border-red-500' : ''}`}>
                <SelectValue placeholder={placeholder} />
              </SelectTrigger>

              <SelectContent>
                {options.map((opt) => (
                  <SelectItem key={String(opt.value)} value={String(opt.value)} className="cursor-pointer">
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
