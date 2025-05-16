"use client";
import { CLUB_ARCHIVE, POST_TYPE } from "@/src/constant/board";
import DetailPageContent from "@/src/features/board/components/DetailPageContent";
import DetailPageTitle from "@/src/features/board/components/DetailPageTitle";
import ArchiveDetailPageSubTitle from "@/src/features/exam_archive/components/ArchiveDetailPageSubTitle";
import { useArchiveDetailQuery } from "@/src/features/exam_archive/query/queries";
import PendingFallbackUI from "@/src/shared/ui/skeleton/PendingFallbackUI";
import { Separator } from "@nova/ui/components/ui/separator";
import React from "react";
import {
  FileListLayout,
  FileList,
} from "../../suggestion/components/ViewFileLayout";
import CommentTitle from "@/src/features/comment/components/CommentTitle";
import CommentForm from "@/src/features/comment/components/CommentForm";
import ErrorBoundaryWrapper from "@/src/shared/ui/errorBoundary/ErrorBoundaryWrapper";
import CommentList from "@/src/features/comment/components/CommentList";
import BoardAside from "@/src/features/board/components/BoardAside";

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
        <BoardAside count={data.likeCount} liked={data.liked} postId={postId} />
        <div className="flex flex-col gap-[20px] mx-auto flex-1">
          {/* 게시판 내용 */}
          <ArchiveDetailPageSubTitle
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
