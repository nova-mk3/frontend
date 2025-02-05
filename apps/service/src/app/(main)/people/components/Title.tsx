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


interface TitleProps{
  title? : string;
  className?: string;
  TitleImage? : React.ReactElement<SVGElement>
}

export default function Title({title, className ,TitleImage} : TitleProps) {
  return (
    <div className={`flex flex-row flex-wrap items-end border-primary border-b-[1px] py-5 mobile:flex-col mobile:items-center  ${className}`}>
      <p className="t-l !font-bold text-primary mobile:mb-[15px] flex items-center gap-2">{TitleImage}{title}</p>

      <div className="flex flex-row items-center gap-[15px] ml-auto mt-auto mobile:flex-col mobile:w-full">
        <Select defaultValue="1학년">
                <SelectTrigger className="w-[180px] ">
                  <SelectValue placeholder="정렬 선택" />
                </SelectTrigger>
                <SelectContent className="bg-background01">
                  <SelectItem value="1학년" className="cursor-pointer ">
                    1학년
                  </SelectItem>
                  <SelectItem value="2학년" className="cursor-pointer ">
                    2학년
                  </SelectItem>
                  <SelectItem
                    value="3"
                    className="cursor-pointer"
                  >
                    3학년
                  </SelectItem>
                  <SelectItem
                    value="4"
                    className="cursor-pointer"
                  >
                    4학년
                  </SelectItem>
                  <SelectItem
                    value="5"
                    className="cursor-pointer"
                  >
                    5학년
                  </SelectItem>
                  <SelectItem
                    value="6"
                    className="cursor-pointer"
                  >
                    졸업생
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
    </div>
  );
}


