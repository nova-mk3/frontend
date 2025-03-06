import React from 'react'
import Link from 'next/link';
import { formatDate } from '@/src/libs/utils/dateParsing';
import { POST_TYPE } from '@/src/constant/board';
import { Eye, Heart, MessageSquare } from 'lucide-react';

export interface BoardListItemType {
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
export default function BoardListItem({title,content,createdTime,authorName, viewCount,likeCount,commentCount,className, type, href} : BoardListItemType) {
  
  return (
    <div className={`border-b-[1px] border-line01 flex flex-col p-4 gap-2 hover:bg-gray-50 ${className}`}>
        <Link href={href} className='w-full'><Title title={title} type={type}/></Link>

        <Link href={href} className='w-full text-muted-foreground'> <div className='text-base' >{content}</div></Link>
            <div className='mt-4 flex flex-row'>
   

            <div className="flex items-center gap-2 text-sm">
                <span className="text-gray-700">{authorName}</span>
                <span className="text-gray-400">·</span>
                <span className="text-gray-500">{formatDate(createdTime)}</span>
            </div>
  
      


            <div className="flex items-center gap-3 text-gray-500 ml-auto">
          <div className="flex items-center gap-1">
            <Eye className="w-4 h-4" />
            <span className="text-xs">{viewCount}</span>
          </div>
          <div className="flex items-center gap-1">
            <MessageSquare className="w-4 h-4" />
            <span className="text-xs">{commentCount}</span>
          </div>
          <div className="flex items-center gap-1">
            <Heart className="w-4 h-4" />
            <span className="text-xs">{likeCount}</span>
          </div>
        </div>
            {/* <div className='t-s'>좋아요 {likeCount}</div>
            <div className='t-s'>댓글 {commentCount}</div>
            <div className='t-s'>조회 {viewCount}</div> */}
         
            </div>
      </div>
  )
}


interface ItemTitleProps{
  title?: string
  type? : string;
  className? : string;
}
export function Title({title, type, className} : ItemTitleProps ) {

  // 임시로 공지로 고정, 추후에 태그 용도로 쓰이면 그때 분리할 예정
  if(type === POST_TYPE.NOTICE)
    return (
      <div className='font-medium text-gray-900 flex flex-row gap-2'>
        <p className='bg-primary rounded-full text-sm flex items-center justify-center text-background01 px-2 py-0.5'>공지</p> 
      <p className='flex-1  hover:text-primary line-clamp-1 t-l'>{title}</p>
      </div>
  )

  
  return (
      <div className='font-medium text-gray-900 t-l  hover:text-primary line-clamp-1'>{title}</div>
  )

}
