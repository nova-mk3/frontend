"use client";

import React, { Suspense, useState } from "react";
import { useBoardIdStore } from "@/src/store/BoardId";

import { Book, Image } from "lucide-react";
import { useQueryParams } from "../components/useQueryParams";
import { usePostListQuery } from "../board/query/postqueries";
import { BOARD_SIZE, POST_TYPE } from "@/src/constant/board";
import BoardListTitle from "../board/components/BoardListTitle";
import PictureList from "./components/PictureList";
import { PageNation } from "../components/PageNation";

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
    postType: POST_TYPE.PICTURES,
    page: currentPage - 1,
    size: 8,
    sort: sortOption,
    boardId: INTEGRATED,
  });

  return (
    <>
      <BoardListTitle
        title={POST_TYPE.PICTURES}
        TitleImage={<Image size={20} />}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        sortOption={sortOption}
        setSortOption={setSortOption}
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
