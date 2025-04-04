import React from "react";
import ErrorBoundaryWrapper from "../../../components/ErrorBoundaryWrapper";
import Profile from "./components/Profile";

export default async function page({
  params,
  children,
}: {
  children: React.ReactNode;
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return (
    <ErrorBoundaryWrapper>
      <Profile memberId={id} />
    </ErrorBoundaryWrapper>
  );
}
