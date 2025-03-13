import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import React from "react";
import EditForm from "../components/EditForm";
import { userKeys } from "../query/qureies";
import { cookies } from "next/headers";
import { getMember } from "@/src/api/user/server";
import ErrorBoundaryWrapper from "../../../components/ErrorBoundaryWrapper";

interface Props {
  memberId: string;
}
export default async function Hydration({ memberId }: Props) {
  const queryClient = new QueryClient();
  const cookieStore = await cookies();
  const authToken = cookieStore.get("AUTH_TOKEN")?.value;

  await queryClient.prefetchQuery({
    queryKey: userKeys.user(memberId),
    queryFn: () => getMember({ memberId, authToken }),
  });
  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <EditForm memberId={memberId} />
    </HydrationBoundary>
  );
}
