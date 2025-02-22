"use client";
import React from 'react'
import HomeListItem from '../../components/HomeListItem'
import { useBoardIdStore } from '@/src/store/BoardId';
import { POST_TYPE, POST_TYPE_LABEL } from '@/src/constant/board';
import { usePostLatestListQuery } from '../../query/postqueries';
import { useSearchParams } from 'next/navigation';

export default function Post() {
  //  const seartch = useSearchParams(); // 이자식 차이였어...
    const {INTEGRATED} = useBoardIdStore();
    const { data } = usePostLatestListQuery({ boardId : INTEGRATED});
    
  return (
    <div className='grid gap-4 xl:grid-cols-4 lg:grid-cols-2 mobile:grid-cols-1'>
         <HomeListItem  title={POST_TYPE_LABEL[POST_TYPE.NOTICE]} href='/board/notice' data={data[POST_TYPE.NOTICE]}/>
         <HomeListItem  title={POST_TYPE_LABEL[POST_TYPE.QNA]} href='/board/qna' data={data[POST_TYPE.QNA]}/>
         <HomeListItem  title={POST_TYPE_LABEL[POST_TYPE.INTRODUCTION]} href='/board/introduction' data={data[POST_TYPE.INTRODUCTION]}/>
         <HomeListItem  title={POST_TYPE_LABEL[POST_TYPE.FREE]} href='/board/free' data={data[POST_TYPE.FREE]}/>
    </div>
  )
}
