import React from "react";

interface SubTitle {
  title?: string;
  writer?: string;
  data?: string;
}

export default function SubTitle({
  title = "게시판 제목",
  writer = "권자몬",
  data = "2025.01.07",
}: SubTitle) {
  return (
    <div className="flex flex-col border-line01  pt-5 mobile:flex-col">
      <p className="d-m">{title}</p>

      <div className="flex flex-row mt-2">
      <div className="flex flex-row t-m items-end gap-3">
        <p>{writer}</p>
        <div className="w-[1px] h-[20px] bg-line01"></div>
        <p>{data}</p>
      </div>

      <div className="flex flex-row gap-3 items-end ml-auto">
        <p>수정</p>
        <div className="w-[1px] h-[20px] bg-line01"></div>
        <p>삭제</p>
      </div>
      </div>
    </div>
  );
}
