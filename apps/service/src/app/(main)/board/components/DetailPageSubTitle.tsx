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
import Link from "next/link";
import { ChevronLeft, MessageSquare } from "lucide-react";
import { Separator } from "@nova/ui/components/ui/separator";
import { Button } from "@nova/ui/components/ui/button";

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
    <div className="flex flex-col border-line01 gap-6 mobile:flex-col">
      
      <div className="mb-8 mt-8">
      <h1 className="text-3xl font-bold mb-4 font-pretendard">{title}</h1>
      <div className="flex flex-row mt-2 text-sm text-muted-foreground">
      <div className="flex flex-row  items-center gap-4">
        <p className="hover:underline cursor-pointer">{writer}</p>
         <Separator orientation="vertical" className="h-4" />
        <p>{formatDate(date)}</p>
        <Separator orientation="vertical" className="h-4" />
        <p >조회 : {viewCount}</p>
      </div>

      <div className="flex flex-row gap-4 items-center ml-auto">
        <MobileLike count={likeCount} postId={postId} liked={liked}/>
        
        <p className="cursor-pointer" onClick={handleModify}>수정</p>
        <Separator orientation="vertical" className="h-4" />
        <AlertDialog title="게시글" triggerName="삭제" onAction={handleDelete}/>
      </div>
      </div>
      </div>
    </div>
  );
}
