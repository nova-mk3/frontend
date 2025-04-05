import React from "react";
import ErrorBoundaryWrapper from "../components/ErrorBoundaryWrapper";
import ExecutivePage from "./components/ExecutivePage";

export default function page() {
  return (
    <ErrorBoundaryWrapper>
      <ExecutivePage />
    </ErrorBoundaryWrapper>
  );
}
