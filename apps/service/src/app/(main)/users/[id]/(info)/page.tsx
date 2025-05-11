import React from "react";
import Profile from "./components/Profile";
import ErrorBoundaryWrapper from "@/src/shared/ui/errorBoundary/ErrorBoundaryWrapper";

export default async function page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return (
    <ErrorBoundaryWrapper>
      <Profile memberId={id} />
    </ErrorBoundaryWrapper>
  );
}
