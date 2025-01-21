import React from 'react'

interface Props{
    title? : string;
    className? : string;
    none ? : boolean
}
export default function Item({title,className,none} : Props) {


    if(none){
        return <div className='w-[32%] flex justify-center items-center bg-background02'>
            준비중입니다.
        </div>
    }
  return (
    <div className={`w-[32%] flex flex-col ${className}`}>
        <div className='flex flex-row items-end'>
        <div className=' t-m !font-bold text-primary'>{title}</div>
        <div className=' t-s ml-auto text-text02'>더보기 &gt;</div>
        </div>

        <div className='w-full h-[1px] bg-primary mt-1'></div>

        <div className='border-b-[1px] border-line01 flex flex-col pb-3'>
        <div className='t-l !font-bold mt-2'>제목입니다</div>
        <div className='t-m mt-1'>컨텐츠 내용입니다</div>
            <div className='mt-3 flex flex-row text-text02 items-end gap-4'>
            <div className='flex flex-col'>
            <div className='t-m text-text01'>권성민</div>
            <div className='t-s'>2025.01.01</div>
            </div>
            <div className='t-s'>조회수 5</div>
            </div>

        </div>

        <div className='border-b-[1px] border-line01 flex flex-col pb-3'>
        <div className='t-l !font-bold mt-2'>제목입니다</div>
        <div className='mt-1'>컨텐츠 내용입니다</div>
            <div className='mt-3 flex flex-row text-text02 items-end gap-4'>
            <div className='flex flex-col'>
            <div className='t-m text-text01'>권성민</div>
            <div className='t-s'>2025.01.01</div>
            </div>
            <div className='t-s'>조회수 5</div>
            </div>

        </div>

        <div className='border-b-[1px] border-line01 flex flex-col pb-3'>
        <div className='t-l !font-bold mt-2'>제목입니다</div>
        <div className='mt-1'>컨텐츠 내용입니다</div>
            <div className='mt-3 flex flex-row text-text02 items-end gap-4'>
            <div className='flex flex-col'>
            <div className='t-m text-text01'>권성민</div>
            <div className='t-s'>2025.01.01</div>
            </div>
            <div className='t-s'>조회수 5</div>
            </div>

        </div>

        <div className='border-b-[1px] border-line01 flex flex-col pb-3'>
        <div className='t-l !font-bold mt-2'>제목입니다</div>
        <div className='mt-1'>컨텐츠 내용입니다</div>
            <div className='mt-3 flex flex-row text-text02 items-end gap-4'>
            <div className='flex flex-col'>
            <div className='t-m text-text01'>권성민</div>
            <div className='t-s'>2025.01.01</div>
            </div>
            <div className='t-s'>조회수 5</div>
            </div>

        </div>
      </div>
  )
}
