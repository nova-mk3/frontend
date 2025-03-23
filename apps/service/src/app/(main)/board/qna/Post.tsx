"use client";

import React, { Suspense, useState } from "react";
import { usePostListQuery } from "../query/postqueries";
import { BOARD_SIZE, INTEGRATED, POST_TYPE } from "@/src/constant/board";
import { PageNation } from "../../components/PageNation";
import BoardList from "../components/BoardList";
import { useQueryParams } from "../../components/useQueryParams";
import BoardListTitle from "../components/BoardListTitle";
import { MessageSquareMore } from "lucide-react";

export default function Post() {
  const { currentPage, keyword, searchType, sortBy, sortDirection } =
    useQueryParams();

  const { data } = usePostListQuery({
    postType: POST_TYPE.QNA,
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
