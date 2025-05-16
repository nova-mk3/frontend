import React from "react";
import SkeletonSuggestionItem from "./SkeletonSuggestionItem";

export default function SkeletonSuggestionList() {
  return (
    <div className="flex flex-col gap-2 min-h-[700px]">
      <div className="flex flex-row t-m border-y-[1px] border-line01 py-2 mt-5">
        <p className="w-[60px] text-center">번호</p>
        <p className="text-center">제목</p>
        <p className="w-[100px] ml-auto text-center">작성자</p>
        <p className="w-[100px] text-center">작성날짜</p>
        <p className="w-[100px] text-center">읽음</p>
        <p className="w-[100px] text-center">답변</p>
      </div>
      {Array.from({ length: 10 }).map((_, index) => (
        <SkeletonSuggestionItem key={index} />
      ))}
    </div>
  );
}
