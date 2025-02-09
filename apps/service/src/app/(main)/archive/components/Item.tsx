import Link from 'next/link';
import React from 'react'


export interface ItemProps {
    className?: string
    title? : string;
    content? : string;
    date? : string;
    view? : number;
    likeCount? : number;
    commentCount? : number;
    writer? : string;
    downloadCount? : number;
    fileCount? : number;
    href : string;
}
export default function Item({title="제목입니다",content="컨텐츠 내용입니다",date="2025.01.01",writer="권성민", view=5,likeCount=5,commentCount=5,className, downloadCount=5, fileCount=5 ,href} : ItemProps) {

  return (
    <div className={`border-b-[1px] border-line01 flex flex-col pb-3 ${className}`}>
          <Link href={href} className="hover:underline"><div className='t-l !font-bold mt-3'>제목입니다</div></Link>
          <Link href={href} className="hover:underline"><div className='t-m mt-2'>{content}</div></Link>
            <div className='mt-4 flex flex-row text-text02 items-end gap-2'>
            <div className='flex flex-col'>
            <div className='t-m text-text01'>{writer}</div>
            <div className='t-s'>{date}</div>
            </div>
            <div className='t-s'>파일 {fileCount}</div>
            <div className='t-s'>좋아요 {likeCount}</div>
            <div className='t-s'>댓글 {commentCount}</div>
            <div className='t-s'>조회 {view}</div>
            <div className='t-s'>다운로드 횟수 {downloadCount}</div>
            </div>

        </div>
  )
}
