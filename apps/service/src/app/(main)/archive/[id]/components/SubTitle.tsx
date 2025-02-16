import React from "react";
import Like from "../../components/Like";
import { formatDate } from "@/src/libs/utils/dateParsing";

interface SubTitle {
  title?: string;
  writer?: string;
  date?: string;
  likeCount? : number;
  viewCount? : number;
}

export default function SubTitle({
  title = "게시판 제목",
  writer = "권자몬",
  date = "2025.01.07",
  likeCount,
  viewCount
}: SubTitle) {
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
        
        <p>수정</p>
        <div className="w-[1px] h-[20px] bg-line01"></div>
        <p>삭제</p>
      </div>
      </div>
    </div>
  );
}
