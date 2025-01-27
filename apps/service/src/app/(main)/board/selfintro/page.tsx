import React from 'react'
import Title from '../components/Title'
import { Hand } from 'lucide-react'
import Item from '../components/Item'

export default function page() {
  return (
    <div>
        <Title title='자기소개' TitleImage={ <Hand size={20} />}/>

        <Item/>
        <Item/>
        <Item/>
        <Item/>
    </div>
  )
}
