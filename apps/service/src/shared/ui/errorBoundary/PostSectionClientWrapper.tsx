"use client";
import { QueryErrorResetBoundary } from "@tanstack/react-query";
import { ErrorBoundary } from "react-error-boundary";
import { Suspense, ReactNode } from "react";

import FallbackErrorUI from "./ErrorFallBack";
import PendingFallbackUI from "../skeleton/PendingFallbackUI";
import MainErrorBack from "./MainErrorBack";

interface ErrorBoundaryWrapperProps {
  children: ReactNode;
}

export default function PostSectionClientWrapper({
  children,
}: ErrorBoundaryWrapperProps) {
  return (
    <QueryErrorResetBoundary>
      {({ reset }) => (
        <ErrorBoundary onReset={reset} fallbackRender={MainErrorBack}>
          <Suspense fallback={<PendingFallbackUI />}>{children}</Suspense>
        </ErrorBoundary>
      )}
    </QueryErrorResetBoundary>
  );
}
