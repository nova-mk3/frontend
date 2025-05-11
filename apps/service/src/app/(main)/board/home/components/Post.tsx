"use client";
import React from "react";
import { INTEGRATED, POST_TYPE, POST_TYPE_LABEL } from "@/src/constant/board";
import { usePostLatestListQuery } from "@/src/features/board/query/queries";
import PendingFallbackUI from "@/src/shared/ui/skeleton/PendingFallbackUI";
import HomeListItem from "@/src/features/board/components/HomeListItem";

export default function Post() {
  const { data, isLoading } = usePostLatestListQuery({ boardId: INTEGRATED });

  if (isLoading) {
    return <PendingFallbackUI />;
  }
  return (
    <div className="grid gap-4 xl:grid-cols-4 lg:grid-cols-2 mobile:grid-cols-1 min-h-[745px]">
      <HomeListItem
        title={POST_TYPE_LABEL[POST_TYPE.NOTICE]}
        href="/board/notice"
        data={data[POST_TYPE.NOTICE]}
      />
      <HomeListItem
        title={POST_TYPE_LABEL[POST_TYPE.QNA]}
        href="/board/qna"
        data={data[POST_TYPE.QNA]}
      />
      <HomeListItem
        title={POST_TYPE_LABEL[POST_TYPE.INTRODUCTION]}
        href="/board/introduction"
        data={data[POST_TYPE.INTRODUCTION]}
      />
      <HomeListItem
        title={POST_TYPE_LABEL[POST_TYPE.FREE]}
        href="/board/free"
        data={data[POST_TYPE.FREE]}
      />
    </div>
  );
}
