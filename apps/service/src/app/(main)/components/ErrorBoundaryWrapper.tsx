"use client";
import { QueryErrorResetBoundary } from "@tanstack/react-query";
import { ErrorBoundary } from "react-error-boundary";
import { Suspense, ReactNode } from "react";
import FallbackErrorUI from "./ErrorFallBack";
import PendingFallbackUI from "./PendingFallbackUI";
import DeferredComponent from "./DeferredComponent";

interface ErrorBoundaryWrapperProps {
  children: ReactNode;
}

export default function ErrorBoundaryWrapper({
  children,
}: ErrorBoundaryWrapperProps) {
  return (
    <QueryErrorResetBoundary>
      {({ reset }) => (
        <ErrorBoundary onReset={reset} fallbackRender={FallbackErrorUI}>
          <Suspense
            fallback={
              <DeferredComponent>
                <PendingFallbackUI />
              </DeferredComponent>
            }
          >
            {children}
          </Suspense>
        </ErrorBoundary>
      )}
    </QueryErrorResetBoundary>
  );
}
