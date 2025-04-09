import React from "react";
import ErrorBoundaryWrapper from "../components/ErrorBoundary/ErrorBoundaryWrapper";
import MemberPage from "./components/MemberPage";

export default function page() {
  // 쿼리가 들어갈 예정
  return (
    <ErrorBoundaryWrapper>
      <MemberPage />
    </ErrorBoundaryWrapper>
  );
}
