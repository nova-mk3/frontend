import { Suspense } from "react";
import SearchPost from "./SearchPost";

export default function page() {
    
  return (

    <>
      <Suspense fallback={<>loading...</>}>
           <SearchPost />
      </Suspense> 
    
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