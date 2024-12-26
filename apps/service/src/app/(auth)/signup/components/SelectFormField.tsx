"use client";

import { SignupInput, SignupSchema } from "@/src/schema/signup.schema";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@nova/ui/components/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@nova/ui/components/select";
import { UseFormReturn } from "react-hook-form";

export function SelectFormField({
  form,
  name,
  label,
}: {
  form: UseFormReturn<SignupInput>;
  name: keyof SignupInput;
  label: string;
}) {
  const options =
    (SignupSchema._def.schema.shape[name]?._def?.typeName === "ZodEnum" &&
      SignupSchema._def.schema.shape[name]?._def?.values) ||
    [];

  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel className="t-m !font-bold ml-1 text-text01">
            {label}
          </FormLabel>
          <FormMessage />
          <Select
            onValueChange={field.onChange}
            defaultValue={field.value as string}
          >
            <FormControl>
              <SelectTrigger className="w-24 !mt-[4px] border-line01 h-10 rounded-sm">
                <SelectValue placeholder="선택" />
              </SelectTrigger>
            </FormControl>
            <SelectContent className="bg-background01 focus:text-primary focus-border-primary focus:ring-primary focus:ring-1">
              {options.map((option) => (
                <SelectItem key={option} value={option}>
                  {option}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </FormItem>
      )}
    />
  );
}
