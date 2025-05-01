"use client";

import BoardListItem, {
  BoardListItemType,
} from "@/src/app/(main)/board/components/BoardListItem";
import { PageNation } from "@/src/app/(main)/components/PageNation";
import { useQueryParams } from "@/src/app/(main)/components/useQueryParams";
import { BOARD_SIZE } from "@/src/constant/board";
import React, { Suspense } from "react";
import { useMypagePostQuery } from "../../query/qureies";
import PendingFallbackUI from "@/src/app/(main)/components/Skeleton/PendingFallbackUI";

export default function Post() {
  const { currentPage } = useQueryParams();

  const { data, isLoading } = useMypagePostQuery({
    page: currentPage - 1,
    size: BOARD_SIZE,
  });

  if (isLoading) {
    return <PendingFallbackUI />;
  }
  return (
    <div className="flex flex-col gap-2">
      <div className="bg-background02 px-3 py-2">
        작성한 게시글을 아래에서 확인하세요!
      </div>
      <div className="flex flex-col gap-2 min-h-[700px] mt-5">
        {data.content.map((post: BoardListItemType) => (
          <BoardListItem
            key={post.id}
            id={post.id}
            authorName={post.authorName}
            authorProfilePhoto={post.authorProfilePhoto}
            title={post.title}
            content={post.content}
            type={post.type}
            createdTime={post.createdTime}
            modifiedTime={post.modifiedTime}
            likeCount={post.likeCount}
            commentCount={post.commentCount}
            viewCount={post.viewCount}
            href={`/board/${post.type.toLowerCase()}/${post.id}`}
            ishome={false}
          />
        ))}
      </div>
      <Suspense fallback={<div className="h-[36px]"></div>}>
        <PageNation size={BOARD_SIZE} totalPage={2} className="my-4" />
      </Suspense>
    </div>
  );
}
