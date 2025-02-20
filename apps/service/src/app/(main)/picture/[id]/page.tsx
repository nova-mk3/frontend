import React from 'react'
import {Heart, Image} from 'lucide-react'
import ImageSlider  from './components/ImageSlider';
import CommentSection from './components/CommentSection';
import Like from '../../board/components/MobileLike';
interface Props {
    params: Promise<{ id: string }>;
  }
export default async function page({ params }: Props) {

 const { id } = await params;

  return (
    <div className='flex flex-col t-m w-[80%] mx-auto'>
        <div className={`flex flex-row flex-wrap items-end border-primary border-b-[1px] py-5 mobile:flex-col mobile:items-center `}>
        <p className="t-l !font-bold text-primary mobile:mb-[15px] flex flex-row gap-2 items-center"> <Image size={28} />사진 게시판</p>
        </div>


        <div className='flex flex-col gap-10'>
          <div className='flex flex-row gap-10 mt-5 pb-10 border-line01 border-b-[1px] mobile:flex-col'>

          <div className='mb-auto w-[50%] aspect-square mobile:w-full'>
              <ImageSlider/>
          </div>

          <div className='flex flex-col flex-1 gap'>
              <p className='t-l !font-bold'>타이틀입니다</p>
              
              <div className='flex flex-row mt-3 gap-2 t-m text-text03'>
                <p>권성민</p>
                <p className=''>5일전</p>
                <Like className='ml-auto mr-2' count={5}/>
                <p className=''>수정</p>
                <p className='w-[1px] h-[20px] bg-line01'></p>
                <p>삭제</p>
              </div>
              <p className='mt-5 flex-1'>일단은 내용입니다</p>
              
              <div className='flex flex-row mt-3 gap-2 t-m text-text03 items-center'>
                <p>좋아요 5</p>
                <p>댓글 5</p>
                <p>조회 5</p>
              </div>
              
          </div>
          </div>
        <CommentSection />
        </div>
    </div>
  )
}