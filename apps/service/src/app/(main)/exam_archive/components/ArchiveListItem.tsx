import React from 'react'
import Link from 'next/link';
import { formatDate } from '@/src/libs/utils/dateParsing';
import { POST_TYPE } from '@/src/constant/board';

export interface ArchiveListItemType {
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
    totalFileDownloadCount : number;
}
export default function ArchiveListItem({title,content,createdTime,authorName, viewCount,likeCount,commentCount,className, type, href} : ArchiveListItemType) {
  
  return (
    <div className={`border-b-[1px] border-line01 flex flex-col pb-3 ${className}`}>
        <Link href={href} className='w-full'><Title title={title} type={type}/></Link>
        <Link href={href} className='hover:underline w-full'> <div className='t-m mt-3' >{content}</div></Link>
            <div className='mt-4 flex flex-col text-text02'>
            <div className='flex flex-row gap-2'>
            <div className='t-m text-text01 hover:underline'>{authorName}</div>
            </div>
            <div className='flex flex-row gap-2'>
            <div className='t-s'>{formatDate(createdTime)}</div>
            <div className='t-s'>좋아요 {likeCount}</div>
            <div className='t-s'>댓글 {commentCount}</div>
            <div className='t-s'>조회 {viewCount}</div>
            <div className='t-s'>다운로드 횟수 {viewCount}</div>
            </div>
            </div>
      </div>
  )
}


interface ItemTitleProps{
  title?: string
  type? : string;
  className? : string;
}
function Title({title, type, className} : ItemTitleProps ) {

  // 임시로 공지로 고정, 추후에 태그 용도로 쓰이면 그때 분리할 예정
  if(type === POST_TYPE.NOTICE)
    return (
      <div className='t-l !font-bold mt-3 flex flex-row gap-2 '><p className='bg-primary rounded-lg t-s flex items-center justify-center text-background01 px-1.5 '>공지</p> 
      <p className='hover:underline truncate'>{title}</p>
      </div>
  )

  
  return (
      <div className='flex-1 t-l !font-bold mt-3 hover:underline truncate'>{title}</div>
  )

}
