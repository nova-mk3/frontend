import React from "react";

import { CircleUser } from "lucide-react";
import ReplyButton from "./ReplyButton";

interface ItemProps {
  created?: string;
  profileImage?: string;
  content?: string;
  className?: string;
  name?: string;
}
export default function CommentItem({
  className,
  created = "2025.01.08",
  content = "임시적 내용입니다",
  name = "권자몬",
}: ItemProps) {
  return (
    <div className={`w-full min-h-[210px] flex flex-col gap-3 ${className}`}>
      {/* 댓글 타이틀 부분도 컴포넌트 분리가 가능해보인다. */}
      <div className="flex flex-row items-center gap-4">
        <CircleUser size={40} />
        <div className="flex flex-col justify-center">
          <p>{name}</p>
          <p>{created}</p>
        </div>

        {/* 수정 삭제 버튼도 컴포넌트로 만들어야겠음 */}
        <div className="ml-auto flex flex-row gap-[10px] ">
          <p>수정</p>
          <div className="w-[1px] h-[20px] bg-line01"></div>
          <p>삭제</p>
        </div>
      </div>
      {/* 댓글 내용 */}
      {/*  */}
      <div className="w-full min-h-[100px] p-1">{content}</div>
      {/* 대댓글 열기 -> 대댓글을 열었을때 입력폼도 나와줘야함 */}
      <ReplyButton />
    </div>
  );
}
