import { useState } from 'react';
import { Textarea } from '../ui/textarea';
import { Eye, EyeOff } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { type FieldValues } from 'react-hook-form';
import FormLabelWithInfo from './FormLabelWithInfo';
import { CustomValidator } from '@/shared/utils/validator';
import { FormFieldProps } from '@/shared/interface/componentInterface';

const FormField = <T extends FieldValues>({
  id,
  label,
  type = 'text',
  placeholder,
  autoComplete,
  error,
  register,
  registerOptions,
  showTogglePassword = false,
  onFileSelect,
  rows = 3,
  defaultValue,
  readOnly,
  required = false,
  accept = 'image/png, image/jpeg',
  infoText,
  onChange,
}: FormFieldProps<T>) => {
  const [show, setShow] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState<number | null>(null);

  const handlePasswordStrength = (val: string) => {
    if (type === 'password' && val) {
      const result = CustomValidator.validator('password', val);
      setPasswordStrength(result?.point ?? null);
    } else {
      setPasswordStrength(null);
    }
  };

  const inputType =
    showTogglePassword && (type === 'password' || type === 'text')
      ? show
        ? 'text'
        : 'password'
      : type;

  return (
    <div className="space-y-2">
      <FormLabelWithInfo 
        label={label}
        htmlFor={id}
        infoText={infoText}
      />
      {type === 'file' ? (
        <Input
          id={id}
          type="file"
          accept={accept}
          required={required}
          {...register(id, registerOptions)}
          onChange={(e) => {
            const file: File | undefined = (e.target as HTMLInputElement).files?.[0];
            if (file && onFileSelect) {
              const imageUrl = URL.createObjectURL(file);
              onFileSelect(imageUrl);
            }
            registerOptions?.onChange?.(e);
          }}
          className={`${error ? 'border-destructive' : ''}`}
        />
      ) : type === 'text' || type === 'password' || type === 'number' || type === 'email' ? (
        <div className="relative">
          <Input
            id={id}
            required={required}
            type={inputType}
            readOnly={readOnly}
            autoComplete={autoComplete}
            defaultValue={defaultValue as string | number}
            placeholder={placeholder}
            {...register(id, {
              valueAsNumber: type === 'number',
              onChange: (e) => {
                handlePasswordStrength(e.target.value);
                if (onChange) onChange(e);
              },
            })}
            className={`
            ${type === 'password' && error && 'border-destructive'}
            ${
              passwordStrength !== null
                ? passwordStrength <= 25
                  ? 'focus:border-red-500 border-red-500'
                  : passwordStrength <= 50
                    ? 'focus:border-orange-500 border-orange-500'
                    : passwordStrength <= 75
                      ? 'focus:border-yellow-500 border-yellow-500'
                      : passwordStrength === 100
                        ? 'focus:border-green-500 border-green-500'
                        : 'focus:border-(--mainColor)'
                : error
                  ? 'focus:border-destructive border-destructive'
                  : 'focus:border-(--mainColor)'
            }
            `}
          />
          {showTogglePassword && (
            <button
              type="button"
              onClick={() => setShow(!show)}
              className="absolute inset-y-0 right-0 pr-3 flex items-center text-muted-foreground"
            >
              {show ? <Eye /> : <EyeOff />}
            </button>
          )}
        </div>
      ) : (
        type === 'textarea' && (
          <Textarea
            id={id}
            required={required}
            defaultValue={defaultValue as string}
            rows={rows}
            readOnly={readOnly}
            placeholder={placeholder}
            {...register(id, registerOptions)}
            className={`${error ? 'border-destructive' : ''}`}
          />
        )
      )}
      {error && <p className="text-[var(--error-color)] text-xs px-2 line-clamp-4">{error}</p>}
    </div>
  );
};

export default FormField;
