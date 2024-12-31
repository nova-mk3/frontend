import { SignupInput } from "@/src/schema/signup.schema";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@nova/ui/components/ui/form";
import { Input } from "@nova/ui/components/ui/input";
import { cn } from "@nova/ui/lib/utils";
import { UseFormReturn } from "react-hook-form";
import { useInputFocus } from "../hooks/useInputFocus";

// StringKeys 타입 정의: T에서 string 또는 number 타입의 키만 추출
type StringKeys<T> = {
  [K in keyof T]: T[K] extends string | number ? K : never;
}[keyof T];

export function InputFormField({
  form,
  name,
  label,
  placeHolder,
  type = "text",
  inputMode,
  pattern,
}: {
  form: UseFormReturn<SignupInput>;
  name: StringKeys<SignupInput>;
  label: string;
  placeHolder: string;
  type?: string;
  inputMode?: "numeric";
  pattern?: string;
}) {
  const { isFocused, inputRef } = useInputFocus();

  return (
    <FormField
      control={form.control}
      name={name!}
      render={({ field, fieldState: { error } }) => (
        <FormItem className="space-y-1">
          <div className="flex gap-2 items-center">
            <FormLabel
              className={cn(
                "t-m !font-bold ml-1 text-text01 transition-colors peer-focus:text-primary",
                error
                  ? "text-danger"
                  : isFocused
                    ? "text-primary"
                    : "text-text01",
              )}
            >
              {label}
            </FormLabel>
            <FormMessage className="b-s text-danger transition-colors" />
          </div>
          <FormControl ref={inputRef}>
            <Input
              className={cn(
                "peer b-m h-10 transition-colors rounded-sm border-line01",
                error
                  ? "text-danger border-danger placeholder:text-danger"
                  : "focus:border-primary focus:text-primary focus:placeholder-primary",
              )}
              type={type}
              placeholder={placeHolder}
              {...(inputMode ? { inputMode } : {})}
              {...(pattern ? { pattern } : {})}
              {...field}
            />
          </FormControl>
        </FormItem>
      )}
    />
  );
}
