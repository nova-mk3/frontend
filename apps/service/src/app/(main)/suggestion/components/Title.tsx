import { Input } from "@nova/ui/components/ui/input";
import React from "react";
import { Milestone, Search } from "lucide-react";
import { Button } from "@nova/ui/components/ui/button";
import Link from "next/link";
import SearchInput from "../../components/SearchInput";
import { Filter } from "../../components/Filter";
import SelectSortComponent from "../../components/SelectSortComponent";
import { SuggestionFilter } from "../../components/SuggestionFilter";

interface TitleProps {
  title?: string;
  className?: string;
}

export default function Title({ title, className }: TitleProps) {
  return (
    <div
      className={`flex flex-row flex-wrap items-end border-primary border-b-[1px] py-5 mobile:flex-col mobile:items-center  ${className}`}
    >
      <div className="flex flex-col gap-2 mobile:flex-col mobile:items-center">
        <p className="t-l !font-bold text-primary mobile:mb-[15px] flex flex-row gap-1 items-center">
          <Milestone size={20} />
          {title}
        </p>
        {/* <p className="text-sm">여러분들의 건의가 개발자에게 큰 힘이 됩니다😀</p> */}
      </div>

      <div className="flex flex-row items-center gap-[15px] ml-auto mt-auto mobile:flex-col mobile:w-full">
        <SuggestionFilter />
        <SelectSortComponent />
        <SearchInput />
        <Link href="/suggestion/newpost" className="mobile:w-full">
          <Button variant="default" className="mobile:w-full">
            건의하기
          </Button>
        </Link>
      </div>
    </div>
  );
}
