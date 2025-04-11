"use client";
import { useQuery } from "@tanstack/react-query";
import React from "react";
import Navigation from "./Navigation";
import PendingFallbackUI from "../../../components/Skeleton/PendingFallbackUI";
import { SimpleProfileQueryOptions } from "../query/options";

interface Props {
  id: string;
  children: React.ReactNode;
}
export default function NavClient({ id, children }: Props) {
  const { data, isLoading } = useQuery(SimpleProfileQueryOptions());
  if (isLoading) {
    return <PendingFallbackUI />;
  }
  if (!data) return <>{children}</>;
  if (data.memberId !== id) return <>{children}</>;
  return (
    <div>
      <Navigation />
      {children}
    </div>
  );
}
