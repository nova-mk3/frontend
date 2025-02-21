import React, { Suspense } from 'react'
import ListItem from './ListItem'
import { PageNation } from '../../components/PageNation'



export default function List() {
  return (
    <div className='flex flex-col gap-2'>
        <div className='flex flex-row t-m border-y-[1px] border-line01 py-2 mt-5'>
           <p className='w-[60px] text-center'>번호</p> 
           <p className='text-center'>제목</p> 
           <p className='w-[100px] ml-auto text-center'>작성자</p> 
           <p className='w-[100px] text-center'>작성날짜</p> 
           <p className='w-[100px] text-center'>읽음</p> 
           <p className='w-[100px] text-center'>답변</p> 
        </div>
        <ListItem/>
        <ListItem/>
        <ListItem/>
        <ListItem/>
        <ListItem/>
        <ListItem/>
        <ListItem/>
        <ListItem/>
        
        <Suspense>
        <PageNation totalPage={10} size={5} className='mt-4'/>
        </Suspense>
    </div>
  )
}
