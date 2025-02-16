"use client";
import React, { Suspense, useEffect, useState } from 'react'
import Aside from '../../../archive/[id]/components/Aside';
import SubTitle from '../../../archive/[id]/components/SubTitle';
import { FileListLayout,FileList } from '../../../archive/[id]/components/FileListLayout';
import CommentLayout from '../../../archive/[id]/components/CommentLayout';
import Content from '../../../archive/[id]/components/Content';
import DetailPageTitle from '../../components/DetailPageTitle';
import { MessageSquareMore } from 'lucide-react';
import { useBoardIdStore } from '@/src/store/BoardId';
import { useParams } from 'next/navigation';
import { useSuspenseQuery } from '@tanstack/react-query';
import { IntegratedBoardGetDetail } from '@/src/api/board/integrated';

import ErrorBoundaryWrapper from '../../../components/ErrorBoundaryWrapper';
import PendingFallbackUI from '../../../components/PendingFallbackUI';
import dynamic from 'next/dynamic';


const PostDetail = dynamic(() => import("./PostDetail"), {
  ssr: false, // 클라이언트에서만 렌더링
  loading: () => <PendingFallbackUI />,
});
  
export default  function page() {
  const {id } = useParams();


  return (
    <ErrorBoundaryWrapper>
      <PostDetail id={id as string}/>
    </ErrorBoundaryWrapper>
  );
}
