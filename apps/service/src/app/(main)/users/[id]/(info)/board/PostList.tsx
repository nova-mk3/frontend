import { BOARD_SIZE, POST_TYPE } from "@/src/constant/board";
import React, { Suspense } from "react";
import { useMypagePostQuery } from "../../query/qureies";
import PendingFallbackUI from "@/src/shared/ui/skeleton/PendingFallbackUI";
import { useQueryParams } from "@/src/shared/hooks/useQueryParams";
import BoardListItem from "@/src/features/board/components/BoardListItem";
import { Board } from "@/src/entities/board/board.type";
import { PageNation } from "@/src/shared/ui/pageNation/PageNation";

export default function PostList() {
  const { currentPage } = useQueryParams();

  const { data, isLoading } = useMypagePostQuery({
    page: currentPage - 1,
    size: BOARD_SIZE,
  });

  if (isLoading) {
    return <PendingFallbackUI />;
  }

  if (data.content.length === 0)
    return (
      <div className="w-full bg-background02 h-[745px] flex items-center justify-center mt-8">
        <p className="!font-bold">게시글이 없습니다 😔</p>
      </div>
    );

  return (
    <>
      <div className="flex flex-col gap-2 min-h-[700px] mt-5">
        {data.content.map((post: Board) => {
          const PostTypeCheck =
            post.type === POST_TYPE.EXAM_ARCHIVE ||
            post.type === POST_TYPE.PICTURES;

          return (
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
              href={
                PostTypeCheck
                  ? `/${post.type.toLowerCase()}/${post.id}`
                  : `/board/${post.type.toLowerCase()}/${post.id}`
              }
              ishome={false}
            />
          );
        })}
      </div>
      <Suspense fallback={<div className="h-[36px]"></div>}>
        <PageNation
          size={BOARD_SIZE}
          totalPage={data.totalPages}
          className="my-4"
        />
      </Suspense>
    </>
  );
}
