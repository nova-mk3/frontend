"use client";

import { SignupInput } from "@/src/schema/signup.schema";

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@nova/ui/components/ui/form";
import { RadioGroup, RadioGroupItem } from "@nova/ui/components/ui/radio-group";
import { Path, UseFormReturn } from "react-hook-form";

export function RadioFormField<T extends Record<string, any>>({
  form,
  name,
  label,
  options,
}: {
  form: UseFormReturn<T>;
  name: Path<T>;
  label: string;
  options: { value: any ; label: string }[];
}) {
  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <>
          <RadioGroupField
            label={label}
            options={options}
            value={field.value}
            onChange={field.onChange}
          />
          <FormMessage className="b-s text-danger transition-colors"/>
        </>
      )}
    />
  );
}


// 라디오 아이템 컴포넌트
export function RadioOption({
  value,
  label,
}: {
  value: string;
  label: string;
}) {
  return (
    <FormItem className="flex items-center space-x-3 space-y-0">
      <FormControl>
        <RadioGroupItem value={value} />
      </FormControl>
      <FormLabel className="b-m">{label}</FormLabel>
    </FormItem>
  );
}

export function RadioGroupField({
  label,
  options,
  value,
  onChange,
}: {
  label: string;
  options: { value: string; label: string }[];
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <FormItem className="space-y-2 pb-1">
      <FormLabel className="t-m !font-bold ml-1 text-text01">{label}</FormLabel>
      <FormControl>
        <RadioGroup
          onValueChange={onChange}
          defaultValue={value}
          className="flex gap-6 !mt-[4px]"
        >
          {options.map((option,index) => (
            <RadioOption key={index} {...option} />
          ))}
        </RadioGroup>
      </FormControl>
    </FormItem>
  );
}