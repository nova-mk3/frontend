"use client"
import { Button } from '@nova/ui/components/ui/button';
import React, { useState } from 'react'

export default function CommentSection() {
    const [isCommentOpen, setIsCommentOpen] = useState(false);

    return (
      <div className='w-full'>
        {/* 댓글 열기/닫기 버튼 */}
        {!isCommentOpen ? (
          <Button onClick={() => setIsCommentOpen(true)} className='w-full'>댓글 열기</Button>
        ) : (
          <>
            <Button onClick={() => setIsCommentOpen(false)} className='w-full'>댓글 닫기</Button>
            {/* <CommentItem /> */}
          </>
        )}
      </div>
    );
}
