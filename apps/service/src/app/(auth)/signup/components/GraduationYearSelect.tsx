import React from "react";
import { SelectFormField } from "./SelectFormField";
import { UseFormReturn } from "react-hook-form";
import { SignupInput } from "@/src/schema/signup.schema";

const GraduationYearSelect = ({
  form,
  name,
  label,
  options,
}: {
  form: UseFormReturn<SignupInput>;
  name: keyof SignupInput;
  label: string;
  options: string[];
}) => {
  // 매 렌더 시 getGraduationYears() 호출하여 최신 옵션을 생성
  const graduationYears = getGraduationYears();

  return (
    <SelectFormField
      form={form}
      name={name}
      label={label}
      options={graduationYears}
    />
  );
};

export default GraduationYearSelect;

export function getGraduationYears() {
    const startYear = 2000;
    const currentYear = new Date().getFullYear();
    const years: string[] = [];
    for (let year = currentYear; year >= startYear; year--) {
      years.push(`${year}년`);
    }
    return years;
  }