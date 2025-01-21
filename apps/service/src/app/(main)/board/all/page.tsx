import React from 'react'
import Title from '../../archive/components/Title'
import { PageNation } from '../../archive/components/PageNation'

export default function page() {
  return (
    <div>
        <Title title="전체글보기"/>

{/*  일단 컴포넌트 예정 */}

        <div className='mt-1'>
        <div className='border-b-[1px] border-line01 flex flex-col pb-3'>
        <div className='t-l !font-bold mt-2'>제목입니다</div>
        <div className='t-m mt-1'>컨텐츠 내용입니다</div>
            <div className='mt-3 flex flex-row text-text02 items-end gap-4'>
            <div className='flex flex-col'>
            <div className='t-m text-text01'>권성민</div>
            <div className='t-s'>2025.01.01</div>
            </div>
            <div className='t-s'>조회수 5</div>
            <div className='t-s'>좋아요</div>
            <div className='t-s'>댓글</div>
            </div>

        </div>

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
        <div className='t-m mt-1'>컨텐츠 내용입니다</div>
            <div className='mt-3 flex flex-row text-text02 items-end gap-4'>
            <div className='flex flex-col'>
            <div className='t-m text-text01'>권성민</div>
            <div className='t-s'>2025.01.01</div>
            </div>
            <div className='t-s'>조회수 5</div>
            </div>

        </div>

        </div>

        <PageNation size={5} totalPage={10} className='mt-5'/>
    </div>
  )
}
