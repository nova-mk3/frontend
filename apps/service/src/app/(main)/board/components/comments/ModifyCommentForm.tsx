"use client"
import { CommentsPut } from '@/src/api/board/comments';
import { useQueryClient } from '@tanstack/react-query';
import React, { useState } from 'react'
import TextareaAutosize from 'react-textarea-autosize';
import { commentsKeys } from '../../query/comments';
import { throwErrorMessage } from '@/src/libs/utils/throwError';
import { Button } from '@nova/ui/components/ui/button';

interface ModifyCommentFormProps {
    commentId : string
    content : string
    postId : string
    handleSubmit : ()=> void
    handleCancel : ()=> void
    value : string
    setValue :React.Dispatch<React.SetStateAction<string>>;
}
export default function ModifyCommentForm({commentId,content,postId,handleSubmit,handleCancel,value,setValue } : ModifyCommentFormProps) {
  
  return (
    <div className="flex flex-col w-[90%] gap-3 mx-auto p-1 my-3">
      <div className="border-line01 border rounded-md">
        <TextareaAutosize
          className="flex w-full min-h-[98px] t-m resize-none outline-none p-4 border-none"
          placeholder="댓글을 입력하세요"
          value={value}
          onChange={(e)=> setValue(e.target.value)}
        />
      </div>

      <div className="flex flex-row  gap-3 ml-auto">
        <Button
          variant="text"
          className="bg-line01/5 hover:bg-line01"
          onClick={handleCancel}
        >
          취소
        </Button>
        <Button className="flex w-[120px]" onClick={handleSubmit}>댓글 작성</Button>
      </div>
    </div>
  )
}
