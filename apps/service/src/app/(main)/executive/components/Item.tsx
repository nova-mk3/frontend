import React from 'react'
import Image from 'next/image'
export default function Item() {
  return (
    <div className='flex flex-row items-center border-primary border-[1px] t-s p-[9px] rounded-md w-[160px] cursor-pointer'>
         <Image
                src="/image/cat.jpg"
                alt="user profile"
                width={60}
                height={60}
                className='w-[60px] h-[60px] object-cover rounded-full'
         />
         <p className='ml-auto t-l'>권성민</p>
    </div>
  )
}
