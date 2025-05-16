import React from "react";
import { INTEGRATED, POST_TYPE } from "@/src/constant/board";
import { usePostListQuery } from "@/src/features/board/query/queries";
import FramePostSectionListItem from "./FramePostSectionListItem";
import { MainBoard } from "@/src/entities/board/board.type";
interface Props {
  data: MainBoard[];
}
export default function IntroPostList({ data }: Props) {
  return (
    <div className="flex flex-col gap-2">
      {/* PostListSkeleton */}
      {data.map((post: any) => (
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
