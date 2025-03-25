"use client";
import { useQuery } from "@tanstack/react-query";
import React from "react";

import { getMemberId } from "@/src/api/user/client";
import PendingFallbackUI from "@/src/app/(main)/components/Skeleton/PendingFallbackUI";
import SubNavigation from "./SubNavigation";

interface Props {
  id: string;
  children: React.ReactNode;
}
export default function LayoutClient({ id, children }: Props) {
  const { data: memberId, isLoading } = useQuery({
    queryKey: ["memberId"],
    queryFn: getMemberId,
    staleTime: 0,
  });
  if (isLoading) {
    return <PendingFallbackUI />;
  }
  if (id !== memberId) return <>{children}</>;
  return (
    <div>
      <SubNavigation />
      {children}
    </div>
  );
}
