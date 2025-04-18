"use client";
import { Button } from "@nova/ui/components/ui/button";
import React, { useState } from "react";
import ErrorBoundaryWrapper from "../../../components/ErrorBoundary/ErrorBoundaryWrapper";
import CommentList from "../../../board/components/comments/CommentList";
import CommentForm from "../../../board/components/comments/CommentForm";

export default function CommentSection({ postId }: { postId: string }) {
  const [isCommentOpen, setIsCommentOpen] = useState(false);

  return (
    <div className="w-full">
      {/* 댓글 열기/닫기 버튼 */}
      {!isCommentOpen ? (
        <Button onClick={() => setIsCommentOpen(true)} className="w-full">
          댓글 열기
        </Button>
      ) : (
        <>
          <Button onClick={() => setIsCommentOpen(false)} className="w-full">
            댓글 닫기
          </Button>
          <CommentForm postId={postId} />
          <ErrorBoundaryWrapper>
            <CommentList postId={postId} />
          </ErrorBoundaryWrapper>
        </>
      )}
    </div>
  );
}
