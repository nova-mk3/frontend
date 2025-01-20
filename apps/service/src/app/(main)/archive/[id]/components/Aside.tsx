"use client"
import React from 'react'
import HeartIcon from "@/public/image/Heart.svg";
import { Share2 } from 'lucide-react';
interface AsideProps {
    count?: number;
    className?: string;
}


export default function Aside({count=15 , className} : AsideProps) {
  return (
    <div className={`w-[64px] h-[100%] sticky top-[250px] bg-background02 flex flex-col items-center gap-1.5 p-2 rounded-[32px] mobile:hidden ${className}`}>
        <EmojiCirCleButton onClick={()=>alert("아직 준비중입니다")}><HeartIcon width={24}/></EmojiCirCleButton>
        <p className='text-[#868E96]'>{count}</p>
    
        <EmojiCirCleButton><Share2 size={24}/></EmojiCirCleButton>
            

    </div>
  )
}


// 이렇게 원하는 태그의 type을 상속받아서 진행하는 경우 onClick 등 직접 다 선언하지 않고 사용하는 방법도 존재한다!
interface EmojiCirCleProps extends React.ButtonHTMLAttributes<HTMLButtonElement>{
    className?: string
   children?: React.ReactNode;
}

function EmojiCirCleButton({children,className, ...props} : EmojiCirCleProps){
    return (
        <button className={`border-line01 border-[1px] bg-white w-[48px] h-[48px] flex justify-center items-center text-[#868E96] rounded-[32px] hover:border-black cursor-pointer hover:text-black ${className}`}
        {...props}
        >
            {children}
        </button>
    )
}
