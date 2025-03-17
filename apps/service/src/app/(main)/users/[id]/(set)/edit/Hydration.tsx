import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import React from "react";

import { cookies } from "next/headers";
import { getMember } from "@/src/api/user/server";

import EditForm from "./EditForm";
import { userKeys } from "../../query/qureies";

interface Props {
  memberId: string;
}
export default async function Hydration({ memberId }: Props) {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: userKeys.user(memberId),
    queryFn: () => getMember({ memberId }),
  });
  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <EditForm memberId={memberId} />
    </HydrationBoundary>
  );
}
