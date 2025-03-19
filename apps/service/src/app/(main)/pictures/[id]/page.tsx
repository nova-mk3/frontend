import React from "react";
import ErrorBoundaryWrapper from "../../components/ErrorBoundaryWrapper";
import Hydration from "./Hydration";

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return (
    <ErrorBoundaryWrapper>
      <Hydration postId={id} />
    </ErrorBoundaryWrapper>
  );
}
