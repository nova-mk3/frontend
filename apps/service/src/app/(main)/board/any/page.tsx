import React from 'react'
import Title from '../components/Title'
import { Book } from 'lucide-react'

export default function page() {
  return (
    <div>
        <Title title='자유 게시판' TitleImage={<Book size={20}/>}/>
    </div>
  )
}
