"use client";
import React, { useState } from "react";

import { CircleUser } from "lucide-react";

import ReplyCommentForm from "./ReplyCommentForm";
import ReplyCommentItem from "./ReplyCommentItem";
import { Button } from "@nova/ui/components/ui/button";
import ReplyButton from "./ReplyButton";
import { formatDate } from "@/src/libs/utils/dateParsing";


export interface CommentItemProps {
  id : string;
  authorName : string;
  authorProfilePhoto : string;
  children : CommentItemProps[],
  content : string
  modifiedTime : string
  createdTime : string
  className?: string;
  postId: string;
}
export default function CommentListItem({ id,authorName,authorProfilePhoto,children,content,modifiedTime,createdTime,className,postId}: CommentItemProps) {
  const [isReplyOpen, setReplyOpen] = useState(false);
  const [isReplyFormOpen, setReplyFormOpen] = useState(false);
  const toggleReply = () => {
    setReplyOpen((prev) => !prev);
  };
  const toggleReplyForm = () => {
    setReplyFormOpen((prev) => !prev);
  };

  return (
    <div
      className={`w-full min-h-[210px] flex flex-col gap-3 border-line01 border-b-[1px] py-[24px] ${className}`}
    >
      {/* 댓글 타이틀 부분도 컴포넌트 분리가 가능해보인다. */}
      <div className="flex flex-row items-center gap-4">
        <CircleUser size={40} />
        <div className="flex flex-col justify-center">
          <p>{authorName}</p>
          <p>{formatDate(createdTime)}</p>
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
      <ReplyButton isOpen={isReplyOpen} toggle={toggleReply} count={children.length}/>

      {/* 대댓글 위치 */}

      {isReplyOpen && (
        <div className="flex flex-col gap-7 bg-background02 rounded-lg w-[95%] mx-auto">
          {
            children.map((child) => (
              <ReplyCommentItem
                key={child.id}
                id={child.id}
                authorName={child.authorName}
                authorProfilePhoto={child.authorProfilePhoto}
                content={child.content}
                modifiedTime={child.modifiedTime}
                createdTime={child.createdTime}
                children={child.children}
              />
            ))
          }

          {isReplyFormOpen ? (
            <ReplyCommentForm toggle={toggleReplyForm}  parentCommentId={id} postId={postId}/>
          ) : (
            <Button className={`w-[90%] mx-auto mb-7 ${children.length === 0 && 'mt-7'}`} onClick={toggleReplyForm}>
              답글 작성
            </Button>
          )}
        </div>
      )}
    </div>
  );
}
