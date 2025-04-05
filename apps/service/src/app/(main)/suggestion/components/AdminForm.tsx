"use client";
import TextareaAutosize from "react-textarea-autosize";
import React, { useState } from "react";
import { Button } from "@nova/ui/components/ui/button";
import { SuggestionComment } from "@/src/api/board/suggestion";
import { useQueryClient } from "@tanstack/react-query";
import { suggestionKeys } from "../query/queries";

export default function AdminForm({
  postId,
  adminReply,
}: {
  postId: string;
  adminReply: string | null;
}) {
  const queryClient = useQueryClient();
  const [text, setText] = useState("");

  const handleAdminComment = async () => {
    await SuggestionComment({ postId, reply: text });
    setText("");

    // 상세 refetch
    queryClient.invalidateQueries({
      queryKey: suggestionKeys.detail(postId),
      refetchType: "active",
    });

    // 건의함 목록 refetch
    queryClient.invalidateQueries({
      queryKey: suggestionKeys.lists(),
      refetchType: "active",
    });
  };

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">답변 작성</h2>
      <TextareaAutosize
        placeholder={
          adminReply
            ? "수정할 답변을 입력하세요..."
            : "관리자 답변을 입력하세요..."
        }
        value={text}
        onChange={(e) => setText(e.target.value)}
        className="flex w-full min-h-[98px] rounded-lg t-m resize-none outline-none p-4 border-[1px]"
      />
      <div className="flex justify-end">
        <Button
          variant={"default"}
          className="mt-5"
          onClick={handleAdminComment}
        >
          답변 등록
        </Button>
      </div>
    </div>
  );
}
