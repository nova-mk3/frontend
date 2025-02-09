import React from 'react'
import Title from './components/Title'
import { Crown } from 'lucide-react'
import Item from './components/Item'

export default function page() {
  return (
    <div className=''>
        <Title title='임원소개' TitleImage={<Crown size={24}/>}/>
        <p className='text-primary t-l !font-bold py-5'>2024년</p>
        <div className='flex flex-col gap-1'>
        <p className='h-s'>회장</p>
        <div className='flex flex-row gap-4 mb-5'>
            <Item/>
        </div>
        <p className='h-s'>부회장</p>
        <div className='flex flex-row gap-4 mb-5'>
            <Item/>
        </div>
        <p className='h-s'> 임원</p>
         <div className='flex flex-row gap-4 mb-5'>
            <Item/><Item/><Item/><Item/><Item/><Item/>
        </div>
        </div>
    </div>
  )
}
