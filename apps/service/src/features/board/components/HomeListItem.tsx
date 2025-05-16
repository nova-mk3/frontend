"use client";
import React from "react";
import Item from "./BoardListItem";
import Link from "next/link";
import BoardListItem from "./BoardListItem";
import { Board } from "@/src/entities/board/board.type";

interface HomeListItemType {
  className?: string;
  data: Board[];
  title: string;
  href: string;
}

export default function HomeListItem({
  className,
  data,
  title,
  href,
}: HomeListItemType) {
  if (data.length === 0) {
    return (
      <div className={`flex flex-col ${className}`}>
        <div className="flex flex-row items-end">
          <div className=" t-m !font-bold text-primary">{title}</div>
          <Link href={href} className="t-s ml-auto text-text02 cursor-pointer">
            <div>더보기 &gt;</div>
          </Link>
        </div>
        <div className="w-full h-[1px] bg-primary mt-1"></div>
        <div className="bg-background02 h-full flex items-center justify-center !font-bold min-h-[200px]">
          게시글이 없습니다 😔
        </div>
      </div>
    );
  }

  return (
    <div className={`flex flex-col ${className}`}>
      <div className="flex flex-row items-end">
        <div className=" t-m !font-bold text-primary">{title}</div>
        <Link href={href} className="t-s ml-auto text-text02 cursor-pointer">
          <div>더보기 &gt;</div>
        </Link>
      </div>

      <div className="w-full h-[1px] bg-primary mt-1"></div>

      {data.map((post) => (
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
          ishome={true}
        />
      ))}
    </div>
  );
}
