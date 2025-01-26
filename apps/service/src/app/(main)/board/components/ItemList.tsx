import React from 'react'
import Item, { ItemProps } from './Item';
import Link from 'next/link';


interface ItemListProps{
    title? : string;
    className? : string;
    none ? : boolean
    data? : ItemProps;
    href : string;
}


export default function ItemList({none,className,title,data,href} : ItemListProps) {
    if(none){
        return <div className='w-[32%] flex justify-center items-center bg-background02'>
            준비중입니다.
        </div>
    }
  return (
    <div className={`flex flex-col ${className}`}>
        <div className='flex flex-row items-end'>
        <div className=' t-m !font-bold text-primary'>{title}</div>
        <Link href={href} className='t-s ml-auto text-text02 cursor-pointer'><div>더보기 &gt;</div></Link>
        </div>

        <div className='w-full h-[1px] bg-primary mt-1'></div>

        <Item/>
        <Item/>
        <Item/>
        <Item/>
      </div>
  )
}
