import React from 'react'
import Navigation from './components/Navigation'
import Title from '../archive/components/Title'
import Item from './components/Item'
import Link from 'next/link'
import { Button } from '@nova/ui/components/ui/button'

export default function page() {
  return (
    <div className='flex flex-row flex-wrap justify-center gap-5 pt-10'>
      <div className={`flex flex-col  border-primary border-b-[1px] py-5 mobile:flex-col mobile:items-center w-full`}>
      <p className="d-l text-primary mx-auto">Welcome to Club Nova</p>

      <div className="flex flex-row items-center gap-[15px] ml-auto mt-auto mobile:flex-col mobile:w-full">
        
      <Link href="/board/newpost" className="mobile:w-full">
          <Button variant="default" className="mobile:w-full">
            글쓰기
          </Button>
        </Link>        
      </div>

    </div>
      <Item title={"공지사항"}/>
      <Item title={"Q&A"}/>
      <Item title={"자기소개"}/>
      <Item title={"자유게시판"}/>
      <Item title={"자유게시판"} none={true}/>
      <Item title={"자유게시판"} none={true}/>
    </div>
)}
