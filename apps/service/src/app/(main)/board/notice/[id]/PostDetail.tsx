"use client";

import React from "react";

import { INTEGRATED, POST_TYPE } from "@/src/constant/board";

import { Separator } from "@nova/ui/components/ui/separator";

import { usePostDetailQuery } from "@/src/features/board/query/queries";
import DetailPageTitle from "@/src/features/board/components/DetailPageTitle";
import DetailPageSubTitle from "@/src/features/board/components/DetailPageSubTitle";
import DetailPageContent from "@/src/features/board/components/DetailPageContent";
import CommentTitle from "@/src/features/comment/components/CommentTitle";
import CommentForm from "@/src/features/comment/components/CommentForm";
import CommentList from "@/src/features/comment/components/CommentList";
import BoardAside from "@/src/features/board/components/BoardAside";
import PendingFallbackUI from "@/src/shared/ui/skeleton/PendingFallbackUI";
import ErrorBoundaryWrapper from "@/src/shared/ui/errorBoundary/ErrorBoundaryWrapper";
import {
  FileListLayout,
  FileList,
} from "@/src/features/file/components/ViewFileLayout";

interface PostDetailProps {
  postId: string;
}

export default function PostDetail({ postId }: PostDetailProps) {
  const { data, isLoading } = usePostDetailQuery(postId, INTEGRATED);

  if (isLoading) {
    return <PendingFallbackUI />;
  }

  return (
    <div className="flex flex-col t-m w-full mx-auto">
      <DetailPageTitle
        title="공지"
        backLink={`/board/${POST_TYPE.NOTICE}`}
        backLinkText="공지 목록"
        defaultHref="/board"
        postId={postId}
      />
      <div className="flex flex-row gap-[50px]">
        <BoardAside count={data.likeCount} liked={data.liked} postId={postId} />
        <div className="flex flex-col gap-[20px] mx-auto flex-1">
          {/* 게시판 내용 */}
          <DetailPageSubTitle
            title={data.title}
            writer={data.authorName}
            date={data.createdTime}
            viewCount={data.viewCount}
            postId={postId}
            postType={POST_TYPE.NOTICE}
            boardId={INTEGRATED}
            likeCount={data.likeCount}
            liked={data.liked}
            authorId={data.authorId}
            defaultHref="/board"
          />
          <DetailPageContent content={data.content} />
          <Separator />
          <p className="text-xl font-semibold">첨부파일</p>
          <FileListLayout>
            <FileList files={data.files} />
          </FileListLayout>
          <CommentTitle title="전체 댓글" count={data.commentCount} />

          <CommentForm postId={postId as string} />
          <ErrorBoundaryWrapper>
            <CommentList postId={postId as string} />
          </ErrorBoundaryWrapper>
        </div>
      </div>
    </div>
  );
}
