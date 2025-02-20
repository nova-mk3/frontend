import { Input } from "@nova/ui/components/ui/input";
import React, { useState } from "react";
import { Search } from "lucide-react";
import { Button } from "@nova/ui/components/ui/button";
import Link from "next/link";
import SelectSortComponent from "../../components/SortOption";
import { useRouter, useSearchParams } from "next/navigation";
import { POST_TYPE_LABEL, PostType } from "@/src/constant/board";


interface BoardListTitleProps {
  title: string;
  className?: string;
  TitleImage: React.ReactElement<SVGElement>;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  sortOption: string;
  setSortOption: (sort: string) => void;
}

export default function BoardListTitle({title, className ,TitleImage,searchQuery,sortOption,setSearchQuery,setSortOption} : BoardListTitleProps) {

  const searchParams = useSearchParams();
  const router = useRouter();

  const handleSearch = () => {
    const params = new URLSearchParams();
    if (searchQuery) params.set("query", searchQuery);
    if (sortOption) params.set("sort", sortOption);
    params.set("page", "1"); // 검색 후 페이지는 항상 1로
    router.push(`?${params.toString()}`);
  };
  
  return (
    <div className={`flex flex-row flex-wrap items-end border-primary border-b-[1px] py-5 mobile:flex-col mobile:items-center  ${className}`}>
      <p className="t-l !font-bold text-primary mobile:mb-[15px] flex items-center gap-2">{TitleImage}{POST_TYPE_LABEL[title as PostType]}</p>

      <div className="flex flex-row items-center gap-[15px] ml-auto mt-auto mobile:flex-col mobile:w-full">
        <SelectSortComponent
          value={sortOption}
          onChange={(value) => setSortOption(value)}
        />
        <div className="flex flex-row items-center gap-[15px] w-full">
          <Input
            placeholder="검색어를 입력하세요"
            className="w-[250px] h-[36px] px-2 py-1 rounded-lg flex-1"
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <div className="cursor-pointer rounded-lg hover:bg-background02 p-1" onClick={handleSearch}>
          <Search size="24"/>
          </div>
        </div>
        <Link href="/board/newpost" className="mobile:w-full">
          <Button variant="default" className="mobile:w-full">
            글쓰기
          </Button>
        </Link>
      </div>
    </div>
  );
}


