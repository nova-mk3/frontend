"use client";

import React, { Suspense } from "react";

import { Image } from "lucide-react";
import { useQueryParams } from "../components/useQueryParams";
import { usePostListQuery } from "../board/query/postqueries";
import { BOARD_SIZE, CLUB_ARCHIVE, POST_TYPE } from "@/src/constant/board";
import BoardListTitle from "../board/components/BoardListTitle";
import PictureList from "./components/PictureList";
import { PageNation } from "../components/PageNation";
import PendingFallbackUI from "../components/Skeleton/PendingFallbackUI";

export default function Post() {
  const { currentPage, keyword, searchType, sortBy, sortDirection } =
    useQueryParams();

  const { data, isLoading } = usePostListQuery({
    postType: POST_TYPE.PICTURES,
    page: currentPage - 1,
    size: BOARD_SIZE,
    keyword: keyword,
    searchType: searchType,
    sortBy: sortBy,
    sortDirection: sortDirection,
    boardId: CLUB_ARCHIVE,
  });

  if (isLoading) {
    return <PendingFallbackUI />;
  }
  return (
    <>
      <BoardListTitle
        title={POST_TYPE.PICTURES}
        TitleImage={<Image size={20} />}
        defaultHref="/pictures"
      />
      <div>
        <div className="min-h-[745px]">
          <PictureList content={data.content} />
        </div>
        <Suspense fallback={<div className="h-[36px]"></div>}>
          <PageNation
            size={BOARD_SIZE}
            totalPage={data.totalPages}
            className="my-4 "
          />
        </Suspense>
      </div>
    </>
  );
}
