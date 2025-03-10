"use client";

import React, { Suspense, useState } from "react";
import { useBoardIdStore } from "@/src/store/BoardId";

import { Image } from "lucide-react";
import { useQueryParams } from "../components/useQueryParams";
import { usePostListQuery } from "../board/query/postqueries";
import { BOARD_SIZE, POST_TYPE } from "@/src/constant/board";
import BoardListTitle from "../board/components/BoardListTitle";
import PictureList from "./components/PictureList";
import { PageNation } from "../components/PageNation";

export default function Post() {
  const { INTEGRATED } = useBoardIdStore();

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
    boardId: INTEGRATED,
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
