import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import React from "react";

import EditForm from "./EditForm";
import { userKeys } from "../../query/qureies";
import getQueryClient from "@/src/shared/query/getQueryClient";
import { getMember } from "@/src/api/user/server";

interface Props {
  memberId: string;
}
export default async function Hydration({ memberId }: Props) {
  const queryClient = getQueryClient();

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
