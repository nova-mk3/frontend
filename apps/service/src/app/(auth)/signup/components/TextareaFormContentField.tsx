"use client"
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@nova/ui/components/ui/form';
import React from 'react'
import { Path, UseFormReturn } from 'react-hook-form';
import TextareaAutosize from "react-textarea-autosize";


interface TextareaFormFieldProps<T extends Record<string, any>>{
    form: UseFormReturn<T>;
    name: Path<T>;
    label?: string;
    placeholder?: string;
    className?: string;
}
export default function TextareaFormContentField<T extends Record<string, any>>(
    {
        form,
        name,
        label="",
        placeholder = "",
        className = "",
    } : TextareaFormFieldProps<T>
) {
  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
  
        <FormItem className='flex-1 overflow-y-auto mb-[80px] border-line01 border-[1px] p-5 rounded-md relative'>
          {/* <FormLabel className="t-m !font-bold ml-1 text-text01">
            {label}
          </FormLabel> */}
          <FormControl>
          <div className={ ` ${className}`}>
            <TextareaAutosize
              className="flex w-full t-m resize-none outline-none h-[40px] overflow-hidden"
              placeholder={placeholder}
              defaultValue={field.value as string}
              onChange={field.onChange}
            />
          <FormMessage className='text-[0.8rem] absolute right-4 top-4 text-danger'/>
          </div>
          </FormControl>
   
        </FormItem>
  )}
  />
);
  
}
