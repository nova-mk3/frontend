import React from "react";
import ErrorBoundaryWrapper from "../../../components/ErrorBoundaryWrapper";
import { Metadata } from "next";
import { INTEGRATED } from "@/src/constant/board";
import Hydration from "./Hydration";
import { IntegratedBoardGetDetail } from "@/src/api/board/server";

// TODO: 메타데이터 확인 -> html을 생성할때만 호출됨!
type Props = {
  params: Promise<{ id: string }>;
};
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id: postId } = await params;
  const postData = await IntegratedBoardGetDetail({
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
