import React from "react";
import ErrorBoundaryWrapper from "../../components/ErrorBoundary/ErrorBoundaryWrapper";
import NavClient from "./components/NavClient";

export default async function layout({
  params,
  children,
}: {
  children: React.ReactNode;
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return (
    <ErrorBoundaryWrapper>
      <NavClient id={id}>{children}</NavClient>
    </ErrorBoundaryWrapper>
  );
}
