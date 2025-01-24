import React from 'react'
import Title from '../components/Title'
import { MessageSquareMore } from 'lucide-react'

export default function page() {
  return (
    <div>
        <Title title='Q&A' TitleImage={ <MessageSquareMore size={20} />}/>

    </div>
  )
}
