import { SignupInput } from "@/src/schema/signup.schema";
import { Button } from "@nova/ui/components/button";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@nova/ui/components/form";
import { cn } from "@nova/ui/lib/utils";
import { Image as ImageIcon } from "lucide-react";
import Image from "next/image";
import { Path, UseFormReturn } from "react-hook-form";
import { useFileFormField } from "../hooks/useFileFormField";

export function FileFormField({
  form,
  name,
  label,
  accept = "image/*",
}: {
  form: UseFormReturn<SignupInput>;
  name: Path<SignupInput>;
  label: string;
  accept?: string;
}) {
  const { preview, inputRef, errors, handleIconClick } = useFileFormField({
    form,
    name,
  });

  return (
    <FormField
      control={form.control}
      name={name}
      render={() => (
        <FormItem className="space-y-2">
          <div>
            <div className="flex gap-2 items-center">
              <FormLabel
                className={cn(
                  "t-m !font-bold ml-1 text-text01 transition-colors peer-focus:text-primary",
                  errors[name] && "text-danger"
                )}
              >
                {label}
              </FormLabel>
              <FormMessage className="b-s text-danger transition-colors" />
            </div>
            <FormControl>
              <input
                type="file"
                accept={accept}
                ref={inputRef}
                className="hidden"
              />
            </FormControl>

            {preview ? (
              <div className="mt-2">
                <Image
                  src={preview}
                  onClick={handleIconClick}
                  alt="Profile Preview"
                  width={40}
                  height={40}
                  className="w-10 h-10 object-cover rounded-full"
                />
              </div>
            ) : (
              <Button
                type="button"
                variant="outline"
                onClick={handleIconClick}
                className={cn(
                  "w-10 h-10 p-2 rounded-sm !mt-[4px] border-line01 group",
                  errors[name]
                    ? "border-danger"
                    : "border-line01 focus:border-primary"
                )}
                aria-label="프로필 이미지 업로드"
              >
                <ImageIcon className="w-6 h-6 text-text01 group-focus:text-primary" />
              </Button>
            )}
          </div>
        </FormItem>
      )}
    />
  );
}
