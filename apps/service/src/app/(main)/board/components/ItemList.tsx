import React from 'react'
import Item, { ItemProps } from './Item';


interface ItemListProps{
    title? : string;
    className? : string;
    none ? : boolean
    data? : ItemProps;
}


export default function ItemList({none,className,title,data} : ItemListProps) {
    if(none){
        return <div className='w-[32%] flex justify-center items-center bg-background02'>
            준비중입니다.
        </div>
    }
  return (
    <div className={`flex flex-col ${className}`}>
        <div className='flex flex-row items-end'>
        <div className=' t-m !font-bold text-primary'>{title}</div>
        <div className=' t-s ml-auto text-text02'>더보기 &gt;</div>
        </div>

        <div className='w-full h-[1px] bg-primary mt-1'></div>

        <Item/>
        <Item/>
        <Item/>
        <Item/>
      </div>
  )
}
