import React from "react";
import { INTEGRATED, POST_TYPE } from "@/src/constant/board";
import { usePostListQuery } from "@/src/features/board/query/queries";
import FramePostSectionListItem from "./FramePostSectionListItem";

export default function IntroPostList() {
  const { data, isLoading } = usePostListQuery({
    postType: POST_TYPE.INTRODUCTION,
    page: 0,
    size: 5,
    keyword: "",
    searchType: "ALL",
    sortBy: "createdTime",
    sortDirection: "desc",
    boardId: INTEGRATED,
  });

  if (isLoading)
    return (
      <div className="w-full bg-background02 animate-pulse h-[317px] flex justify-center items-center">
        진행중...
      </div>
    );
  return (
    <div className="flex flex-col gap-2">
      {/* PostListSkeleton */}
      {data.content.map((post: any) => (
        <FramePostSectionListItem
          defaultHref="/board"
          key={post.id}
          type={post.type}
          title={post.title}
          viewCount={post.viewCount}
          createdTime={post.createdTime}
          postId={post.id}
        />
      ))}
    </div>
  );
}
