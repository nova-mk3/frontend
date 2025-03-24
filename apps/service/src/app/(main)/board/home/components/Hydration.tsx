import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import React from "react";
import getQueryClient from "@/src/query/getQueryClient";
import Post from "./Post";
import { postLatestQueryOptions } from "../../query/options";
import { INTEGRATED } from "@/src/constant/board";

export default async function Hydration() {
  const queryClient = getQueryClient();

  await queryClient.prefetchQuery(postLatestQueryOptions(INTEGRATED));

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Post />
    </HydrationBoundary>
  );
}
