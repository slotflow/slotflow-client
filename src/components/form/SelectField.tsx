import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from '@/components/ui/select';
import { Input } from '../ui/input';
import FormLabelWithInfo from './FormLabelWithInfo';
import { SelectFieldProps } from '@/shared/types/component';
import { FieldValues, Path, PathValue } from 'react-hook-form';

const SelectField = <T extends FieldValues, K>({
  id,
  label,
  options,
  placeholder = 'Select an option',
  error,
  register,
  setValue,
  required = false,
  defaultValue,
  infoText,
}: SelectFieldProps<T, K>) => {
  const reg = register(id);

  // FULLY TYPE-SAFE PARSER — NO ANY
  const parseValue = (val: string): string | number | boolean => {
    if (val === 'true') return true;
    if (val === 'false') return false;
    if (!isNaN(Number(val)) && val.trim() !== '') {
      return Number(val);
    }
    console.log('parsed value : ', val);
    return val;
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
          setValue(id as Path<T>, parsedValue as PathValue<T, Path<T>>, {
            shouldValidate: true,
            shouldDirty: true,
            shouldTouch: true,
          });
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
