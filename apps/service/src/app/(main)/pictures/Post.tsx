"use client";

import React, { Suspense, useState } from "react";

import { Image } from "lucide-react";
import { useQueryParams } from "../components/useQueryParams";
import { usePostListQuery } from "../board/query/postqueries";
import { BOARD_SIZE, CLUB_ARCHIVE, POST_TYPE } from "@/src/constant/board";
import BoardListTitle from "../board/components/BoardListTitle";
import PictureList from "./components/PictureList";
import { PageNation } from "../components/PageNation";

export default function Post() {
  const { currentPage, keyword, searchType, sortBy, sortDirection } =
    useQueryParams();

  const { data } = usePostListQuery({
    postType: POST_TYPE.PICTURES,
    page: currentPage - 1,
    size: BOARD_SIZE,
    keyword: keyword,
    searchType: searchType,
    sortBy: sortBy,
    sortDirection: sortDirection,
    boardId: CLUB_ARCHIVE,
  });

  return (
    <>
      <BoardListTitle
        title={POST_TYPE.PICTURES}
        TitleImage={<Image size={20} />}
        defaultHref="/pictures"
      />
      <div>
        <PictureList content={data.content} />
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
