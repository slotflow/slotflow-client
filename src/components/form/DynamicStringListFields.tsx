import { ChangeEvent } from 'react';
import { Plus, Trash2 } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

interface DynamicStringListFieldProps {
  label: string;
  placeholder?: string;
  values: string[];
  errors?: Array<string | undefined>;
  arrayError?: string;
  onChange: (values: string[]) => void;
  maxLength?: number;
  helperText?: string;
}

const DynamicStringListField = ({
  label,
  placeholder = 'Enter value',
  values,
  errors = [],
  arrayError,
  onChange,
  maxLength,
  helperText,
}: DynamicStringListFieldProps) => {
  const updateValues = (updatedValues: string[]): void => {
    onChange(updatedValues);
  };

  const handleFieldChange = (
    index: number,
    value: string,
  ): void => {
    const hasMultipleValues = /[,\n]/.test(value);

    if (!hasMultipleValues) {
      const updatedValues = [...values];

      updatedValues[index] = value;

      updateValues(updatedValues);

      return;
    }

    const pastedValues = value
      .split(/[,\n]+/)
      .map((item) => item.trim())
      .filter(Boolean);

    if (!pastedValues.length) {
      return;
    }

    const updatedValues = [...values];

    updatedValues[index] = pastedValues.shift() ?? '';

    const emptyIndexes = updatedValues
      .map((item, fieldIndex) =>
        fieldIndex !== index && !item.trim()
          ? fieldIndex
          : -1,
      )
      .filter((fieldIndex) => fieldIndex !== -1);

    emptyIndexes.forEach((emptyIndex) => {
      if (!pastedValues.length) {
        return;
      }

      updatedValues[emptyIndex] =
        pastedValues.shift() ?? '';
    });

    if (pastedValues.length > 0) {
      updatedValues.push(...pastedValues);
    }

    updateValues(updatedValues);
  };

  const handleAdd = (): void => {
    updateValues([...values, '']);
  };

  const handleRemove = (index: number): void => {
    if (values.length === 1) {
      return;
    }

    const updatedValues = values.filter(
      (_, valueIndex) => valueIndex !== index,
    );

    updateValues(updatedValues);
  };

  const handleChange = (
    index: number,
    event: ChangeEvent<HTMLInputElement>,
  ): void => {
    handleFieldChange(index, event.target.value);
  };

  return (
    <div className="space-y-4 w-full">
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <label className="text-xs md:text-sm font-medium">
            {label}
          </label>
        </div>

        <div className="space-y-2 overflow-y-auto pr-1">
          {values.map((value, index) => {
            const fieldError = errors[index];

            return (
              <div
                key={index}
                className="space-y-1"
              >
                <div className="flex items-center gap-2 group animate-in fade-in slide-in-from-top-1 duration-200">
                  <div className="relative flex-1">
                    <Input
                      type="text"
                      placeholder={placeholder}
                      value={value}
                      onChange={(event) =>
                        handleChange(index, event)
                      }
                      maxLength={maxLength}
                      className={`pr-10 focus:border-[var(--mainColor)] focus-visible:ring-0 ${
                        fieldError
                          ? 'border-destructive focus:border-destructive'
                          : ''
                      }`}
                    />
                  </div>

                  {values.length > 1 && (
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      onClick={() => handleRemove(index)}
                      className="cursor-pointer h-9 w-9 text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-colors"
                      title="Remove"
                    >
                      <Trash2 className="size-4" />
                    </Button>
                  )}

                  {index === values.length - 1 && (
                    <Button
                      type="button"
                      variant="outline"
                      size="icon"
                      onClick={handleAdd}
                      className="cursor-pointer h-9 w-9 border-dashed text-primary hover:bg-primary/10 transition-colors"
                      title="Add"
                    >
                      <Plus className="size-4" />
                    </Button>
                  )}
                </div>

                {fieldError && (
                  <p className="text-[var(--error-color)] text-xs px-2">
                    {fieldError}
                  </p>
                )}
              </div>
            );
          })}
        </div>

        {arrayError && (
          <p className="text-[var(--error-color)] text-xs px-2">
            {arrayError}
          </p>
        )}

        {helperText && (
          <p className="text-xs text-muted-foreground">
            {helperText}
          </p>
        )}
      </div>
    </div>
  );
};

export default DynamicStringListField;