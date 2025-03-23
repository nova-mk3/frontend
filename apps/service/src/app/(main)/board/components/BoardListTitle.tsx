import { Input } from "@nova/ui/components/ui/input";
import React, { useState } from "react";
import { Search } from "lucide-react";
import { Button } from "@nova/ui/components/ui/button";
import Link from "next/link";
import SelectSortComponent from "../../components/SelectSortComponent";
import { useRouter, useSearchParams } from "next/navigation";
import { POST_TYPE_LABEL, PostType } from "@/src/constant/board";
import SearchInput from "../../components/SearchInput";
import { Filter } from "../../components/Filter";

interface BoardListTitleProps {
  title: string;
  className?: string;
  TitleImage: React.ReactElement<SVGElement>;
  defaultHref?: string;
}

export default function BoardListTitle({
  title,
  className,
  TitleImage,
  defaultHref = "",
}: BoardListTitleProps) {
  return (
    <div
      className={`flex flex-row flex-wrap items-end border-primary border-b-[1px] py-5 mobile:flex-col mobile:items-center  ${className}`}
    >
      <p className="t-l !font-bold text-primary mobile:mb-[15px] flex items-center gap-2">
        {TitleImage}
        {POST_TYPE_LABEL[title as PostType]}
      </p>

      <div className="flex flex-row items-center gap-[15px] ml-auto mt-auto mobile:flex-col mobile:w-full">
        <Filter />
        <SelectSortComponent />
        <SearchInput />
        <Link href={`${defaultHref}/newpost`} className="mobile:w-full">
          <Button variant="default" className="mobile:w-full">
            글쓰기
          </Button>
        </Link>
      </div>
    </div>
  );
}
