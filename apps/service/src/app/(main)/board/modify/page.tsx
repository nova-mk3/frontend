"use client";
import React from 'react'
import ErrorBoundaryWrapper from '../../components/ErrorBoundaryWrapper'
import ModifyPage from './ModifyPage'
import { useSearchParams } from 'next/navigation';

export default function page() {

    const searchParams = useSearchParams();  
    const postId = searchParams.get("id") || "";
    const postType = searchParams.get("type") || "";
  return (
    <ErrorBoundaryWrapper>
      <ModifyPage postId={postId} postType={postType}/>
    </ErrorBoundaryWrapper>
  )
}
