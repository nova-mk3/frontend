"use client";

import React from "react";
import Aside from "../../components/Aside";
import {
  FileListLayout,
  FileList,
} from "../../../components/File/ViewFileLayout";
import Content from "../../components/DetailPageContent";
import { useBoardIdStore } from "@/src/store/BoardId";
import CommentTitle from "../../components/comments/CommentTitle";
import { usePostDetailQuery } from "../../query/postqueries";
import CommentForm from "../../components/comments/CommentForm";
import CommentList from "../../components/comments/CommentList";
import { POST_TYPE } from "@/src/constant/board";
import DetailPageSubTitle from "../../components/DetailPageSubTitle";
import { Separator } from "@nova/ui/components/ui/separator";
import DetailPageTitle from "../../components/DetailPageTitle";
import ErrorBoundaryWrapper from "../../../components/ErrorBoundaryWrapper";

interface PostDetailProps {
  postId: string;
}

export default function PostDetail({ postId }: PostDetailProps) {
  const { INTEGRATED } = useBoardIdStore();
  const { data } = usePostDetailQuery(postId, INTEGRATED);

  console.log(data);
  return (
    <div className="flex flex-col t-m w-full mx-auto">
      <DetailPageTitle
        title="질문"
        backLink={`/board/${POST_TYPE.QNA}`}
        backLinkText="Q&A 목록"
        defaultHref="/board"
        postId={postId}
      />
      <div className="flex flex-row gap-[50px]">
        <Aside count={data.likeCount} liked={data.liked} postId={postId} />
        <div className="flex flex-col gap-6 mx-auto flex-1">
          {/* 게시판 내용 */}
          <DetailPageSubTitle
            title={data.title}
            writer={data.authorName}
            date={data.createdTime}
            viewCount={data.viewCount}
            postId={postId}
            postType={POST_TYPE.QNA}
            boardId={INTEGRATED}
            likeCount={data.likeCount}
            liked={data.liked}
            defaultHref="/board"
          />
          <Content content={data.content} />
          <Separator />
          <p className="text-xl font-semibold">첨부파일</p>
          <FileListLayout>
            <FileList files={data.files} />
          </FileListLayout>
          <CommentTitle title="전체 댓글" count={data.commentCount} />

          <CommentForm postId={postId} />
          <ErrorBoundaryWrapper>
            <CommentList postId={postId} />
          </ErrorBoundaryWrapper>
        </div>
      </div>
    </div>
  );
}
