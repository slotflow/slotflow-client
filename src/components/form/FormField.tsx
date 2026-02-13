import { useState } from "react";
import { Textarea } from "../ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Eye, EyeOff, Info } from "lucide-react";
import { type FieldValues } from "react-hook-form";
import { CustomValidator } from "@/utils/validator";
import { FormFieldProps } from "@/utils/interface/componentInterface/commonComponentInterface";

const FormField = <T extends FieldValues>({
  id,
  label,
  type = "text",
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
  accept = "image/png, image/jpeg",
  labelInfo,
  onChange
}: FormFieldProps<T>) => {

  const [show, setShow] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState<number | null>(null);

  const handlePasswordStrength = (val: string) => {
    if (type === "password" && val) {
      const result = CustomValidator.validator("password", val);
      setPasswordStrength(result?.point ?? null);
    } else {
      setPasswordStrength(null);
    }
  };

  const inputType =
    showTogglePassword && (type === "password" || type === "text")
      ? show
        ? "text"
        : "password"
      : type;

  return (
    <div className="space-y-2">
      <Label className="text-xs md:text-sm" htmlFor={id}>
        {label} {required && <span className="mx-1 text-red-500">*</span>}
        {labelInfo && (
          <span className="ml-1 cursor-pointer text-gray-500 text-xs relative group">
            <Info className="size-4" />
            <span
              className="
                absolute left-1/2 -translate-x-1/2 top-full mt-1
                whitespace-nowrap
                bg-black text-white text-[10px] px-2 py-1 rounded-md shadow
                opacity-0 group-hover:opacity-100 transition-opacity
                "
            >
              {labelInfo}
            </span>
          </span>
        )}
      </Label>
      {type === "file" ? (
        <Input
          id={id}
          type="file"
          accept={accept}
          required={required}
          {...register(id, registerOptions)}
          onChange={(e) => {
            const file: File | undefined = (e.target as HTMLInputElement)
              .files?.[0];
            if (file && onFileSelect) {
              const imageUrl = URL.createObjectURL(file);
              onFileSelect(imageUrl);
            }
            registerOptions?.onChange?.(e);
          }}
          className={`${error ? "border-destructive" : ""}`}
        />
      ) : type === "text" || type === "password" || type === "number" || type === "email" ? (
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
              valueAsNumber: type === "number",
              onChange: (e) => {
                handlePasswordStrength(e.target.value);
                if (onChange) onChange(e);
              },
            })}
            className={`
            ${error && "border-destructive"}
            ${passwordStrength !== null
                ? passwordStrength <= 25
                  ? "focus:outline-red-500"
                  : passwordStrength <= 50
                    ? "focus:outline-orange-500"
                    : passwordStrength <= 75
                      ? "focus:outline-yellow-500"
                      : passwordStrength === 100
                        ? "focus:outline-green-500"
                        : "focus:outline-[var(--mainColor)]"
                : error
                  ? "focus:outline-red-500"
                  : "focus:outline-[var(--mainColor)]"
              }
            `}
          />
          {showTogglePassword && (
            <button
              type="button"
              onClick={() => setShow(!show)}
              className="absolute inset-y-0 right-0 pr-3 flex items-center text-muted-foreground"
            >
              {show ? <EyeOff /> : <Eye />}
            </button>
          )}
        </div>
      ) : type === "textarea" && (
        <Textarea
          id={id}
          required={required}
          defaultValue={defaultValue as string}
          rows={rows}
          readOnly={readOnly}
          placeholder={placeholder}
          {...register(id, registerOptions)}
          className={`${error ? "border-destructive" : ""}`}
        />
      )}
      {error && <p className="text-[var(--error-color)] text-xs px-2 line-clamp-4">{error}</p>}
    </div>
  );
};

export default FormField;