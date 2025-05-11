"use client";

import { SignupInput, SignupSchema } from "@/src/schema/signup.schema";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@nova/ui/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@nova/ui/components/ui/select";
import { Path, UseFormReturn } from "react-hook-form";

interface OptionObject {
  value: string;
  label: string;
}

// type guard 함수: 옵션 배열이 string[]인지 검사합니다.
function isStringOptions(
  options: string[] | OptionObject[] | number[]
): options is string[] {
  return options.length === 0 || typeof options[0] === "string";
}

// type guard 함수: 옵션 배열이 number[]인지 검사합니다.
function isNumberOptions(
  options: string[] | OptionObject[] | number[]
): options is number[] {
  return options.length > 0 && typeof options[0] === "number";
}

export function SelectFormField<T extends Record<string, any>>({
  form,
  name,
  label,
  options,
  placeholder = "선택",
  className = "",
}: {
  form: UseFormReturn<T>;
  name: Path<T>;
  label: string;
  options: string[] | OptionObject[] | number[];
  placeholder?: string;
  className?: string;
}) {
  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <div className="flex flew-row gap-2 items-center">
            <FormLabel className="t-m !font-bold ml-1 text-text01">
              {label}
            </FormLabel>
            <FormMessage className="b-s text-danger transition-colors" />
          </div>
          <Select
            key={field.value}
            onValueChange={field.onChange}
            value={field.value as string}
          >
            <FormControl>
              <SelectTrigger
                className={`w-24 !mt-[4px] border-line01 h-10 rounded-sm ${className}`}
              >
                <SelectValue placeholder={placeholder} />
              </SelectTrigger>
            </FormControl>
            <SelectContent className="bg-background01 focus:text-primary focus-border-primary focus:ring-primary focus:ring-1">
              {isStringOptions(options)
                ? options.map((option, index) => (
                    <SelectItem
                      key={index}
                      value={option}
                      className="cursor-pointer"
                    >
                      {option}
                    </SelectItem>
                  ))
                : isNumberOptions(options)
                  ? options.map((option, index) => (
                      <SelectItem
                        key={index}
                        value={String(option)}
                        className="cursor-pointer"
                      >
                        {option}
                      </SelectItem>
                    ))
                  : options.map((option) => (
                      <SelectItem
                        key={option.value}
                        value={option.value}
                        className="cursor-pointer"
                      >
                        {option.label}
                      </SelectItem>
                    ))}
            </SelectContent>
          </Select>
        </FormItem>
      )}
    />
  );
}
