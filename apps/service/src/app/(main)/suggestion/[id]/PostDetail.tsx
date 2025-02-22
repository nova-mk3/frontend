"use client"

import { Button } from '@nova/ui/components/ui/button';
import React from 'react'
import TextareaAutosize from 'react-textarea-autosize';
import { FileListLayout,FileList } from '../../components/File/ViewFileLayout';
import DetailPageContent from '../../board/components/DetailPageContent';
import { useSuggestionDetailQuery } from '../query/queries';
import { Milestone, Unlock,Lock } from 'lucide-react';
import Link from 'next/link';



interface PostDetailProps{
    postId: string;
}
  
export default  function PostDetail({postId} : PostDetailProps) {

  const isAdmin = true
  const { data } = useSuggestionDetailQuery(postId);

  // console.log(data);
  
  return (
    <div className="flex flex-col t-m  w-[80%]  mx-auto">


    <div className={`flex flex-row flex-wrap items-end border-primary border-b-[1px] py-5 mobile:flex-col mobile:items-center`}>
      <div className="flex mobile:flex-col mobile:items-center">
      <Link href={'/suggestion'} className="t-l !font-bold text-primary mobile:mb-[15px] flex flex-row gap-1 items-center"><Milestone size={20}/>건의함</Link>
      <p className="b-m ml-2 mt-auto mobile:mb-4">여러분들의 건의가 개발자에게 큰 힘이 됩니다😀</p>
      </div>
    </div>

     <div className="mb-8 mt-8">
        <h1 className="text-3xl font-bold mb-4">시스템 개선 요청드립니다</h1>
        <div className="flex items-center gap-4 text-sm text-muted-foreground">
          <span>2024-02-23 13:45</span>
          <span>작성자</span>
          <span className="flex items-center gap-1">
            {true ? <Unlock className="w-3 h-3" /> : <Lock className="w-3 h-3" />}
            {true ? "공개" : "비공개"}
          </span>
        </div>
      </div>       

      <FileListLayout>
              <FileList files={data.files}/>
        </FileListLayout>
      <DetailPageContent content={data.content}/>
       {/* 관리자 답변 영역 */}
       <div className="mb-12">
        <h2 className="text-xl font-semibold mb-4">관리자 답변</h2>
        <div className="bg-background02 rounded-lg p-6">
          <div className="prose prose-sm max-w-none mb-2">
            <p>
              안녕하세요. 검색 기능 개선 요청 감사합니다. 현재 개선 작업을 진행 중이며, 다음 업데이트에 반영될
              예정입니다.
            </p>
          </div>
          <div className="text-sm text-muted-foreground">2024-02-23 14:30</div>
        </div>
      </div>

      {/* 관리자 댓글 입력 영역 */}
      {isAdmin && (
        <div className="mt-8">
          <h2 className="text-xl font-semibold mb-4">답변 작성</h2>
          <TextareaAutosize placeholder="관리자 답변을 입력하세요..." className="flex w-full min-h-[98px] t-m resize-none outline-none p-4 border-[1px]" />
          <div className="flex justify-end">
            <Button variant={"default"} className='mt-5'>답변 등록</Button>
          </div>
        </div>
      )}
    </div>
  );
}



