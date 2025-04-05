import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import React from "react";

import getQueryClient from "@/src/query/getQueryClient";
import { PictureGetDetail } from "@/src/api/board/server";
import { CLUB_ARCHIVE } from "@/src/constant/board";
import ModifyPage from "./ModifyPage";
import { postKeys } from "../../../board/query/postqueries";

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
