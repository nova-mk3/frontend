import AlarmLayout from "@/src/features/alarm/components/AlarmLayout";
import ErrorBoundaryWrapper from "@/src/shared/ui/errorBoundary/ErrorBoundaryWrapper";
import React from "react";

export default function page() {
  return (
    <ErrorBoundaryWrapper>
      <AlarmLayout />
    </ErrorBoundaryWrapper>
  );
}
