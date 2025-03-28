import React from "react";
import { usePostListQuery } from "../../board/query/postqueries";
import FramPostSectionListItem from "./FramPostSectionListItem";
import { INTEGRATED, POST_TYPE } from "@/src/constant/board";

export default function IntroPostList() {
  const { data, isLoading } = usePostListQuery({
    postType: POST_TYPE.INTRODUCTION,
    page: 0,
    size: 7,
    keyword: "",
    searchType: "",
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
        <FramPostSectionListItem
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
