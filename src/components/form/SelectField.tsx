import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from '@/components/ui/select';
import { Input } from '../ui/input';
import { FieldValues } from 'react-hook-form';
import FormLabelWithInfo from './FormLabelWithInfo';
import { SelectFieldProps } from '@/shared/interface/componentInterface';

const SelectField = <T extends FieldValues, K>({
  id,
  label,
  options,
  placeholder = 'Select an option',
  error,
  register,
  required = false,
  defaultValue,
  infoText,
}: SelectFieldProps<T, K>) => {
  const reg = register(id);

  // FULLY TYPE-SAFE PARSER — NO ANY
  const parseValue = (value: string): string | number | boolean => {
    if (value === 'true') return true;
    if (value === 'false') return false;

    if (!isNaN(Number(value)) && value.trim() !== '') {
      return Number(value);
    }

    return value;
  };

  return (
    <div className="space-y-2">
      <FormLabelWithInfo label={label} htmlFor={id} infoText={infoText} />

      <Input
        type="hidden"
        name={reg.name}
        ref={reg.ref}
        defaultValue={defaultValue !== undefined ? String(defaultValue) : undefined}
      />

      <Select
        defaultValue={defaultValue !== undefined ? String(defaultValue) : undefined}
        onValueChange={(val) => {
          const parsedValue = parseValue(val);

          reg.onChange({
            target: { name: reg.name, value: parsedValue },
          });
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

      {error && (
        <p className="text-xs text-red-500">{typeof error === 'string' ? error : error.message}</p>
      )}
    </div>
  );
};

export default SelectField;
