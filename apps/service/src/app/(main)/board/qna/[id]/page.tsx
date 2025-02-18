"use client"

import React, { Suspense } from 'react'
import Aside from '../../../archive/[id]/components/Aside';
import SubTitle from '../../../archive/[id]/components/SubTitle';
import { FileListLayout,FileList } from '../../../components/File/ViewFileLayout';
import CommentLayout from '../../../archive/[id]/components/CommentLayout';
import Content from '../../../archive/[id]/components/Content';
import DetailPageTitle from '../../components/DetailPageTitle';
import { MessageSquareMore } from 'lucide-react';
import { useBoardIdStore } from '@/src/store/BoardId';
import { useParams } from 'next/navigation';
import { useSuspenseQuery } from '@tanstack/react-query';
import { IntegratedBoardGetDetail } from '@/src/api/board/integrated';
import PostDetail from './PostDetail';

  
export default  function page() {
  const {id } = useParams();
 
  return (
    <Suspense>
      <PostDetail id={id as string}/>
    </Suspense>
  );
}
