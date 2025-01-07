"use client";

import React from "react";
import CommentTitle from "./CommentTitle";
import TextareaAutosize from "react-textarea-autosize";
import { Button } from "@nova/ui/components/ui/button";
export default function Comment() {
  return (
    <div className="flex flex-col gap-[20px]">
      <CommentTitle />

      <div className="w-[90%] mx-auto p-1">
        <div className="border-line01 border rounded-md">
          <TextareaAutosize
            className="flex w-full min-h-[98px] t-m resize-none outline-none p-4 border-none"
            placeholder="댓글을 입력하세요"
          />
        </div>

        <Button className="flex w-[120px] mt-5 ml-auto">댓글 작성</Button>
      </div>
    </div>
  );
}
