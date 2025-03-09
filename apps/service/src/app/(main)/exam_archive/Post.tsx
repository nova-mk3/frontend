"use client";

import React, { Suspense, useState } from "react";
import { useBoardIdStore } from "@/src/store/BoardId";

import { BOARD_SIZE, POST_TYPE } from "@/src/constant/board";

import { Folder } from "lucide-react";
import { useQueryParams } from "../components/useQueryParams";
import { usePostListQuery } from "../board/query/postqueries";
import ArchiveListTitle from "./components/ArchiveListTitle";
import ArchiveList from "./components/ArchiveList";
import { PageNation } from "../components/PageNation";

export default function Post() {
  const { CLUB_ARCHIVE } = useBoardIdStore();

  const { currentPage } = useQueryParams();

  const { data } = usePostListQuery({
    postType: POST_TYPE.EXAM_ARCHIVE,
    page: currentPage - 1,
    size: BOARD_SIZE,
    sort: "",
    boardId: CLUB_ARCHIVE,
  });

  return (
    <>
      <ArchiveListTitle
        title={POST_TYPE.EXAM_ARCHIVE}
        TitleImage={<Folder size={20} />}
      />
      <div>
        <ArchiveList content={data.content} />
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
