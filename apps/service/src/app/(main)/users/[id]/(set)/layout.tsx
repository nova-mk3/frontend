import React from "react";
import LayoutClient from "./components/LayoutClient";
import ErrorBoundaryWrapper from "../../../components/ErrorBoundary/ErrorBoundaryWrapper";

export default async function layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
