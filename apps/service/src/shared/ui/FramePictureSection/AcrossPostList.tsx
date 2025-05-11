import React from "react";
import { POST_TYPE } from "@/src/constant/board";
import { useAcrossBoardListQuery } from "@/src/features/board/query/queries";
import { sortByType } from "../../types/searchFilter.type";
import FramePostSectionListItem from "./FramePostSectionListItem";

interface Props {
  sortBy: sortByType;
}
export default function AcrossPostList({ sortBy }: Props) {
  const { data, isLoading } = useAcrossBoardListQuery({
    page: 0,
    size: 5,
    sortBy: sortBy,
    sortDirection: "desc",
  });

  if (isLoading)
    return (
      <div className="w-full bg-background02 animate-pulse h-[317px] flex justify-center items-center">
        진행중...
      </div>
    );

  console.log(data);

  return (
    <div className="flex flex-col gap-2">
      {/* PostListSkeleton */}
      {data.content.map((post: any) => (
        <FramePostSectionListItem
          defaultHref={`${POST_TYPE.PICTURES !== post.postType ? "/board" : ""}`}
          key={post.id}
          type={post.postType}
          title={post.title}
          viewCount={post.viewCount}
          createdTime={post.createdTime}
          postId={post.id}
        />
      ))}
    </div>
  );
}
