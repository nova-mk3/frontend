"use client";

import React, { Suspense } from "react";
import { PageNation } from "../components/PageNation";
import { useSuggestionListQuery } from "./query/queries";
import SuggestionList from "./components/SuggestionList";
import Title from "./components/Title";
import { useQueryParams } from "../components/useQueryParams";
import { BOARD_SIZE } from "@/src/constant/board";
import SkeletonSuggestionList from "../components/Skeleton/Suggestion/SkeletonSuggestionList";
import SkeletonSuggestionTitle from "../components/Skeleton/Suggestion/SkeletonSuggestionTitle";

export default function Post() {
  const { currentPage, keyword, searchType, sortBy, sortDirection } =
    useQueryParams();

  const { data, isLoading } = useSuggestionListQuery({
    page: currentPage - 1,
    size: 10,
    keyword: keyword,
    searchType: searchType,
    sortBy: sortBy,
    sortDirection: sortDirection,
  });

  if (isLoading) {
    return (
      <div className="w-[80%] mx-auto">
        <SkeletonSuggestionTitle />
        <SkeletonSuggestionList />
      </div>
    );
  }

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
