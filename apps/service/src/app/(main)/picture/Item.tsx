import React from 'react'
import Image from 'next/image'
export default function Item() {
  return (
    <div className='w-[100%] border rounded-lg flex flex-col cursor-pointer shadow-md transition ease-in-out hover:-translate-y-2 duration-300'>
              <Image
                      src="/image/cat.jpg"
                      alt="이미지"
                      width={0}
                      height={0}
                      sizes="100vw"
                      style={{ width: "100%", height: "auto" }}
                      className="border-line01 rounded-lg"
              />
              <div className='p-3 flex flex-col gap-3'>
              <div className='t-l'>제목입니다</div>
    
              <div className='t-m text-text02'>내용입니다</div>
              </div>
              <div className='flex flex-row border-t-[1px] border-line01 px-3 py-1 t-s text-text02 gap-2'>
              <div>좋아요 5</div>
              <div>댓글 5</div>
              <div>사진 3</div>
              </div>
            </div>
  )
}
