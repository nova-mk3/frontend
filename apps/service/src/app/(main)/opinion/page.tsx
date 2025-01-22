import React from 'react'
import Title from './components/Title'
import List from './components/List'

export default function page() {
  return (
    <div className='flex flex-col t-m w-[80%] mx-auto'>
      <Title title='건의함' className='mt-5'/>
      <List/>
    </div>
  )
}
