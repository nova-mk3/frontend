import React from "react";
import ErrorBoundaryWrapper from "../../components/ErrorBoundary/ErrorBoundaryWrapper";
import PostDetail from "./PostDetail";

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
