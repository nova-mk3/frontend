"use client";
import React, { useState } from "react";

import ReplyCommentForm from "./ReplyCommentForm";
import ReplyCommentItem from "./ReplyCommentItem";
import { Button } from "@nova/ui/components/ui/button";
import ReplyButton from "./ReplyButton";
import { formatDate } from "@/src/libs/utils/dateParsing";
import AlertDialog from "../../../components/AlertDialog";
import { CommentsDelete, CommentsPut } from "@/src/api/board/comments";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { commentsKeys } from "../../query/comments";
import { throwErrorMessage } from "@/src/libs/utils/throwError";
import ModifyCommentForm from "./ModifyCommentForm";
import Image from "next/image";
import Link from "next/link";
import { SimpleProfileQueryOptions } from "../../../users/[id]/query/options";

export interface CommentItemProps {
  id: string;
  authorName: string;
  authorProfilePhoto: Profile;
  children: CommentItemProps[];
  content: string;
  modifiedTime: string;
  createdTime: string;
  className?: string;
  postId: string;
  authorId: string;
}

export interface Profile {
  id: string;
  imageUrl: string;
  originalFileName: string;
}
export default function CommentListItem({
  id,
  authorName,
  authorProfilePhoto,
  children,
  content,
  modifiedTime,
  createdTime,
  className,
  postId,
  authorId,
}: CommentItemProps) {
  const queryClient = useQueryClient();
  const [isReplyOpen, setReplyOpen] = useState(false);
  const [isReplyFormOpen, setReplyFormOpen] = useState(false);
  const [isModify, setModify] = useState(false);
  const [value, setValue] = useState(content);
  const { data } = useQuery(SimpleProfileQueryOptions());
  const toggleModify = () => {
    if (isModify === false) setValue(content);
    setModify((prev) => !prev);
  };
  const toggleReply = () => {
    setReplyOpen((prev) => !prev);
  };
  const toggleReplyForm = () => {
    setReplyFormOpen((prev) => !prev);
  };

  const handleDelete = async () => {
    try {
      await CommentsDelete({ commentId: id });

      queryClient.invalidateQueries({
        queryKey: commentsKeys.list(postId),
      });
    } catch (error: any) {
      console.log(error);
    }
  };

  const handleModifySubmit = async () => {
    try {
      await CommentsPut({ commentId: id, content: value });

      // 캐시에 직접 추가하게되면 로딩시 깜빡거림이 사라짐!
      queryClient.setQueryData(commentsKeys.list(postId), (previous: any) => {
        console.log(previous);
        return [
          ...previous.map((item: any) => {
            if (item.id === id) return { ...item, content: value };
            return item;
          }),
        ];
      });
    } catch (error) {
      console.log(throwErrorMessage(error));
    } finally {
      toggleModify();
    }
  };

  return (
    <div
      className={`w-full min-h-[210px] flex flex-col gap-3 border-line01 border-b-[1px] py-[24px] ${className}`}
    >
      {/* 댓글 타이틀 부분도 컴포넌트 분리가 가능해보인다. */}
      <div className="flex flex-row items-center gap-5">
        <Image
          src={authorProfilePhoto.imageUrl}
          alt={authorProfilePhoto.originalFileName}
          width={40}
          height={40}
          className="object-cover w-[40px] h-[40px] rounded-full"
          unoptimized={true}
        />
        <div className="flex flex-col justify-center">
          <Link href={`/users/${authorId}`} className="text-gray-700">
            {authorName}
          </Link>
          <p className="text-gray-500">{formatDate(createdTime)}</p>
        </div>

        {/* 수정 삭제 버튼도 컴포넌트로 만들어야겠음 */}
        <div className="ml-auto flex flex-row gap-[10px] text-gray-500 text-sm">
          {data?.memberId === authorId && (
            <>
              <p className="cursor-pointer" onClick={toggleModify}>
                수정
              </p>
              <div className="w-[1px] h-[20px] bg-line01"></div>
              <AlertDialog
                title="댓글 삭제"
                subtitle="댓글을 정말로 삭제하시겠습니까?"
                triggerName="삭제"
                onAction={handleDelete}
              />
            </>
          )}
        </div>
      </div>

      {isModify && (
        <ModifyCommentForm
          commentId={id}
          content={content}
          postId={postId}
          value={value}
          setValue={setValue}
          handleSubmit={handleModifySubmit}
          handleCancel={toggleModify}
        />
      )}

      {!isModify && (
        <pre className="w-full min-h-[100px] p-1 t-m">{content}</pre>
      )}

      {/* 대댓글 열기 -> 대댓글을 열었을때 입력폼도 나와줘야함 */}
      <ReplyButton
        isOpen={isReplyOpen}
        toggle={toggleReply}
        count={children.length}
      />

      {/* 대댓글 위치 */}

      {isReplyOpen && (
        <div className="flex flex-col gap-7 bg-background02 rounded-lg w-[95%] mx-auto">
          {children.map((child) => (
            <ReplyCommentItem
              key={child.id}
              id={child.id}
              authorName={child.authorName}
              authorProfilePhoto={child.authorProfilePhoto}
              content={child.content}
              modifiedTime={child.modifiedTime}
              createdTime={child.createdTime}
              children={child.children}
              postId={postId}
              parentCommentId={id}
              authorId={child.authorId}
            />
          ))}

          {isReplyFormOpen ? (
            <ReplyCommentForm
              toggle={toggleReplyForm}
              parentCommentId={id}
              postId={postId}
            />
          ) : (
            <Button
              className={`w-[90%] mx-auto mb-7 ${children.length === 0 && "mt-7"}`}
              onClick={toggleReplyForm}
            >
              답글 작성
            </Button>
          )}
        </div>
      )}
    </div>
  );
}
