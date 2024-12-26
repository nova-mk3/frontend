"use client";

import { format } from "date-fns";
import { ko } from "date-fns/locale";
import { CalendarIcon } from "lucide-react";
import { UseFormReturn } from "react-hook-form";

import { SignupInput } from "@/src/schema/signup.schema";
import { Button } from "@nova/ui/components/button";
import { Calendar } from "@nova/ui/components/calendar";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@nova/ui/components/form";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@nova/ui/components/popover";
import { cn } from "@nova/ui/lib/utils";

export function DatePickerForm({
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
        <FormItem className="flex flex-col">
          <FormLabel className="t-m !font-bold ml-1 text-text01">
            {label}
          </FormLabel>
          <Popover>
            <PopoverTrigger asChild>
              <FormControl>
                <Button
                  variant={"outline"}
                  className={cn(
                    "w-[180px] pl-3 h-10 text-left b-m !mt-[4px] focus:border-primary focus:text-primary shadow-sm rounded-sm",
                    !field.value && "text-muted-foreground"
                  )}
                >
                  {field.value ? (
                    format(field.value as Date, "PPP", { locale: ko })
                  ) : (
                    <span>Pick a date</span>
                  )}
                  <CalendarIcon className="ml-auto h-4 w-4 opacity-60" />
                </Button>
              </FormControl>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                className="bg-background01"
                mode="single"
                selected={field.value as Date}
                onSelect={field.onChange}
                disabled={(date) =>
                  date > new Date() || date < new Date("1900-01-01")
                }
                locale={ko}
                initialFocus
              />
            </PopoverContent>
          </Popover>
        </FormItem>
      )}
    />
  );
}
