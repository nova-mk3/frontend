"use client";

import React, { useState } from "react";
import TextareaAutosize from "react-textarea-autosize";
import { Button } from "@nova/ui/components/ui/button";
import { useCreateCommentMutation } from "../hooks/mutations/useCreateComment";

interface CommentFormProps {
  postId: string;
  parentCommentId?: string;
}
export default function CommentForm({
  parentCommentId = "",
  postId,
}: CommentFormProps) {
  const [value, setValue] = useState("");
  const { mutate } = useCreateCommentMutation({ postId, setValue });

  const handleSubmit = () => {
    mutate({ postId, content: value, parentCommentId });
  };

  return (
    <div className="w-[90%] mx-auto p-1 mb-3 mt-3">
      <div className="border-line01 border rounded-md">
        <TextareaAutosize
          className="flex w-full min-h-[98px] t-m resize-none outline-none p-4 border-none"
          placeholder="댓글을 입력하세요"
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
      </div>

      <Button className="flex w-[120px] mt-5 ml-auto" onClick={handleSubmit}>
        댓글 작성
      </Button>
    </div>
  );
}
