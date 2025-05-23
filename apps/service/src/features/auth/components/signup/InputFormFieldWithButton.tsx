import { Button } from "@nova/ui/components/ui/button";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@nova/ui/components/ui/form";
import { Input } from "@nova/ui/components/ui/input";
import { cn } from "@nova/ui/lib/utils";
import { Eye, EyeClosed } from "lucide-react";
import { JSX, useState } from "react";
import { UseFormReturn } from "react-hook-form";
import { useInputFocus } from "../../hooks/useInputFocus";
import { formatPhoneNumber } from "@/src/shared/utils/formatPhoneNumber";

// StringKeys 타입 정의: T에서 string 또는 number 타입의 키만 추출
type StringKeys<T> = {
  [K in keyof T]: T[K] extends string | number ? K : never;
}[keyof T];

export function InputFormFieldWithButton<T extends Record<string, any>>({
  form,
  name,
  label,
  placeHolder,
  type = "text",
  inputMode,
  pattern,
  leftIcon,
  hasToggleIcon,
  disabled,
  btnText,
  onClick,
}: {
  form: UseFormReturn<T>;
  name: StringKeys<T>;
  label: string;
  placeHolder: string;
  type?: string;
  inputMode?: "numeric";
  pattern?: string;
  leftIcon?: JSX.Element;
  hasToggleIcon?: boolean;
  disabled?: boolean;
  btnText?: string;
  onClick?: (value: string) => void;
}) {
  const { isFocused, inputRef } = useInputFocus();
  const [showPassword, setShowPassword] = useState(false);

  return (
    <FormField
      control={form.control}
      // TODO : any가 사라졌으면 좋겠다....
      name={name as any}
      render={({ field, fieldState: { error } }) => (
        <FormItem className="space-y-1 relative">
          <div className="flex gap-2 items-center">
            <FormLabel
              className={cn(
                "t-m !font-bold ml-1 text-text01 transition-colors peer-focus:text-primary",
                error
                  ? "text-danger"
                  : isFocused
                    ? "text-primary"
                    : "text-text01"
              )}
            >
              {label}
            </FormLabel>
            <FormMessage className="b-s text-danger transition-colors" />
          </div>
          {leftIcon && (
            <div
              className={cn(
                "absolute left-2 top-[43px] -translate-y-1/2 pointer-events-none",
                error
                  ? "text-danger"
                  : isFocused
                    ? "text-primary"
                    : "text-line01"
              )}
            >
              {leftIcon}
            </div>
          )}
          <div className="flex w-full gap-2">
            <FormControl ref={inputRef}>
              <Input
                className={cn(
                  "peer b-m h-10 transition-colors rounded-sm border-line01 w-full",
                  error
                    ? "text-danger border-danger placeholder:text-danger"
                    : "focus:border-primary focus:text-primary focus:placeholder-primary",
                  leftIcon ? "pl-10" : ""
                )}
                type={hasToggleIcon && !showPassword ? "password" : type}
                placeholder={placeHolder}
                disabled={disabled}
                {...(inputMode ? { inputMode } : {})}
                {...(pattern ? { pattern } : {})}
                {...field}
                value={
                  type === "tel" && typeof field.value === "string"
                    ? formatPhoneNumber(field.value)
                    : field.value
                }
                onChange={(e) => {
                  const newValue = e.target.value;
                  const formatted =
                    type === "tel" ? formatPhoneNumber(newValue) : newValue;
                  field.onChange(formatted);
                }}
              />
            </FormControl>
            <Button type="button" onClick={() => onClick?.(field.value)}>
              {disabled === true ? "변경" : btnText}
            </Button>
          </div>
          {hasToggleIcon && (
            <Button
              type="button"
              variant={"transparent"}
              className={cn(
                "absolute right-1 top-[44px] -translate-y-1/2 text-line01",
                error
                  ? "text-danger"
                  : isFocused
                    ? "text-primary"
                    : "text-line01"
              )}
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <EyeClosed size={22} /> : <Eye size={22} />}
            </Button>
          )}
        </FormItem>
      )}
    />
  );
}
