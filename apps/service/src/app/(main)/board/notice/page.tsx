import React from 'react'
import Title from '../components/Title'
import { Pin } from 'lucide-react'
import Item from '../components/Item'

export default function page() {
  return (
    <div>
        <Title title='공지사항' TitleImage={ <Pin size={20} />}/>

        <Item/>
                <Item/>
                <Item/>
                <Item/>
    </div>
  )
}
