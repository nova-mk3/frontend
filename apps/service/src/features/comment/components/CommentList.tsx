"use client";
import React from "react";
import CommentListItem from "./CommentListItem";
import { useCommentsListQuery } from "../hooks/queries";
import { Comment } from "@/src/entities/comment/comment.types";
import PendingFallbackUI from "@/src/shared/ui/skeleton/PendingFallbackUI";

interface CommentListProps {
  postId: string;
}
export default function CommentList({ postId }: CommentListProps) {
  const { data, isLoading } = useCommentsListQuery(postId);

  if (isLoading) {
    return <PendingFallbackUI />;
  }

  return (
    <>
      {data.map((item: Comment) => (
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
