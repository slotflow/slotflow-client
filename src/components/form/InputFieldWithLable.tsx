import { memo, useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { CustomValidator } from "@/utils/validator";
import { UseFormRegister, FieldValues, Path } from "react-hook-form";

interface InputFieldProps<TFieldValues extends FieldValues> {
  label: string;
  id: Path<TFieldValues>;
  name: string;
  placeholder?: string;
  type?: string;
  required?: boolean;
  isPassword?: boolean;
  register: UseFormRegister<TFieldValues>;
  error?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const InputField = <TFieldValues extends FieldValues>({
  label,
  id,
  placeholder,
  type = "text",
  required,
  isPassword = false,
  register,
  error,
  onChange,
}: InputFieldProps<TFieldValues>) => {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState<number | null>(null);

  const togglePasswordVisibility = (): void => {
    setPasswordVisible((prev) => !prev);
  };

  const handlePasswordStrength = (val: string) => {
    if (id === "password" && val) {
      const result = CustomValidator.validator("password", val);
      setPasswordStrength(result?.point ?? null);
    } else {
      setPasswordStrength(null);
    }
  };

  return (
    <div>
      <div className="flex justify-between">
        <label htmlFor={String(id)} className="block text-xs md:text-sm font-medium text-[var(--textTwo)] hover:text-[var(--textTwoHover)]">
          {label}
        </label>
      </div>

      <div className="mt-2">
        <div className="relative">
          <input
            id={String(id)}
            placeholder={placeholder}
            type={isPassword ? (passwordVisible ? "text" : "password") : type}
            required={required}
            {...register(id, {
              onChange: (e) => {
                handlePasswordStrength(e.target.value);
                if (onChange) onChange(e);
              },
            })}
            className={`block w-full rounded-md bg-[var(--inputBg)] px-2 py-2 md:px-3 md:py-2.5 text-[var(--textOne)] outline-1 -outline-offset-1 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 text-sm md:text-[16px]
              ${
                passwordStrength !== null
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
              }`}
          />

          {isPassword && (
            <button
              type="button"
              className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400"
              onClick={togglePasswordVisibility}
            >
              {passwordVisible ? <Eye /> : <EyeOff />}
            </button>
          )}
        </div>

        {error && <span className="text-[var(--error-color)] text-xs px-2 line-clamp-4">{error}</span>}
      </div>
    </div>
  );
};

export default memo(InputField) as typeof InputField;

