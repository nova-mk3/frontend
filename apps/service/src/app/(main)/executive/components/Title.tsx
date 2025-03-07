import { Input } from "@nova/ui/components/ui/input";
import React from "react";
import { Layers, Search } from "lucide-react";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectItem,
  SelectContent,
} from "@nova/ui/components/ui/select";
import { Button } from "@nova/ui/components/ui/button";
import Link from "next/link";

interface TitleProps {
  title?: string;
  className?: string;
  TitleImage?: React.ReactElement<SVGElement>;
}

export default function Title({ title, className, TitleImage }: TitleProps) {
  return (
    <div
      className={`flex flex-col gap-6 py-6 mobile:flex-col mobile:items-center  ${className}`}
    >
      <p className="text-2xl !font-bold text-primary mobile:mb-[15px] flex items-center gap-2">
        {TitleImage}
        {title}
      </p>
      <div className="flex flex-row items-center gap-[15px] mobile:flex-col mobile:w-full">
        <Select defaultValue="seq">
          <SelectTrigger className="w-[180px] ">
            <SelectValue placeholder="정렬 선택" />
          </SelectTrigger>
          <SelectContent className="bg-background01">
            <SelectItem value="seq" className="cursor-pointer ">
              2024
            </SelectItem>
            <SelectItem value="new" className="cursor-pointer ">
              2023
            </SelectItem>
            <SelectItem value="3" className="cursor-pointer">
              2022
            </SelectItem>
            <SelectItem value="4" className="cursor-pointer">
              2021
            </SelectItem>
            <SelectItem value="5" className="cursor-pointer">
              2020
            </SelectItem>
            <SelectItem value="6" className="cursor-pointer">
              2019
            </SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}
