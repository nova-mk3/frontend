import React from "react";

import PostDetail from "./PostDetail";
import ErrorBoundaryWrapper from "@/src/shared/ui/errorBoundary/ErrorBoundaryWrapper";

// TODO: 메타데이터 확인
type Props = {
  params: Promise<{ id: string }>;
};
// export async function generateMetadata({ params }: Props): Promise<Metadata> {
//   const { id: postId } = await params;
//   const postData = await IntegratedBoardGetDetail({
//     postId,
//     boardId: INTEGRATED,
//   });
//   return {
//     title: "NOVA",
//     description: "충북대학교 소프트웨어학과 노바",
//     openGraph: {
//       title: postData.title,
//       description: postData.content,
//       type: "article",
//       authors: [postData.authorName],
//     },
//   };
// }

export default async function Page({ params }: Props) {
  const { id } = await params;

  return (
    <ErrorBoundaryWrapper>
      <PostDetail postId={id} />
    </ErrorBoundaryWrapper>
  );
}
