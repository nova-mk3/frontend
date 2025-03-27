"use client";

import React, { Suspense } from "react";

import { usePostAllListQuery } from "../query/postqueries";
import { BOARD_SIZE, INTEGRATED, POST_TYPE } from "@/src/constant/board";
import { PageNation } from "../../components/PageNation";
import { useQueryParams } from "../../components/useQueryParams";
import BoardListTitle from "../components/BoardListTitle";
import { Layers } from "lucide-react";
import BoardList from "../components/BoardList";
import PendingFallbackUI from "../../components/Skeleton/PendingFallbackUI";

export default function Post() {
  const { currentPage, keyword, searchType, sortBy, sortDirection } =
    useQueryParams();

  const { data, isLoading } = usePostAllListQuery({
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
        title={POST_TYPE.ALL}
        TitleImage={<Layers size={20} />}
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
