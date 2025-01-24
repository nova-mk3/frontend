import React from 'react'
import { StringValidation } from 'zod'



export interface ItemProps {
    className?: string
    title? : string;
    content? : string;
    date? : string;
    view? : number;
    likeCount? : number;
    commentCount? : number;
    writer? : string;
}
export default function Item({title="제목입니다",content="컨텐츠 내용입니다",date="2025.01.01",writer="권성민", view=5,likeCount=5,commentCount=5,className} : ItemProps) {

  return (
    <div className={`border-b-[1px] border-line01 flex flex-col pb-3 ${className}`}>
        <div className='t-l !font-bold mt-2'>제목입니다</div>
        <div className='t-m mt-1'>컨텐츠 내용입니다</div>
            <div className='mt-3 flex flex-row text-text02 items-end gap-2'>
            <div className='flex flex-col'>
            <div className='t-m text-text01'>권성민</div>
            <div className='t-s'>2025.01.01</div>
            </div>
            <div className='t-s'>좋아요 {likeCount}</div>
            <div className='t-s'>댓글 {commentCount}</div>
            <div className='t-s'>조회 {view}</div>
            </div>

        </div>
  )
}
