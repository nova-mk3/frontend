import React, { Suspense } from 'react'
import Title from '../components/Title'
import { PageNation } from '../../archive/components/PageNation'
import Item from '../components/Item'
import { Layers } from 'lucide-react'

export default function page() {
  return (
    <div>
        <Title title="전체글보기" TitleImage={<Layers size={20}/>}/>


        <Item/>
        <Item/>
        <Item/>
        <Item/>
        <Item/>

  
        <Suspense>
        <PageNation size={5} totalPage={10} className='mt-5'/>
        </Suspense>
    </div>
  )
}
