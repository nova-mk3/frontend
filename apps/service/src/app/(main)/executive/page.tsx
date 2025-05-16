import React from "react";
import ExecutivePage from "./components/ExecutivePage";
import ErrorBoundaryWrapper from "@/src/shared/ui/errorBoundary/ErrorBoundaryWrapper";

export default function page() {
  return (
    <ErrorBoundaryWrapper>
      <ExecutivePage />
    </ErrorBoundaryWrapper>
  );
}
