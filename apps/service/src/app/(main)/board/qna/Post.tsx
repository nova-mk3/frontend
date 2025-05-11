"use client";

import React, { Suspense, useState } from "react";

import { BOARD_SIZE, INTEGRATED, POST_TYPE } from "@/src/constant/board";

import { MessageSquareMore } from "lucide-react";

import { usePostListQuery } from "@/src/features/board/query/queries";
import BoardListTitle from "@/src/features/board/components/BoardListTitle";
import BoardList from "@/src/features/board/components/BoardList";
import { useQueryParams } from "@/src/shared/hooks/useQueryParams";
import PendingFallbackUI from "@/src/shared/ui/skeleton/PendingFallbackUI";
import { PageNation } from "@/src/shared/ui/pageNation/PageNation";

export default function Post() {
  const { currentPage, keyword, searchType, sortBy, sortDirection } =
    useQueryParams();

  const { data, isLoading } = usePostListQuery({
    postType: POST_TYPE.QNA,
    page: currentPage - 1,
    size: BOARD_SIZE,
    keyword: keyword,
    searchType: searchType,
    sortBy: sortBy,
    sortDirection: sortDirection,
    boardId: INTEGRATED,
  });

  if (isLoading) {
    return <PendingFallbackUI />;
  }

  return (
    <>
      <BoardListTitle
        title={POST_TYPE.QNA}
        TitleImage={<MessageSquareMore size={20} />}
        defaultHref="/board"
      />
      <div>
        <BoardList content={data.content} />
        <Suspense fallback={<div className="h-[36px]"></div>}>
          <PageNation
            size={BOARD_SIZE}
            totalPage={data.totalPages}
            className="my-4"
          />
        </Suspense>
      </div>
    </>
  );
}
