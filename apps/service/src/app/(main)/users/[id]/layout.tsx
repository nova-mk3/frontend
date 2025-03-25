import React from "react";
import LayoutClient from "./components/LayoutClient";
import ErrorBoundaryWrapper from "../../components/ErrorBoundaryWrapper";

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
      <LayoutClient id={id}>{children}</LayoutClient>;
    </ErrorBoundaryWrapper>
  );
}
