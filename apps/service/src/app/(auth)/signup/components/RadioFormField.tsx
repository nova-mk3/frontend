"use client";

import { SignupInput } from "@/src/schema/signup.schema";

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@nova/ui/components/form";
import { RadioGroup, RadioGroupItem } from "@nova/ui/components/radio-group";
import { UseFormReturn } from "react-hook-form";

export function RadioFormField({
  form,
  name,
  label,
}: {
  form: UseFormReturn<SignupInput>;
  name: keyof SignupInput;
  label: string;
}) {
  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem className="space-y-2 pb-1">
          <FormLabel className="t-m !font-bold ml-1 text-text01">
            {label}
          </FormLabel>
          <FormControl>
            <RadioGroup
              onValueChange={field.onChange}
              defaultValue={field.value as string}
              className="flex gap-6 !mt-[4px]"
            >
              <FormItem className="flex items-center space-x-3 space-y-0">
                <FormControl>
                  <RadioGroupItem value="남성" />
                </FormControl>
                <FormLabel className="b-m">남성</FormLabel>
              </FormItem>
              <FormItem className="flex items-center space-x-3 space-y-0">
                <FormControl>
                  <RadioGroupItem value="여성" />
                </FormControl>
                <FormLabel className="b-m">여성</FormLabel>
              </FormItem>
            </RadioGroup>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
