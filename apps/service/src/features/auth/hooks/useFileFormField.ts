"use client";
import { useEffect, useRef, useState } from "react";
import { Path, UseFormReturn } from "react-hook-form";

export function useFileFormField<T extends Record<string, any>>({
  form,
  name,
}: {
  form: UseFormReturn<T>;
  name: Path<T>;
}) {
  const {
    watch,
    setValue,
    formState: { errors },
  } = form;
  const [preview, setPreview] = useState<string | null>(null);
  const file = watch(name) as File;
  const inputRef = useRef<HTMLInputElement | null>(null);
  function isFile(value: unknown): value is File {
    return value instanceof File;
  }
  useEffect(() => {
    if (isFile(file)) {
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
        setValue(name, selectedFile as unknown as T[typeof name], {
          shouldValidate: true,
        });
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

  const handleReset = () => {
    setPreview(null);
    setValue(name, undefined as unknown as T[typeof name], {
      shouldValidate: true,
    });
  };

  return {
    preview,
    inputRef,
    errors,
    handleIconClick,
    handleReset,
  };
}
