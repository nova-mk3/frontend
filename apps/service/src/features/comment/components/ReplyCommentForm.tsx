import { Button } from "@nova/ui/components/ui/button";
import { useQueryClient } from "@tanstack/react-query";
import React, { useState } from "react";
import TextareaAutosize from "react-textarea-autosize";
import { useCreateReplyMutation } from "../hooks/mutations/useCreateReplyComment";

interface ReplyCommentFormProps {
  toggle: () => void;
  postId: string;
  parentCommentId: string;
}
export default function ReplyCommentForm({
  toggle,
  postId,
  parentCommentId,
}: ReplyCommentFormProps) {
  const [value, setValue] = useState("");
  const { mutate } = useCreateReplyMutation({ postId, setValue });

  const handleSubmit = () => {
    mutate({ postId, content: value, parentCommentId });
  };

  return (
    <div className="flex flex-col w-[90%] gap-3 mx-auto p-1 my-3">
      <div className="border-line01 border rounded-md">
        <TextareaAutosize
          className="flex w-full min-h-[98px] t-m resize-none outline-none p-4 border-none"
          placeholder="댓글을 입력하세요"
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
      </div>
      {/* 버튼 wrapper 컴포넌트로 리펙토링 예정 */}
      <div className="flex flex-row  gap-3 ml-auto">
        <Button
          variant="text"
          className="bg-line01/5 hover:bg-line01"
          onClick={toggle}
        >
          취소
        </Button>
        <Button className="flex w-[120px]" onClick={handleSubmit}>
          댓글 작성
        </Button>
      </div>
    </div>
  );
}
