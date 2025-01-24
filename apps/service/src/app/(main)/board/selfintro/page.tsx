import React from 'react'
import Title from '../components/Title'
import { Hand } from 'lucide-react'

export default function page() {
  return (
    <div>
        <Title title='자기소개' TitleImage={ <Hand size={20} />}/>
    </div>
  )
}
