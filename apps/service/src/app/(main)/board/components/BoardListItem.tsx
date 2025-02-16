import React from 'react'
import Link from 'next/link';
import { formatDate } from '@/src/libs/utils/dateParsing';

export interface ItemProps {
    className?: string
    id: string;
    authorName: string;
    authorProfilePhoto: string;
    title: string;
    content: string;
    type: string;
    createdTime: string;
    modifiedTime: string;
    likeCount: number;
    commentCount: number;
    viewCount: number;
    href : string;
}
export default function BoardListItem({title="제목입니다",content="컨텐츠 내용입니다",createdTime="2025.01.01",authorName="권성민", viewCount=5,likeCount=5,commentCount=5,className, type, href} : ItemProps) {
  
  return (
    <div className={`border-b-[1px] border-line01 flex flex-col pb-3 ${className}`}>
        <Link href={href} className='hover:underline' style={{ width: 'max-content' }}><Title title={title}/></Link>
        <Link href={href} className='hover:underline' style={{ width: 'max-content' }}> <div className='t-m mt-3' >{content}</div></Link>
            <div className='mt-4 flex flex-col text-text02'>
            <div className='flex flex-row gap-2'>
            <div className='t-m text-text01 hover:underline'>{authorName}</div>
            </div>
            <div className='flex flex-row gap-2'>
            <div className='t-s'>{formatDate(createdTime)}</div>
            <div className='t-s'>좋아요 {likeCount}</div>
            <div className='t-s'>댓글 {commentCount}</div>
            <div className='t-s'>조회 {viewCount}</div>
            </div>
            </div>
      </div>
  )
}


interface ItemTitleProps{
  title?: string
  labelName? : string;
  className? : string;
}
function Title({title, labelName, className} : ItemTitleProps ) {

  if(labelName)
    return (
      <div className='t-l !font-bold mt-3 flex flex-row gap-2'><p className='bg-primary rounded-lg t-s flex items-center justify-center text-background01 w-[40px] '>{labelName}</p> {title}</div>
    )

  if(labelName === undefined || labelName === ""){
    return (
      <div className='t-l !font-bold mt-3 flex flex-row gap-2'>{title}</div>
    )
  } 
}
