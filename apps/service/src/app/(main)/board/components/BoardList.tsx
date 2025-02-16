import React from "react";
import BoardItem from "./BoardListItem";


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

interface PostPreview{
  content : Post[]
}
export default function BoardList({content} : PostPreview) {


  return (
    <div className="flex flex-col">
      {
        content.map((post) => (
          <BoardItem
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
          />
        ))
      }
    </div>
  );
}
