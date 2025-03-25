import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import React from "react";
import PostDetail from "./PostDetail";
import { postKeys } from "../../board/query/postqueries";
import { CLUB_ARCHIVE } from "@/src/constant/board";
import getQueryClient from "@/src/query/getQueryClient";
import { PictureGetDetail } from "@/src/api/board/server";
import { CommentsListQueryOptions } from "../../board/query/options";

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
