"use client";
import React from "react";
import { Button } from "@nova/ui/components/ui/button";
import Link from "next/link";
import { POST_TYPE_LABEL, PostType } from "@/src/constant/board";
import { Filter } from "../../components/Filter";
import SearchInput from "../../components/Search/SearchInput";
import SelectSortComponent from "../../components/Search/SelectSortComponent";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { SimpleProfileQueryOptions } from "../../users/[id]/query/options";

interface BoardListTitleProps {
  title: string;
  className?: string;
  TitleImage: React.ReactElement<SVGElement>;
}

export default function ArchiveListTitle({
  title,
  className,
  TitleImage,
}: BoardListTitleProps) {
  const { data } = useQuery(SimpleProfileQueryOptions());
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
        <Link
          href="/exam_archive/newpost"
          className="mobile:w-full"
          onClick={(e) => {
            if (!data) {
              e.preventDefault(); // ✅ 이동 막기
              alert("로그인 후 이용해주세요");
            }
          }}
        >
          <Button variant="default" className="mobile:w-full">
            글쓰기
          </Button>
        </Link>
      </div>
    </div>
  );
}
