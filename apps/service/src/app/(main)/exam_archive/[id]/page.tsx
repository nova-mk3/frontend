"use client";
import React from 'react'
import { useParams } from 'next/navigation';

import dynamic from 'next/dynamic';
import ErrorBoundaryWrapper from '../../components/ErrorBoundaryWrapper';
import PendingFallbackUI from '../../components/PendingFallbackUI';


const PostDetail = dynamic(() => import("./PostDetail"), {
  ssr: false, // 클라이언트에서만 렌더링
  loading: () => <PendingFallbackUI />,
});
  
export default  function Page() {
  const {id } = useParams();

  return (
    <>
    <ErrorBoundaryWrapper>
      <PostDetail postId={id as string}/>
    </ErrorBoundaryWrapper>
    </>
  );
}
