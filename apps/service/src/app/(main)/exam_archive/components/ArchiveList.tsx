
import React from "react";
import { POST_TYPE } from "@/src/constant/board";
import ArchiveListItem from "./ArchiveListItem";


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
  totalFileDownloadCount : number
}

interface PostPreview{
  content : Post[]
}
export default function ArchiveList({content} : PostPreview) {

  if(content.length  === 0)
    return (
      <div className="w-full bg-background02 h-[745px] flex items-center justify-center">
        <p className="!font-bold">게시글이 없습니다 😔</p>
      </div>
    );

    console.log(content);
  return (
    <div className="flex flex-col">
      {
        content.map((post) => (
          <ArchiveListItem
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
            totalFileDownloadCount={post.totalFileDownloadCount}
            href={`/${POST_TYPE.EXAM_ARCHIVE.toLowerCase()}/${post.id}`}
          />
        ))
      }
    </div>
  );
}
