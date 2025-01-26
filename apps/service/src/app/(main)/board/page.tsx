import React from 'react'
import Navigation from './components/Navigation'
import Title from '../archive/components/Title'
import Item from './components/Item'
import Link from 'next/link'
import { Button } from '@nova/ui/components/ui/button'
import ItemList from './components/ItemList'

export default function page() {
  return (
    <div className='flex flex-col justify-center gap-5 pt-10'>
      <div className={`flex flex-col  border-primary border-b-[1px] py-5 mobile:flex-col mobile:items-center w-full mobile:gap-2`}>
      <p className="d-l text-primary mx-auto mobile:d-s">Welcome to Club Nova</p>

      <div className="flex flex-row items-center gap-[15px] ml-auto mt-auto mobile:flex-col mobile:w-full">
        
      <Link href="/board/newpost" className="mobile:w-full">
          <Button variant="default" className="mobile:w-full">
            글쓰기
          </Button>
        </Link>        
      </div>

    </div>
    <div className='grid grid-cols-3 gap-4 mobile:grid-cols-1'>
      <ItemList title={"공지사항"} href='/board/notice'/>
      <ItemList  title={"Q&A"} href='/board/qna'/>
      <ItemList  title={"자기소개"} href='/board/selfintro'/>
      <ItemList  title={"자유게시판"} href='/board/any'/>
      </div>
    </div>
)}
