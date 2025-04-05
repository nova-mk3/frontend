"use client";
import React from "react";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectItem,
  SelectContent,
} from "@nova/ui/components/ui/select";
import { useQueryParams } from "../../components/useQueryParams";

interface TitleProps {
  title?: string;
  className?: string;
  TitleImage?: React.ReactElement<SVGElement>;
}

export default function Title({ title, className, TitleImage }: TitleProps) {
  const { grade, setGrade } = useQueryParams();

  return (
    <div
      className={`flex flex-col flex-wrap py-6 mobile:flex-col mobile:items-center gap-6 ${className}`}
    >
      <p className="text-2xl !font-bold text-primary mobile:mb-[15px] flex items-center gap-2">
        {TitleImage}
        {title}
      </p>

      <div className="flex flex-row items-center gap-[15px] mobile:flex-col mobile:w-full">
        <Select value={grade} onValueChange={setGrade}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="학년 선택" />
          </SelectTrigger>
          <SelectContent className="bg-background01">
            <SelectItem value="1" className="cursor-pointer">
              1학년
            </SelectItem>
            <SelectItem value="2" className="cursor-pointer">
              2학년
            </SelectItem>
            <SelectItem value="3" className="cursor-pointer">
              3학년
            </SelectItem>
            <SelectItem value="4" className="cursor-pointer">
              4학년
            </SelectItem>
            <SelectItem value="5" className="cursor-pointer">
              초과학기
            </SelectItem>
            <SelectItem value="0" className="cursor-pointer">
              졸업생
            </SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}
