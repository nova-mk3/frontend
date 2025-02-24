"use client"
import React, { useMemo } from 'react'
import { Lock } from 'lucide-react';
import { formatDate } from '@/src/libs/utils/dateParsing';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
export interface SuggestionItem {
  answerRead : boolean
  answered : boolean,
  author : boolean
  createdTime : string
  modifiedTime : string,
  private  : boolean
  title : string
  className? : string
  index : number
  id : string
}

const MakeNameToAnonymous = (name: string) => {
    return "***";
  };

export default function SuggestionListItem({answerRead,answered,author,createdTime,modifiedTime, private : Private ,title,className,index,id} : SuggestionItem) {
  console.log(Private);   
  const router = useRouter();
    const anonymousName = useMemo(() => MakeNameToAnonymous(title), [title]);

      //비공개 글이지만 관리자는 읽을수 있어야함!
    //  const handleClick = ()=>{
    //     if(private){
          
    //       return; 
    //     }

    //  }
    return (
    <Link href={`/suggestion/${id}`} className={`flex flex-row t-m border rounded-xl border-line01 py-2 hover:bg-background02 cursor-pointer ${className}`}>
        <div className={`w-[60px] text-center`}>{index+1}</div>
        <div className={`flex flex-row items-center gap-1 flex-1`}><p className='max-w-[400px] truncate'>{title}</p><Lock size={16} className='text-text02'/></div>
        <div className={`w-[100px] text-center`}>{anonymousName}</div>
        <div className={`w-[100px] text-center`}>{formatDate(createdTime)}</div>
        <div className={`w-[100px] text-center ${answered? 'text-success' : 'text-danger'}`}>{answered? '답변완료' : '답변대기'}</div>
        <div className={`w-[100px] text-center ${answerRead? 'text-success' : 'text-danger'}`}>{answerRead? '읽음' : '안읽음'}</div>
    </Link>
  )
}
