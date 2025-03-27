"use client";
import { useQuery } from "@tanstack/react-query";
import React from "react";

import PendingFallbackUI from "@/src/app/(main)/components/Skeleton/PendingFallbackUI";
import SubNavigation from "./SubNavigation";
import { SimpleProfileQueryOptions } from "../../query/options";

interface Props {
  id: string;
  children: React.ReactNode;
}
export default function LayoutClient({ id, children }: Props) {
  const { data, isLoading } = useQuery(SimpleProfileQueryOptions());
  if (isLoading) {
    return <PendingFallbackUI />;
  }
  if (id !== data.memberId) return <>{children}</>;
  return (
    <div>
      <SubNavigation />
      {children}
    </div>
  );
}
