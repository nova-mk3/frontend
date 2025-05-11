import React from "react";
import PostDetail from "./PostDetail";
import ErrorBoundaryWrapper from "@/src/shared/ui/errorBoundary/ErrorBoundaryWrapper";

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return (
    <ErrorBoundaryWrapper>
      <PostDetail postId={id} />
    </ErrorBoundaryWrapper>
  );
}
