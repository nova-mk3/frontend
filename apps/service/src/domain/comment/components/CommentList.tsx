"use client";
import React from "react";
import CommentListItem, { CommentItemProps } from "./CommentListItem";
import PendingFallbackUI from "@/src/app/(main)/components/Skeleton/PendingFallbackUI";
import { useCommentsListQuery } from "../hooks/queries";

interface CommentListProps {
  postId: string;
}
export default function CommentList({ postId }: CommentListProps) {
  const { data, isLoading } = useCommentsListQuery(postId);

  if (isLoading) {
    return <PendingFallbackUI />;
  }
  console.log(data);
  return (
    <>
      {data.map((item: CommentItemProps) => (
        <CommentListItem
          key={item.id}
          id={item.id}
          authorName={item.authorName}
          authorProfilePhoto={item.authorProfilePhoto}
          children={item.children}
          content={item.content}
          modifiedTime={item.modifiedTime}
          createdTime={item.createdTime}
          postId={postId}
          authorId={item.authorId}
        />
      ))}
    </>
  );
}
