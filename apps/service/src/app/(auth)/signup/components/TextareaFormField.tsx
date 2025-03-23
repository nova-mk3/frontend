"use client";
import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
  useFormField,
} from "@nova/ui/components/ui/form";
import { cn } from "@nova/ui/lib/utils";
import React from "react";
import { Path, UseFormReturn } from "react-hook-form";
import TextareaAutosize from "react-textarea-autosize";

interface TextareaFormFieldProps<T extends Record<string, any>> {
  form: UseFormReturn<T>;
  name: Path<T>;
  label?: string;
  placeholder?: string;
  className?: string;
  readonly?: boolean;
  disabled?: boolean;
}
export default function TextareaFormField<T extends Record<string, any>>({
  form,
  name,
  label = "",
  placeholder = "",
  className = "",
  readonly = false,
}: TextareaFormFieldProps<T>) {
  const { error, formMessageId } = useFormField();
  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem>
          {/* <FormLabel className="t-m !font-bold ml-1 text-text01">
            {label}
          </FormLabel> */}
          <FormControl>
            <div
              className={`flex-none border-line01 rounded-md p-5 border ${className}`}
            >
              <TextareaAutosize
                className={cn(
                  "flex w-full h-[40px] t-l resize-none outline-none",
                  readonly && "cursor-not-allowed"
                )}
                placeholder={placeholder}
                value={field.value as string}
                onChange={field.onChange}
                readOnly={readonly}
              />
            </div>
          </FormControl>
          <FormMessage className="text-danger transition-colors" />
        </FormItem>
      )}
    />
  );
}
