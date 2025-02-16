"use client";
import React from 'react'
import HomeListItem from '../components/HomeListItem'
import { useBoardIdStore } from '@/src/store/BoardId';
import { useSuspenseQuery } from '@tanstack/react-query';
import { BoardLatestList } from '@/src/api/board/integrated';
import { POST_TYPE } from '@/src/constant/board';

export default function Post() {

    const {INTEGRATED} = useBoardIdStore();
    const { data, isLoading, error } = useSuspenseQuery({
        
        queryKey: [["postLatest",  INTEGRATED]],
        queryFn: () => BoardLatestList({ boardId : INTEGRATED}),
  
      });
  return (
    <div className='grid gap-4 xl:grid-cols-4 lg:grid-cols-2 mobile:grid-cols-1'>
         <HomeListItem title={"공지사항"} href='/board/notice' data={data.data[POST_TYPE.NOTICE]}/>
         <HomeListItem  title={"Q&A"} href='/board/qna' data={data.data[POST_TYPE.QNA]}/>
         <HomeListItem  title={"자기소개"} href='/board/introduction' data={data.data[POST_TYPE.INTRODUCTION]}/>
         <HomeListItem  title={"자유게시판"} href='/board/free' data={data.data[POST_TYPE.FREE]}/>
    </div>
  )
}
