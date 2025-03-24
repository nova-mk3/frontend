import React from "react";
import { Metadata } from "next";
import { INTEGRATED } from "@/src/constant/board";
import Hydration from "./Hydration";
import ErrorBoundaryWrapper from "../../components/ErrorBoundaryWrapper";
import { ArchiveGetDetail } from "@/src/api/board/exam";

// TODO: 메타데이터 확인
type Props = {
  params: Promise<{ id: string }>;
};
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id: postId } = await params;
  const postData = await ArchiveGetDetail({
    postId,
    boardId: INTEGRATED,
  });
  return {
    title: "NOVA",
    description: "충북대학교 소프트웨어학과 노바",
    openGraph: {
      title: postData.title,
      description: postData.content,
      type: "article",
      authors: [postData.authorName],
    },
  };
}

export default async function Page({ params }: Props) {
  const { id } = await params;

  return (
    <ErrorBoundaryWrapper>
      <Hydration postId={id} />
    </ErrorBoundaryWrapper>
  );
}
