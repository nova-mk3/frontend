"use client"

import { Button } from '@nova/ui/components/ui/button';
import React from 'react'
import TextareaAutosize from 'react-textarea-autosize';
import DetailPageContent from '../../board/components/DetailPageContent';
import { useSuggestionDetailQuery } from '../query/queries';
import { Milestone, Unlock,Lock, ChevronLeft, MessageSquare } from 'lucide-react';
import Link from 'next/link';
import AdminMessage from '../components/AdminMessage';
import {Separator} from '@nova/ui/components/ui/separator'
import { FileListLayout,FileList } from '../components/ViewFileLayout';
import { toFormattedDate } from '@/src/libs/utils/dateParsing';



interface PostDetailProps{
    postId: string;
}
  
export default  function PostDetail({postId} : PostDetailProps) {

  const isAdmin = true
  const { data } = useSuggestionDetailQuery(postId);

  console.log(data);
  
  return (
    <div className="flex flex-col t-m  w-[80%]  mx-auto gap-6">


    {/* <div className={`flex flex-row flex-wrap items-end border-primary border-b-[1px] py-5 mobile:flex-col mobile:items-center`}>
      <div className="flex mobile:flex-col mobile:items-center">
      <Link href={'/suggestion'} className="t-l !font-bold text-primary mobile:mb-[15px] flex flex-row gap-1 items-center"><Milestone size={20}/>건의함</Link>
      <p className="b-m ml-2 mt-auto mobile:mb-4">여러분들의 건의가 개발자에게 큰 힘이 됩니다😀</p>
      </div>
    </div> */}

<div className="border-b bg-background01">
        <div className="mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Link
                href="/suggestion"
                className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
              >
                <ChevronLeft className="w-4 h-4" />
                <span className="font-medium">건의함</span>
              </Link>
              <Separator orientation="vertical" className="h-4 mx-2" />
              <div className="flex items-center gap-2">
                <MessageSquare className="w-4 h-4" />
                <span className="text-sm text-muted-foreground">건의사항 #{data.id}</span>
              </div>
            </div>
            <Button variant="outline">
              <Link href="/suggestion/newpost">새 건의하기</Link>
            </Button>
          </div>
        </div>
      </div>
      
     <div className="mb-8 mt-8">
        <h1 className="text-3xl font-bold mb-4">{data.title}</h1>
        <div className="flex items-center gap-4 text-sm text-muted-foreground">
          <span>{toFormattedDate(data.createdTime)}</span>
          <span>{data.authorName}</span>
          <div className="flex items-center gap-1">
              {true ? <Unlock className="w-4 h-4" /> : <Lock className="w-4 h-4" />}
              <span className="text-sm">{true ? "공개" : "비공개"}</span>
          </div>
        </div>
      </div>       

      <DetailPageContent content={data.content}/>
      <Separator />
      <span className='text-xl font-semibold'>첨부파일</span>
      <FileListLayout>
              <FileList files={data.files}/>
      </FileListLayout>
       {/* 관리자 답변 영역 */}
       <div className="mb-12">
        <h2 className="text-xl font-semibold mb-4 mt-8">관리자 답변</h2>
        {
          data.adminReply && <AdminMessage content='개선' time={"2024.12.14 13:15"}/>
        }
        {
          !data.adminReply && <AdminMessage content='개선' time={"2024.12.14 13:15"}/>
        }
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



