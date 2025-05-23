"use client";
import React, { useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import ModifyCommentForm from "./ModifyCommentForm";
import Image from "next/image";
import Link from "next/link";
import { SimpleProfileQueryOptions } from "@/src/app/(main)/users/[id]/query/options";
import { DeleteComment, PutComment } from "../api/comment.api";
import { commentsKeys } from "../query/queryKeys";
import { throwErrorMessage } from "@/src/shared/utils/throwError";
import { formatDate } from "@/src/shared/utils/dateParsing";
import AlertDialog from "@/src/shared/ui/modal/AlertDialog";
import { UserProfilePhoto } from "@/src/entities/user/user.type";

interface ReplyCommentItemProps {
  id: string;
  authorName: string;
  authorProfilePhoto: UserProfilePhoto;
  children: ReplyCommentItemProps[];
  content: string;
  modifiedTime: string;
  createdTime: string;
  className?: string;
  postId: string;
  parentCommentId?: string;
  authorId: string;
}
export default function ReplyCommentItem({
  id,
  className,
  authorName,
  authorProfilePhoto,
  children,
  content,
  modifiedTime,
  createdTime,
  postId,
  authorId,
  parentCommentId,
}: ReplyCommentItemProps) {
  const queryClient = useQueryClient();
  const [isModify, setModify] = useState(false);
  const [value, setValue] = useState("");
  const { data } = useQuery(SimpleProfileQueryOptions());
  const toggleModify = () => {
    if (isModify === false) setValue(content);
    setModify((prev) => !prev);
  };

  const handleDelete = async () => {
    try {
      await DeleteComment({ commentId: id });

      queryClient.invalidateQueries({
        queryKey: commentsKeys.list(postId),
      });
    } catch (error: any) {
      console.log(error);
    }
  };
  const handleModifySubmit = async () => {
    try {
      await PutComment({ commentId: id, content: value });

      // 캐시에 직접 추가하게되면 로딩시 깜빡거림이 사라짐!
      queryClient.setQueryData(commentsKeys.list(postId), (previous: any) => {
        return previous.map((item: any) => {
          if (item.id === parentCommentId) {
            return {
              ...item,
              children: item.children.map((child: any) => {
                // 만약 child의 id도 업데이트 대상이라면, 조건에 맞게 업데이트
                if (child.id === id) {
                  return {
                    ...child,
                    content: value,
                  };
                }
                return child;
              }),
            };
          }
          return item;
        });
      });
    } catch (error) {
      console.log(throwErrorMessage(error));
    } finally {
      toggleModify();
    }
  };

  return (
    <div
      className={`w-[90%] mx-auto min-h-[210px] flex flex-col gap-3 border-line01 border-b-[1px] py-[24px] ${className}`}
    >
      {/* 댓글 타이틀 부분도 컴포넌트 분리가 가능해보인다. */}
      <div className="flex flex-row items-center gap-4">
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

        <div className="ml-auto flex flex-row gap-[10px] ">
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

      {/* 댓글 내용 */}
      {!isModify && (
        <pre className="w-full min-h-[100px] p-1 t-m">{content}</pre>
      )}
    </div>
  );
}
