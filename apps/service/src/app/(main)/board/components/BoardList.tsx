import React from "react";
import BoardListItem from "./BoardListItem";

export interface Post {
  id: string;
  authorName: string;
  authorProfilePhoto: string;
  title: string;
  content: string;
  type: string;
  createdTime: string;
  modifiedTime: string;
  likeCount: number;
  commentCount: number;
  viewCount: number;
}

interface PostPreview {
  content: Post[];
}
export default function BoardList({ content }: PostPreview) {
  if (content.length === 0)
    return (
      <div className="w-full bg-background02 h-[745px] flex items-center justify-center mt-8">
        <p className="!font-bold">게시글이 없습니다 😔</p>
      </div>
    );

  return (
    <div className="flex flex-col min-h-[745px]">
      {content.map((post) => (
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
  );
}
