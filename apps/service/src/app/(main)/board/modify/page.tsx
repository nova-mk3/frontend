"use client";
import React from "react";
import ModifyPage from "./ModifyPage";
import ErrorBoundaryWrapper from "../../components/ErrorBoundaryWrapper";
export const dynamic = "force-dynamic";
export default function page() {
  return (
    <ErrorBoundaryWrapper>
      <ModifyPage />
    </ErrorBoundaryWrapper>
  );
}
