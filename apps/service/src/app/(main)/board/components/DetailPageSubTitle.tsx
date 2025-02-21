"use client";
import React from "react";
import { formatDate } from "@/src/libs/utils/dateParsing";
import { useRouter } from "next/navigation";
import { PostType } from "@/src/constant/board";
import Like from "./MobileLike";
import { IntegratedBoardDelete } from "@/src/api/board/integrated";
import AlertDialog from "../../components/AlertDialog";
import { useQueryClient } from "@tanstack/react-query";
import { postKeys } from "../query/postqueries";
import MobileLike from "./MobileLike";

interface SubTitle {
  title: string;
  writer: string;
  date: string;
  likeCount : number;
  viewCount : number;
  postId : string;
  postType : PostType;
  boardId : string;
  liked : boolean;
  defaultHref? : string;
}

export default function DetailPageSubTitle({
  title = "게시판 제목",
  writer = "권자몬",
  date = "2025.01.07",
  likeCount,
  viewCount,
  postId,
  postType,
  boardId,
  liked,
  defaultHref=""
}: SubTitle) {
  const router = useRouter();
  const handleModify = () => {
    router.push(`${defaultHref}/modify?id=${postId}&type=${postType}`);
  };
  const handleDelete = async() => {
    try {
      await IntegratedBoardDelete({boardId, postId})
      router.push(`${defaultHref}/${postType.toLocaleLowerCase()}`)
    
        // TODO : 왔다갔다 하는 조회수 부분은 어떻게 할까 -> 개인적인의견 그렇게 중요한 요소가 아닌데 api 재요청을 할 필요가 있을까        

    }catch(error : any){
      console.log(error);
    }
  };
  return (
    <div className="flex flex-col border-line01  pt-5 mobile:flex-col mt-[40px]">
      <p className="d-m">{title}</p>

      <div className="flex flex-row mt-2">
      <div className="flex flex-row t-m items-end gap-3">
        <p className="hover:underline cursor-pointer t-l">{writer}</p>
        <div className="w-[1px] h-[20px] bg-line01"></div>
        <p>{formatDate(date)}</p>
        <div className="w-[1px] h-[20px] bg-line01"></div>
        <p >조회 : {viewCount}</p>
      </div>

      <div className="flex flex-row gap-3 items-end ml-auto">
        <MobileLike count={likeCount} postId={postId} liked={liked}/>
        
        <p className="cursor-pointer" onClick={handleModify}>수정</p>
        <div className="w-[1px] h-[20px] bg-line01"></div>
        <AlertDialog title="게시글" triggerName="삭제" onAction={handleDelete}/>
      </div>
      </div>
    </div>
  );
}
