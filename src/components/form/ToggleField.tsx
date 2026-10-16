import { Switch } from '@/components/ui/switch';
import FormLabelWithInfo from './FormLabelWithInfo';
import { Control, Controller, FieldValues, Path } from 'react-hook-form';

interface ToggleFieldProps<T extends FieldValues> {
  id: Path<T>;
  label: string;
  control: Control<T>;
  infoText?: string;
  description?: string;
  disabled?: boolean;
  error?: string;
}

const ToggleField = <T extends FieldValues>({
  id,
  label,
  control,
  infoText,
  description,
  disabled = false,
  error,
}: ToggleFieldProps<T>) => {
  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between rounded-lg border border-zinc-200 dark:border-zinc-800 p-3 shadow-xs">
        <div className="space-y-0.5">
          <FormLabelWithInfo label={label} htmlFor={id} infoText={infoText} />
          {description && <p className="text-xs text-muted-foreground">{description}</p>}
        </div>
        <Controller
          name={id}
          control={control}
          render={({ field: { value, onChange } }) => (
            <Switch
              id={id}
              checked={!!value}
              onCheckedChange={onChange}
              disabled={disabled}
              className="cursor-pointer"
            />
          )}
        />
      </div>
      {error && <p className="text-red-600 text-xs font-semibold px-2 line-clamp-4">{error}</p>}
    </div>
  );
};

export default ToggleField;
