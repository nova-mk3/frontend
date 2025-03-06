"use client";
import React from "react";
import ErrorBoundaryWrapper from "../../components/ErrorBoundaryWrapper";
import ModifyPage from "./ModifyPage";

export default function page() {
  return (
    <ErrorBoundaryWrapper>
      <ModifyPage />
    </ErrorBoundaryWrapper>
  );
}
