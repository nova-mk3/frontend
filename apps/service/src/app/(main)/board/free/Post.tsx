"use client";

import React, { Suspense } from "react";
import { useBoardIdStore } from "@/src/store/BoardId";
import { usePostListQuery } from "../query/postqueries";
import { BOARD_SIZE, POST_TYPE } from "@/src/constant/board";
import { PageNation } from "../../components/PageNation";
import { useQueryParams } from "../../components/useQueryParams";
import BoardListTitle from "../components/BoardListTitle";
import { Book } from "lucide-react";
import BoardList from "../components/BoardList";

export default function Post() {
  const { INTEGRATED } = useBoardIdStore();

  const { currentPage, keyword, searchType, sortBy, sortDirection } =
    useQueryParams();

  const { data } = usePostListQuery({
    postType: POST_TYPE.FREE,
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
        title={POST_TYPE.FREE}
        TitleImage={<Book size={20} />}
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
