"use client";
import React from 'react'
import ErrorBoundaryWrapper from '../../components/ErrorBoundaryWrapper'
import ModifyPage from './ModifyPage'
import { useSearchParams } from 'next/navigation';

export default function page() {
  return (
    <ErrorBoundaryWrapper>
      <ModifyPage/>
    </ErrorBoundaryWrapper>
  )
}
