"use client";
import { SignupInput } from "@/src/schema/signup.schema";
import { useEffect, useRef, useState } from "react";
import { Path, UseFormReturn } from "react-hook-form";

export function useFileFormField({
  form,
  name,
}: {
  form: UseFormReturn<SignupInput>;
  name: Path<SignupInput>;
}) {
  const {
    watch,
    setValue,
    formState: { errors },
  } = form;
  const [preview, setPreview] = useState<string | null>(null);
  const file = watch(name);
  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (file && file instanceof File) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    } 
    // else {
    //   setPreview(null);
    // }
  }, [file]);

  useEffect(() => {
    const input = inputRef.current;
    if (!input) return;
    const handleChange = (e: Event) => {
      const target = e.target as HTMLInputElement;
      const selectedFile = target.files?.[0];
      if (selectedFile) {
        setValue(name, selectedFile, { shouldValidate: true });
      } 
      // else {
      //   setValue(name, undefined, { shouldValidate: true });
      // }
    };
    input.addEventListener("change", handleChange);
    return () => {
      input.removeEventListener("change", handleChange);
    };
  }, [inputRef, setValue, name]);

  const handleIconClick = () => {
    if (inputRef.current) {
      inputRef.current.click();
    }
  };

  const handleReset = ()=>{
    setPreview(null);
    setValue(name, undefined, { shouldValidate: true });
  }

  return {
    preview,
    inputRef,
    errors,
    handleIconClick,
    handleReset
  };
}
