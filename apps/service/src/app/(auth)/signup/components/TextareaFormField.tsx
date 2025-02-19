"use client"
import { FormControl, FormField, FormItem, FormLabel, FormMessage, useFormField } from '@nova/ui/components/ui/form';
import React from 'react'
import { Path, UseFormReturn } from 'react-hook-form';
import TextareaAutosize from "react-textarea-autosize";
import { fileURLToPath } from 'url';


interface TextareaFormFieldProps<T extends Record<string, any>>{
    form: UseFormReturn<T>;
    name: Path<T>;
    label?: string;
    placeholder?: string;
    className?: string;
}
export default function TextareaFormField<T extends Record<string, any>>(
    {
        form,
        name,
        label="",
        placeholder = "",
        className = "",
    } : TextareaFormFieldProps<T>
) {
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
          <div className={ `flex-none border-line01 border-b-[1px] mt-5 pb-5 ${className}`}>
            <TextareaAutosize
              className="flex w-full h-[40px] h-l resize-none outline-none"
              placeholder={placeholder}
              defaultValue={field.value as string}
              onChange={field.onChange}
            />
          </div>
          </FormControl>
          <FormMessage className='text-danger transition-colors'/>
   
        </FormItem>
  )}
  />
);
  
}
