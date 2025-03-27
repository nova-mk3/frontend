"use client";
import { Input } from "@nova/ui/components/ui/input";
import { Search } from "lucide-react";
import React, { useEffect, useRef } from "react";
import { useQueryParams } from "./useQueryParams";

export default function SearchInput() {
  const inputRef = useRef<HTMLInputElement>(null);
  const { setKeyword, keyword } = useQueryParams();

  useEffect(() => {
    if (keyword && inputRef) {
      inputRef.current!.value = keyword;
    }
  }, []);

  const handleKeywordSearch = () => {
    if (!inputRef.current) return;
    const value = inputRef.current.value;
    setKeyword(value);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleKeywordSearch();
    }
  };
  return (
    <div className="flex flex-row items-center gap-[15px] w-full">
      <Input
        placeholder="검색어를 입력하세요"
        className="w-[250px] h-[36px] px-2 py-1 rounded-lg flex-1"
        ref={inputRef}
        onKeyDown={handleKeyDown}
      />
      <div
        className="cursor-pointer rounded-lg hover:bg-background02 p-1"
        onClick={handleKeywordSearch}
      >
        <Search size="24" />
      </div>
    </div>
  );
}
