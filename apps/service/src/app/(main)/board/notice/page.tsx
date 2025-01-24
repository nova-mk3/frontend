import React from 'react'
import Title from '../components/Title'
import { Pin } from 'lucide-react'

export default function page() {
  return (
    <div>
        <Title title='공지사항' TitleImage={ <Pin size={20} />}/>
    </div>
  )
}
