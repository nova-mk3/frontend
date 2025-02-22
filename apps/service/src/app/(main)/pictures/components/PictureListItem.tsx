import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { formatDate } from '@/src/libs/utils/dateParsing';

interface PictureListItemProps{
    className?: string
    id: string;
    authorName: string;
    authorProfilePhoto: string;
    title: string;
    content: string;
    createdTime: string;
    modifiedTime: string;
    likeCount: number;
    commentCount: number;
    viewCount: number;
    href : string;
    totalFileDownloadCount : number;
    thumbnailUrl : string;
    thumbnailId : string;
    thumbnailWidth : number;
    thumbnailHeight : number
}

export default function PictureListItem({
   className,
   id,
   title,content,createdTime,authorName,href, viewCount,likeCount,commentCount,thumbnailUrl,thumbnailId,thumbnailWidth,thumbnailHeight

}:PictureListItemProps) {
  return (
    <div className='w-[100%] border rounded-lg flex flex-col cursor-pointer shadow-md transition ease-in-out hover:-translate-y-2 duration-300'>
      <Link href={href} >
            <div className='relative w-full aspect-video'>
              <Image
                      src="/image/cat1.jpg"
                      alt={thumbnailId + "/image.jpg"} 
                      fill
                      sizes='100vw'
                      className="border-line01 rounded-t-lg"
              />
              </div>
              <div className='p-3 flex flex-col gap-3'>
              <div className='t-l'>{title}</div>
    
              <div className='t-m text-text02 min-h-[48px]'>{content}</div>
              </div>
              <div className='flex flex-row border-t-[1px] border-line01 px-3 py-1 t-s text-text02 gap-2'>
              <div>{formatDate(createdTime)}</div>
              <div>좋아요 {likeCount}</div>
              <div>사진개수</div>
              <div className='ml-auto'>{authorName}</div>
              </div>
              </Link>
            </div>
  )
}
