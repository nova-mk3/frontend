"use client"
import TextareaAutosize from 'react-textarea-autosize';
import React, { useState } from 'react'
import { Button } from '@nova/ui/components/ui/button';
import { SuggestionComment } from '@/src/api/board/suggestion';

export default function AdminForm({postId} : {postId : string}) {
    const [text,setText] = useState("");

     const handleAdminComment = async()=>{
        const res= await SuggestionComment({postId,reply : text});
        setText("");
        console.log(res);
      }
      
  return (
    <div>
              <h2 className="text-xl font-semibold mb-4">답변 작성</h2>
              <TextareaAutosize placeholder="관리자 답변을 입력하세요..." 
               value={text}
               onChange={(e)=> setText(e.target.value)}
              className="flex w-full min-h-[98px] rounded-lg t-m resize-none outline-none p-4 border-[1px]" />
              <div className="flex justify-end">
                <Button variant={"default"} className='mt-5' onClick={handleAdminComment}>답변 등록</Button>
              </div>
            </div>
  )
}
