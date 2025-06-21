// components/server/PostSectionHydration.tsx

"use client";

import { HydrationBoundary, dehydrate } from "@tanstack/react-query";

import { INTEGRATED, POST_TYPE } from "@/src/constant/board";
import getQueryClient from "../../query/getQueryClient";
import { useAcrossBoardListQuery } from "@/src/features/board/query/queries";
import {
  AcrossBoardQueryOptions,
  postSearchQueryOptions,
} from "@/src/features/board/query/options";
import PostSection from "./PostSection";

export default async function PostSectionHydration() {
  const queryClient = getQueryClient();

  // 📦 Pre-fetch all necessary queries
  await Promise.all([
    queryClient.prefetchQuery(
      AcrossBoardQueryOptions({
        page: 0,
        size: 5,
        sortBy: "createdTime",
        sortDirection: "desc",
      })
    ),
    queryClient.prefetchQuery(
      AcrossBoardQueryOptions({
        page: 0,
        size: 5,
        sortBy: "viewCount",
        sortDirection: "desc",
      })
    ),
    queryClient.prefetchQuery(
      postSearchQueryOptions({
        postType: POST_TYPE.NOTICE,
        boardId: INTEGRATED,
        page: 0,
        size: 5,
        sortBy: "createdTime",
        sortDirection: "desc",
        keyword: "",
        searchType: "ALL",
      })
    ),
    queryClient.prefetchQuery(
      postSearchQueryOptions({
        postType: POST_TYPE.INTRODUCTION,
        boardId: INTEGRATED,
        page: 0,
        size: 5,
        sortBy: "createdTime",
        sortDirection: "desc",
        keyword: "",
        searchType: "ALL",
      })
    ),
  ]);

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <PostSection />
    </HydrationBoundary>
  );
}
