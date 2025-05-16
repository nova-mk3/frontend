import React from "react";

import MemberPage from "./components/MemberPage";
import ErrorBoundaryWrapper from "@/src/shared/ui/errorBoundary/ErrorBoundaryWrapper";

export default function page() {
  // 쿼리가 들어갈 예정
  return (
    <ErrorBoundaryWrapper>
      <MemberPage />
    </ErrorBoundaryWrapper>
  );
}
