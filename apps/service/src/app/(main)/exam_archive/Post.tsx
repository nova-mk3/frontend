"use client";

import React, { Suspense } from 'react'
import { useBoardIdStore } from '@/src/store/BoardId';
import { PostType } from '@/src/constant/board';
import { usePostListQuery } from '../board/query/postqueries';
import { PageNation } from '../components/PageNation';
import ArchiveList from './components/ArchiveList';

interface Props{
    postType : PostType;
    page : number;
    size : number;
    sort : string;
}

export default function Post({postType,page,size,sort} : Props) {
    const {CLUB_ARCHIVE} = useBoardIdStore();
    const { data } = usePostListQuery({postType, page : page-1, size, sort , boardId : CLUB_ARCHIVE})
    

    
    return (
      <div>
          <ArchiveList content={data.content}/>
          <Suspense fallback={<div className='h-[36px]'></div>}> 
                  <PageNation size={size} totalPage={data.totalPages} className="my-4" />
          </Suspense>
      </div>
    )
}


