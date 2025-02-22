
import React from "react";
import { POST_TYPE } from "@/src/constant/board";
import PictureListItem from "./PictureListItem";


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
  thumbnailUrl : string;
  thumbnailId : string;
  thumbnailWidth : number;
  thumbnailHeight : number
}

interface PostPreview{
  content : Post[]
}
export default function PictureList({content} : PostPreview) {

  if(content.length  === 0)
    return (
      <div className="w-full bg-background02 h-[745px] flex items-center justify-center">
        <p className="!font-bold">게시글이 없습니다 😔</p>
      </div>
    );

    console.log(content);
  return (
    <div className='grid xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 mobile:grid-cols-1 gap-8 px-2 mt-5'>
      {
        content.map((post) => (
          <PictureListItem
            key={post.id}
            id={post.id}
            authorName={post.authorName}
            authorProfilePhoto={post.authorProfilePhoto}
            title={post.title}
            content={post.content}
            createdTime={post.createdTime}
            modifiedTime={post.modifiedTime}
            likeCount={post.likeCount}
            commentCount={post.commentCount}
            viewCount={post.viewCount}
            totalFileDownloadCount={post.totalFileDownloadCount}
            href={`/${POST_TYPE.PICTURES.toLowerCase()}/${post.id}`}
            thumbnailUrl={post.thumbnailUrl}
            thumbnailHeight={post.thumbnailHeight}
            thumbnailWidth={post.thumbnailWidth}
            thumbnailId={post.thumbnailId}
          />
        ))
      }
    </div>
  );
}
