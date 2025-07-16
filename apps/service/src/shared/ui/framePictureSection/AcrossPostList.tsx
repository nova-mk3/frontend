import React from "react";
import { POST_TYPE } from "@/src/constant/board";
import FramePostSectionListItem from "./FramePostSectionListItem";
import { MainBoard } from "@/src/entities/board/board.type";

interface Props {
  data: MainBoard[];
}
export default function AcrossPostList({ data }: Props) {
  return (
    <div className="flex flex-col gap-2">
      {/* PostListSkeleton */}
      {data.map((post: any) => (
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
