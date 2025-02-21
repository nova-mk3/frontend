import React, { useMemo } from 'react'
import { Lock } from 'lucide-react';
interface ItemProps {
    number? : number,
    title? : string,
    date? : string,
    name? : string,
    isReply? : boolean,
    isRead? : boolean,
    className? : string
}

const MakeNameToAnonymous = (name: string) => {
    return "***";
  };

export default function ListItem({number=1,title="문의 드립니다",date="2025.01.19",name="권성민",isReply=false,isRead,className} : ItemProps) {

    const anonymousName = useMemo(() => MakeNameToAnonymous(name), [name]);

    return (
    <div className={`flex flex-row t-m border rounded-xl border-line01 py-2 hover:bg-background02 cursor-pointer ${className}`}>
        <div className={`w-[60px] text-center`}>{number}</div>
        <div className={`flex flex-row items-center gap-1 flex-1`}><p className='max-w-[400px] truncate'>{title}</p><Lock size={16} className='text-text02'/></div>
        <div className={`w-[100px] text-center`}>{anonymousName}</div>
        <div className={`w-[100px] text-center`}>{date}</div>
        <div className={`w-[100px] text-center ${isRead? 'text-success' : 'text-danger'}`}>{isRead? '답변완료' : '답변대기'}</div>
        <div className={`w-[100px] text-center ${isReply? 'text-success' : 'text-danger'}`}>{isReply? '읽음' : '안읽음'}</div>
    </div>
  )
}
