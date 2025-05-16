"use client";

import React, { Suspense } from "react";

import { useSuggestionListQuery } from "./query/queries";
import SuggestionList from "./components/SuggestionList";
import Title from "./components/Title";

import { BOARD_SIZE } from "@/src/constant/board";
import { useQueryParams } from "@/src/shared/hooks/useQueryParams";
import DeferredComponent from "@/src/shared/ui/errorBoundary/DeferredComponent";
import SkeletonSuggestionTitle from "@/src/shared/ui/skeleton/Suggestion/SkeletonSuggestionTitle";
import SkeletonSuggestionList from "@/src/shared/ui/skeleton/Suggestion/SkeletonSuggestionList";
import { PageNation } from "@/src/shared/ui/pageNation/PageNation";

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
      <DeferredComponent>
        <div className="w-[80%] mx-auto">
          <SkeletonSuggestionTitle />
          <SkeletonSuggestionList />
        </div>
      </DeferredComponent>
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
