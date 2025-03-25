"use client";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import React from "react";
import Navigation from "./Navigation";
import { getMemberId } from "@/src/api/user/client";
import PendingFallbackUI from "../../../components/Skeleton/PendingFallbackUI";

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
      <Navigation />
      {children}
    </div>
  );
}
