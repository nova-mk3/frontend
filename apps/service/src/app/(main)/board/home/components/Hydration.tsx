import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import React from "react";
import Post from "./Post";
import { INTEGRATED } from "@/src/constant/board";
import { postLatestQueryOptions } from "@/src/features/board/query/options";
import getQueryClient from "@/src/shared/query/getQueryClient";

export default async function Hydration() {
  const queryClient = getQueryClient();

  await queryClient.prefetchQuery(postLatestQueryOptions(INTEGRATED));

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Post />
    </HydrationBoundary>
  );
}
