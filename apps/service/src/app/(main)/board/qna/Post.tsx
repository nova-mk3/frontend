"use client";

import React, { Suspense, useState } from "react";
import { useBoardIdStore } from "@/src/store/BoardId";
import { usePostListQuery } from "../query/postqueries";
import { BOARD_SIZE, POST_TYPE } from "@/src/constant/board";
import { PageNation } from "../../components/PageNation";
import BoardList from "../components/BoardList";
import { useQueryParams } from "../../components/useQueryParams";
import BoardListTitle from "../components/BoardListTitle";
import { MessageSquareMore } from "lucide-react";

export default function Post() {
  const { INTEGRATED } = useBoardIdStore();

  const {
    currentPage,
    searchQuery: initialSearchQuery,
    sortOption: initialSortOption,
  } = useQueryParams();
  const [searchQuery, setSearchQuery] = useState(initialSearchQuery);
  const [sortOption, setSortOption] = useState(initialSortOption);

  const { data } = usePostListQuery({
    postType: POST_TYPE.QNA,
    page: currentPage - 1,
    size: BOARD_SIZE,
    sort: sortOption,
    boardId: INTEGRATED,
  });

  return (
    <>
      <BoardListTitle
        title={POST_TYPE.QNA}
        TitleImage={<MessageSquareMore size={20} />}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        sortOption={sortOption}
        setSortOption={setSortOption}
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
