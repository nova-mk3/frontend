import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import React from "react";
import PostDetail from "./PostDetail";
import getQueryClient from "@/src/query/getQueryClient";
import { INTEGRATED } from "@/src/constant/board";
import { postKeys } from "../../board/query/postqueries";
import { ArchiveGetDetail } from "@/src/api/board/exam";
import { CommentsListQueryOptions } from "../../board/query/options";

interface Props {
  postId: string;
}
export default async function Hydration({ postId }: Props) {
  const queryClient = getQueryClient();
  await queryClient.prefetchQuery({
    queryKey: postKeys.detail(postId),
    queryFn: () => ArchiveGetDetail({ boardId: INTEGRATED, postId }),
  });
  await queryClient.prefetchQuery(CommentsListQueryOptions(postId));
  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <PostDetail postId={postId} />
    </HydrationBoundary>
  );
}
