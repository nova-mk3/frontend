import React from "react";
import { Milestone } from "lucide-react";
import { Button } from "@nova/ui/components/ui/button";
import Link from "next/link";

import { SimpleProfileQueryOptions } from "../../users/[id]/query/options";
import { useQuery } from "@tanstack/react-query";
import { SuggestionFilter } from "@/src/shared/ui/search/SuggestionFilter";
import SelectSortComponent from "@/src/shared/ui/search/SelectSortComponent";
import SearchInput from "@/src/shared/ui/search/SearchInput";

interface TitleProps {
  title?: string;
  className?: string;
}

export default function Title({ title, className }: TitleProps) {
  const { data } = useQuery(SimpleProfileQueryOptions());
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
        <Link
          href="/suggestion/newpost"
          className="mobile:w-full"
          onClick={(e) => {
            if (!data) {
              e.preventDefault(); // ✅ 이동 막기
              alert("로그인 후 이용해주세요");
            }
          }}
        >
          <Button variant="default" className="mobile:w-full">
            건의하기
          </Button>
        </Link>
      </div>
    </div>
  );
}
