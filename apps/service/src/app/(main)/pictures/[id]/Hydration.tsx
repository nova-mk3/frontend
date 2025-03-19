import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import React from "react";
import { cookies } from "next/headers";
import PostDetail from "./PostDetail";
import { postKeys } from "../../board/query/postqueries";
import { PictureGetDetail } from "@/src/api/board/pictureserver";
import { CLUB_ARCHIVE } from "@/src/constant/board";

interface Props {
  postId: string;
}
export default async function Hydration({ postId }: Props) {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: postKeys.detail(postId),
    queryFn: () => PictureGetDetail({ postId, boardId: CLUB_ARCHIVE }),
  });
  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <PostDetail postId={postId} />
    </HydrationBoundary>
  );
}
