import React from 'react'
import Title from '../components/Title'
import { MessageSquareMore } from 'lucide-react'
import Item from '../components/Item'

export default function page() {
  return (
    <div>
        <Title title='Q&A' TitleImage={ <MessageSquareMore size={20} />}/>

        <Item/>
                <Item/>
                <Item/>
                <Item/>

    </div>
  )
}
