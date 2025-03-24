import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import React from "react";
import PostDetail from "./PostDetail";

import getQueryClient from "@/src/query/getQueryClient";
import { INTEGRATED } from "@/src/constant/board";
import { CommentsListQueryOptions } from "../../query/options";
import { postKeys } from "../../query/postqueries";
import { IntegratedBoardGetDetail } from "@/src/api/board/server";

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
