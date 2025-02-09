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
    labelName? : string;
}
export default function Item({title="제목입니다",content="컨텐츠 내용입니다",date="2025.01.01",writer="권성민", view=5,likeCount=5,commentCount=5,className, labelName} : ItemProps) {
  
  return (
    <div className={`border-b-[1px] border-line01 flex flex-col pb-3 ${className}`}>
        <Title title={title} labelName={labelName}/>
        <div className='t-m mt-3'>{content}</div>
            <div className='mt-4 flex flex-col text-text02'>
            <div className='flex flex-row gap-2'>
            <div className='t-m text-text01'>{writer}</div>
            </div>
            <div className='flex flex-row gap-2'>
            <div className='t-s'>{date}</div>
            <div className='t-s'>좋아요 {likeCount}</div>
            <div className='t-s'>댓글 {commentCount}</div>
            <div className='t-s'>조회 {view}</div>
            </div>
            </div>
      </div>
  )
}


interface ItemTitleProps{
  title?: string
  labelName? : string;
}
function Title({title, labelName} : ItemTitleProps ) {

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
