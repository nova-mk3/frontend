import React from 'react'
import Title from '../components/Title'
import { Book } from 'lucide-react'
import Item from '../components/Item'

export default function page() {
  return (
    <div>
        <Title title='자유 게시판' TitleImage={<Book size={20}/>}/>

        <Item/>
        <Item/>
        <Item/>
        <Item/>
    </div>
  )
}
