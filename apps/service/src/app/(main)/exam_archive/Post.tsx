"use client";

import React, { Suspense } from "react";

import { BOARD_SIZE, CLUB_ARCHIVE, POST_TYPE } from "@/src/constant/board";

import { Folder } from "lucide-react";
import { useQueryParams } from "@/src/shared/hooks/useQueryParams";
import { usePostListQuery } from "@/src/features/board/query/queries";
import PendingFallbackUI from "@/src/shared/ui/skeleton/PendingFallbackUI";
import ArchiveListTitle from "@/src/features/exam_archive/components/ArchiveListTitle";
import ArchiveList from "@/src/features/exam_archive/components/ArchiveList";
import { PageNation } from "@/src/shared/ui/pageNation/PageNation";

export default function Post() {
  const { currentPage, keyword, searchType, sortBy, sortDirection } =
    useQueryParams();

  const { data, isLoading } = usePostListQuery({
    postType: POST_TYPE.EXAM_ARCHIVE,
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
