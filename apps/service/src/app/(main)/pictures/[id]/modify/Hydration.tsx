import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import React from "react";

import { PictureGetDetail } from "@/src/api/board/server";
import { CLUB_ARCHIVE } from "@/src/constant/board";
import ModifyPage from "./ModifyPage";
import getQueryClient from "@/src/shared/query/getQueryClient";
import { postKeys } from "@/src/features/board/query/queryKey";

interface Props {
  postId: string;
}
export default async function Hydration({ postId }: Props) {
  const queryClient = getQueryClient();
  await queryClient.prefetchQuery({
    queryKey: postKeys.detail(postId),
    queryFn: () => PictureGetDetail({ boardId: CLUB_ARCHIVE, postId }),
  });
  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <ModifyPage postId={postId} />
    </HydrationBoundary>
  );
}
