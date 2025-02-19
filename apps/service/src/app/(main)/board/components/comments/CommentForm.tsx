"use client";

import React, { useState } from "react";
import TextareaAutosize from "react-textarea-autosize";
import { Button } from "@nova/ui/components/ui/button";
import {  useMutation, useQueryClient } from "@tanstack/react-query";
import { CommentAPIType, CommentsPost } from "@/src/api/board/comments";
import { postKeys } from "../../query/postqueries";
import { commentsKeys } from "../../query/comments";



interface CommentFormProps{
  postId: string;
  parentCommentId?: string;
}
export default function CommentForm({parentCommentId="",postId} : CommentFormProps) {
  const [value,setValue] = useState("");
  const queryClient = useQueryClient();
  
  const useCommentMutation =  useMutation({
    mutationFn: ({postId,content,parentCommentId} : CommentAPIType) => CommentsPost({postId,content,parentCommentId}),
    onSuccess: (data : any) => {
      setValue("");   

      queryClient.setQueryData(
        commentsKeys.list(postId),
        (previous: any) => {

         return {
          ...previous,
           data : [...previous.data, data.data],
         }
        }
      )

      queryClient.setQueryData(
        postKeys.detail(postId),
        (previous: any) => {

    
         return {
          ...previous,
           data : {...previous.data,
            commentCount : previous.data.commentCount +1,
           },
         }
             //개인적인 생각은 깊은복사를 통해 값을 비교하는것 같음
        }
      )

    },
    onError: (error) => {
      alert(error.message);
    },
  });

const handleSubmit = ()=>{
  useCommentMutation.mutate({postId,content : value, parentCommentId});
}


  return (
    <div className="w-[90%] mx-auto p-1 mb-3 mt-3">
      <div className="border-line01 border rounded-md">
        <TextareaAutosize
          className="flex w-full min-h-[98px] t-m resize-none outline-none p-4 border-none"
          placeholder="댓글을 입력하세요"
          value={value}
          onChange={(e)=> setValue(e.target.value)}
        />
      </div>

      <Button className="flex w-[120px] mt-5 ml-auto" onClick={handleSubmit}>댓글 작성</Button>
    </div>
  );
}
