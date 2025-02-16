"use client";
import React from 'react'
import CommentForm from '../../../components/CommentForm'
import CommentItem from '../../../components/CommentItem'
import { useParams } from 'next/navigation';

export default function page() {

  const {id } = useParams();
  
  return (
    <div className='flex flex-col t-m w-full mx-auto'>
    <div className="flex flex-row gap-[50px]">
        <div className='w-[64px] h-[100%] mobile:hidden'></div>
    <div className="flex flex-col gap-[20px] mx-auto flex-1">

      <CommentForm postId={id as string}/>
      <CommentItem />
    </div>
    </div>
    </div>
  )
}