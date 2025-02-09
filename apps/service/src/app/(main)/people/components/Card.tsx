import React from 'react'
import Image from 'next/image'
import CardLogo from '@/public/image/CardLogo.svg'
import { IdCard, Phone, Mail,Send,TriangleAlert } from 'lucide-react';
interface CardProps{
    profileImage? : string
    username? : string
    phoneNumber? : string
    email? : string
    job? : string
    isContact? : boolean
    contactInfo? : string
    contactInfoDescription? : string
}

export default function Card() {
  return (
    <div className='shadow-card p-5 flex flex-col gap-1 t-m rounded-lg'>

      <div className='flex flex-row gap-3'>      
        <Image
        src="/image/cat.jpg"
        alt="user profile"
        width={50}
        height={50}
        className='w-[50px] h-[50px] object-cover rounded-full'
        />
        <div className='w-[1px] h-[40px] bg-line01 my-auto'></div>
            <div className='flex flex-col'>
              <p className='!font-bold'>권성민</p>
              <p className='t-s text-text03'>4학년 2학기</p>
            </div>
      <CardLogo width={50} className="ml-auto"/>
      </div>
  
      <p className='text-text02 flex flex-row items-center gap-2 t-s'><Phone size={16}/>010-8888-8888</p>
      <p className='text-text02 flex flex-row items-center gap-2 t-s'><IdCard size={16}/>2018038068</p>
      <p className='text-text02 flex flex-row items-center gap-2 t-s'><Mail size={16}/>000@00000.com</p>
      <p className='text-text02 flex flex-row items-center gap-2 t-s'><Send size={16}/>오픈채팅방, 디엠,이메일 등 연락처</p>
      <p className='h-[1px] bg-line01 my-2'></p>
      <p className='text-text02 flex flex-row items-center gap-2 t-s'><TriangleAlert className='text-yellow-500' size={16}/>참고사항</p>     
      <p className='text-text02 flex flex-row items-center gap-2 t-s'>무슨 말을 작성할까요?!</p>     
    </div>
  )
}
