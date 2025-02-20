"use client";
import React, { useState } from "react";
import { CircleUser } from "lucide-react";
import TextareaAutosize from 'react-textarea-autosize';
import { formatDate } from "@/src/libs/utils/dateParsing";
import { CommentsDelete, CommentsPut } from "@/src/api/board/comments";
import { useQueryClient } from "@tanstack/react-query";
import { commentsKeys } from "../../query/comments";
import { Button } from "@nova/ui/components/ui/button";
import AlertDialog from "../../../components/AlertDialog";
import { throwErrorMessage } from "@/src/libs/utils/throwError";

interface ReplyCommentItemProps {
  id : string
  authorName : string
  authorProfilePhoto : string
  children : ReplyCommentItemProps[];
  content : string
  modifiedTime : string
  createdTime : string
  className?: string
  postId : string
  parentCommentId?: string
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
  parentCommentId
}: ReplyCommentItemProps) {
  const  queryClient= useQueryClient();
  const [isReplyOpen, setReplyOpen] = useState(false);
  const [isModify, setModify] = useState(false);
  const [value,setValue] = useState("");

  const toggleModify = ()=>{
    if(isModify === false) setValue(content);
    setModify((prev) =>!prev);
  }

   const handleDelete = async() => {
        try {
          await CommentsDelete({commentId : id})
       
          queryClient.invalidateQueries({
            queryKey : commentsKeys.list(postId)
          });
    
         
    
        }catch(error : any){
          console.log(error);
        }
      };
  const handleModifySubmit = async() => {
      try {

          await CommentsPut({commentId : id, content : value})
          
          // 캐시에 직접 추가하게되면 로딩시 깜빡거림이 사라짐!
          queryClient.setQueryData(
            commentsKeys.list(postId),
            (previous: any) => {
            
              return previous.map((item: any) => {
                if (item.id === parentCommentId) {
                  return {
                    ...item,
                    children: item.children.map((child: any) => {
                      // 만약 child의 id도 업데이트 대상이라면, 조건에 맞게 업데이트
                      if (child.id === id) {
                        return { 
                          ...child, 
                          content: value 
                        };
                      }
                      return child;
                    }),
                  };
                }
                return item;
              });
            }
          );
         
         
        }catch(error){
          console.log(throwErrorMessage(error));
        }
        finally{
          toggleModify();
        }
      }

  return (
    <div
      className={`w-[90%] mx-auto min-h-[210px] flex flex-col gap-3 border-line01 border-b-[1px] py-[24px] ${className}`}
    >
      {/* 댓글 타이틀 부분도 컴포넌트 분리가 가능해보인다. */}
      <div className="flex flex-row items-center gap-4">
        <CircleUser size={40} />
        <div className="flex flex-col justify-center">
          <p>{authorName}</p>
          <p>{formatDate(createdTime)}</p>
        </div>

        <div className="ml-auto flex flex-row gap-[10px] ">
          <p className="cursor-pointer" onClick={toggleModify}>수정</p>
          <div className="w-[1px] h-[20px] bg-line01"></div>
          <AlertDialog title="댓글" triggerName="삭제" onAction={handleDelete}/>
        </div>
      </div>


      {isModify && <div className="flex flex-col w-[90%] gap-3 mx-auto p-1 my-3">
      <div className="border-line01 border rounded-md">
        <TextareaAutosize
          className="flex w-full min-h-[98px] t-m resize-none outline-none p-4 border-none"
          placeholder="댓글을 입력하세요"
          value={value}
          onChange={(e)=> setValue(e.target.value)}
        />
      </div>
      {/* 버튼 wrapper 컴포넌트로 리펙토링 예정 */}
      <div className="flex flex-row  gap-3 ml-auto">
        <Button
          variant="text"
          className="bg-line01/5 hover:bg-line01"
          onClick={toggleModify}
        >
          취소
        </Button>
        <Button className="flex w-[120px]" onClick={handleModifySubmit}>댓글 작성</Button>
      </div>
    </div>}

      {/* 댓글 내용 */}
     {
      !isModify && <div className="w-full min-h-[100px] p-1">{content}</div>

     }
    </div>
  );
}
