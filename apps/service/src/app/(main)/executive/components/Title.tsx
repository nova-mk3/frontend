import React from "react";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectItem,
  SelectContent,
} from "@nova/ui/components/ui/select";
import { useQueryParams } from "@/src/shared/hooks/useQueryParams";
import useYearRange from "@/src/shared/hooks/useYearRange";

interface TitleProps {
  title?: string;
  className?: string;
  TitleImage?: React.ReactElement<SVGElement>;
}

export default function Title({ title, className, TitleImage }: TitleProps) {
  const { year, setYear } = useQueryParams();
  const years = useYearRange(2019, new Date().getFullYear());

  return (
    <div
      className={`flex flex-col gap-6 py-6 mobile:flex-col mobile:items-center  ${className}`}
    >
      <p className="text-2xl !font-bold text-primary mobile:mb-[15px] flex items-center gap-2">
        {TitleImage}
        {title}
      </p>
      <div className="flex flex-row items-center gap-[15px] mobile:flex-col mobile:w-full">
        <Select value={year} onValueChange={setYear}>
          <SelectTrigger className="w-[180px] ">
            <SelectValue placeholder="정렬 선택" />
          </SelectTrigger>
          <SelectContent className="bg-background01">
            {years.map((year) => (
              <SelectItem
                key={year}
                value={year.toString()}
                className="cursor-pointer"
              >
                {year + "년"}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}
