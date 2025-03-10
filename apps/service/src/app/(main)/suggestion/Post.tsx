"use client";

import React, { Suspense } from "react";
import { PageNation } from "../components/PageNation";
import { useSuggestionListQuery } from "./query/queries";
import SuggestionList from "./components/SuggestionList";
import Title from "./components/Title";
import { useQueryParams } from "../components/useQueryParams";
import { BOARD_SIZE } from "@/src/constant/board";

export default function Post() {
  const { currentPage, keyword, searchType, sortBy, sortDirection } =
    useQueryParams();

  const { data } = useSuggestionListQuery({
    page: currentPage - 1,
    size: BOARD_SIZE,
    keyword: keyword,
    searchType: searchType,
    sortBy: sortBy,
    sortDirection: sortDirection,
  });

  return (
    <div className="w-[80%] mx-auto">
      <Title title="건의함" className="mt-5" />
      <SuggestionList content={data.content} />
      <Suspense fallback={<div className="h-[36px]"></div>}>
        <PageNation
          size={BOARD_SIZE}
          totalPage={data.totalPages}
          className="my-4"
        />
      </Suspense>
    </div>
  );
}
