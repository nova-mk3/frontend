import React from 'react'
import Title from './components/Title'
import Image from 'next/image'
import Item from './Item'
export default function page() {
  return (
    <div className='flex flex-col t-m w-[80%] mx-auto'>
      <Title title="사진 게시판" className='mb-5'/>


      {/* 여기는 카드형식으로 가는게 더 보기 좋을 것 같다 */}



      <div className='grid xl:grid-cols-4 lg:grid-cols-2  mobile:grid-cols-1 gap-8'>
        <Item/>
        <Item/>
        <Item/>
        <Item/>
        <Item/>
        <Item/>
        <Item/>
        </div>

       
    </div>
  )
}