"use client";
import React from "react";
import { useArchiveDetailQuery } from "../../board/query/postqueries";
import { CLUB_ARCHIVE, POST_TYPE } from "@/src/constant/board";
import Aside from "../../board/components/Aside";
import DetailPageSubTitle from "../../board/components/DetailPageSubTitle";
import { FileListLayout, FileList } from "../../components/File/ViewFileLayout";
import CommentTitle from "../../board/components/comments/CommentTitle";
import CommentForm from "../../board/components/comments/CommentForm";
import ErrorBoundaryWrapper from "../../components/ErrorBoundaryWrapper";
import CommentList from "../../board/components/comments/CommentList";
import DetailPageContent from "../../board/components/DetailPageContent";
import DetailPageTitle from "../../board/components/DetailPageTitle";
import { Separator } from "@nova/ui/components/ui/separator";
import PendingFallbackUI from "../../components/Skeleton/PendingFallbackUI";

interface PostDetailProps {
  postId: string;
}

export default function PostDetail({ postId }: PostDetailProps) {
  const { data, isLoading } = useArchiveDetailQuery({
    postId,
    boardId: CLUB_ARCHIVE,
  });

  if (isLoading) {
    return <PendingFallbackUI />;
  }

  return (
    <div className="flex flex-col t-m w-full mx-auto">
      <DetailPageTitle
        title="자료"
        backLink={`/${POST_TYPE.EXAM_ARCHIVE}`}
        backLinkText="자료 목록"
        defaultHref="/exam_archive"
        postId={postId}
      />
      <div className="flex flex-row gap-[50px]">
        <Aside count={data.likeCount} liked={data.liked} postId={postId} />
        <div className="flex flex-col gap-[20px] mx-auto flex-1">
          {/* 게시판 내용 */}
          <DetailPageSubTitle
            title={data.title}
            writer={data.authorName}
            date={data.createdTime}
            viewCount={data.viewCount}
            postId={postId}
            postType={POST_TYPE.EXAM_ARCHIVE}
            boardId={CLUB_ARCHIVE}
            likeCount={data.likeCount}
            liked={data.liked}
            authorId={data.authorId}
            defaultHref="/exam_archive"
          />

          <DetailPageContent content={data.content} />
          <Separator />
          <p className="text-xl font-semibold">첨부파일</p>
          <FileListLayout>
            <FileList files={data.files} />
          </FileListLayout>
          <CommentTitle title="전체 댓글" count={data.commentCount} />

          {/* 댓글 부분 */}
          <CommentForm postId={postId} />
          <ErrorBoundaryWrapper>
            <CommentList postId={postId} />
          </ErrorBoundaryWrapper>
        </div>
      </div>
    </div>
  );
}
