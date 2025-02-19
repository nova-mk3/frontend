"use client";

import React, { Suspense, useState } from 'react'
import { PageNation } from '../../archive/components/PageNation'
import ItemList from '../components/HomeListItem';
import ContentList from '../components/BoardList';
import { useSuspenseQuery } from '@tanstack/react-query';
import { BoardAllList, IntegratedBoardGet } from '@/src/api/board/integrated';
import { useBoardIdStore } from '@/src/store/BoardId';
import { ErrorBoundary } from 'react-error-boundary'
import { usePostAllListQuery } from '../query/postqueries';
interface Props{
    page : number;
    size : number;
    sort : string;
}

export default function Post({page,size,sort} : Props) {
    const {INTEGRATED} = useBoardIdStore();
    const { data } = usePostAllListQuery({ page : page-1, size, sort , boardId : INTEGRATED})
    
    return (
      <div>
          <ContentList content={data.content}/>
          <Suspense fallback={<div className='h-[36px]'></div>}> 
                  <PageNation size={size} totalPage={data.totalPages} className="my-4" />
          </Suspense>
      </div>
    )
}


