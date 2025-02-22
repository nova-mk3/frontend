"use client"
import React, { useState } from 'react'
import { Image } from "lucide-react";
import BoardListTitle from '../board/components/BoardListTitle'
import { BOARD_SIZE, POST_TYPE } from '@/src/constant/board'
import { useSearchParams } from 'next/navigation';
import ErrorBoundaryWrapper from '../components/ErrorBoundaryWrapper';
import Post from './Post';
export default function page() {

   const searchParams = useSearchParams();
    const currentPage = parseInt(searchParams.get("page") || "1", 10);
    const [searchQuery, setSearchQuery] = useState(searchParams.get("query") || "");
    const [sortOption, setSortOption] = useState(searchParams.get("sort") || "asc");
    
  return (

    <>
     <BoardListTitle 
      title={POST_TYPE.PICTURES}
      TitleImage={<Image size={20}/> }
      searchQuery={searchQuery}
      setSearchQuery={setSearchQuery}
      sortOption={sortOption}
      setSortOption={setSortOption}
      defaultHref="/pictures"
      />
      <ErrorBoundaryWrapper>
        <Post postType={POST_TYPE.PICTURES} page={currentPage} size={8} sort={sortOption} />
      </ErrorBoundaryWrapper>   
    
    
    </>
  //   <div className='flex flex-col mx-auto'>
  //     <Title title="사진 게시판" className='mb-5'/>


  //     {/* 여기는 카드형식으로 가는게 더 보기 좋을 것 같다 */}



  //     <div className='grid xl:grid-cols-4 lg:grid-cols-2  mobile:grid-cols-1 gap-8'>
  //       <Item/>
  //       <Item/>
  //       <Item/>
  //       <Item/>
  //       <Item/>
  //       <Item/>
  //       <Item/>
  //       </div>

       
  //   </div>
  // )
)}