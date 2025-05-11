import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import React from "react";
import PostDetail from "./PostDetail";
import { INTEGRATED } from "@/src/constant/board";
import getQueryClient from "@/src/shared/query/getQueryClient";
import { postKeys } from "@/src/features/board/query/queryKey";
import { IntegratedBoardGetDetail } from "@/src/api/board/server";
import { CommentsListQueryOptions } from "@/src/features/comment/query/option";

interface Props {
  postId: string;
}
export default async function Hydration({ postId }: Props) {
  const queryClient = getQueryClient();
  await queryClient.prefetchQuery({
    queryKey: postKeys.detail(postId),
    queryFn: () => IntegratedBoardGetDetail({ boardId: INTEGRATED, postId }),
  });
  await queryClient.prefetchQuery(CommentsListQueryOptions(postId));
  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <PostDetail postId={postId} />
    </HydrationBoundary>
  );
}
