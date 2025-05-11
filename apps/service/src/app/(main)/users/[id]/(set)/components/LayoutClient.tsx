"use client";
import { useQuery } from "@tanstack/react-query";
import React from "react";

import SubNavigation from "./SubNavigation";
import { SimpleProfileQueryOptions } from "../../query/options";
import PendingFallbackUI from "@/src/shared/ui/skeleton/PendingFallbackUI";

interface Props {
  id: string;
  children: React.ReactNode;
}
export default function LayoutClient({ id, children }: Props) {
  const { data, isLoading } = useQuery(SimpleProfileQueryOptions());

  if (isLoading) {
    return <PendingFallbackUI />;
  }

  if (!data) return <>{children}</>;
  if (data.memberId !== id) return <>{children}</>;

  return (
    <div>
      <SubNavigation />
      {children}
    </div>
  );
}
