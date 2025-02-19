"use client";
import React from "react";
import { formatDate } from "@/src/libs/utils/dateParsing";
import { useRouter } from "next/navigation";
import { PostType } from "@/src/constant/board";
import Like from "../../archive/components/Like";
import { IntegratedBoardDelete } from "@/src/api/board/integrated";

interface SubTitle {
  title?: string;
  writer?: string;
  date?: string;
  likeCount? : number;
  viewCount? : number;
  postId : string;
  postType : PostType;
  boardId : string;
}

export default function DetailPageSubTitle({
  title = "게시판 제목",
  writer = "권자몬",
  date = "2025.01.07",
  likeCount,
  viewCount,
  postId,
  postType,
  boardId
}: SubTitle) {

  const router = useRouter();
  const handleModify = () => {
    router.push(`/board/modify?id=${postId}&type=${postType}`);
  };
  const handleDelete = async() => {
    try {
      await IntegratedBoardDelete({boardId, postId})
      alert("삭제 성공!")
      router.push(`/board/${postType.toLocaleLowerCase()}`)
    
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
        <Like count={likeCount} className="hidden mobile:flex"/>
        
        <p className="cursor-pointer" onClick={handleModify}>수정</p>
        <div className="w-[1px] h-[20px] bg-line01"></div>
        <p className="cursor-pointer" onClick={handleDelete}>삭제</p>
      </div>
      </div>
    </div>
  );
}
