import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import React from "react";
import PostDetail from "./PostDetail";

import { CLUB_ARCHIVE } from "@/src/constant/board";

import { PictureGetDetail } from "@/src/api/board/server";
import getQueryClient from "@/src/shared/query/getQueryClient";
import { postKeys } from "@/src/features/board/query/queryKey";
import { CommentsListQueryOptions } from "@/src/features/comment/query/option";

interface Props {
  postId: string;
}
export default async function Hydration({ postId }: Props) {
  const queryClient = getQueryClient();

  await queryClient.prefetchQuery({
    queryKey: postKeys.detail(postId),
    queryFn: () => PictureGetDetail({ postId, boardId: CLUB_ARCHIVE }),
  });
  await queryClient.prefetchQuery(CommentsListQueryOptions(postId));
  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <PostDetail postId={postId} />
    </HydrationBoundary>
  );
}
