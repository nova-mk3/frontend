'use client';
import { QueryErrorResetBoundary } from '@tanstack/react-query';
import { ErrorBoundary, FallbackProps } from 'react-error-boundary';
import { Suspense, ReactNode } from 'react';
import FallbackErrorUI from './ErrorFallBack';


interface ErrorBoundaryWrapperProps {
  children: ReactNode;
}

export default function ErrorBoundaryWrapper({ children }: ErrorBoundaryWrapperProps) {
  return (
    <QueryErrorResetBoundary>
      {({ reset }) => (
        <ErrorBoundary
          onReset={reset}
          fallbackRender={FallbackErrorUI}
        >
          <Suspense fallback={<div className="w-full h-[745px]"></div>}>
            {children}
          </Suspense>
        </ErrorBoundary>
      )}
    </QueryErrorResetBoundary>
  );
}