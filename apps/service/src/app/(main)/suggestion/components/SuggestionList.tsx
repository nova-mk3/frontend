import React from "react";
import { SuggestionItem } from "./SuggestionListItem";
import SuggestionListItem from "./SuggestionListItem";

interface SuggestionListProps {
  content: SuggestionItem[];
}

export default function SuggestionList({ content }: SuggestionListProps) {
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

      {content.map((item) => (
        <SuggestionListItem
          key={item.id}
          id={item.id}
          index={item.id}
          title={item.title}
          adminRead={item.adminRead}
          answered={item.answered}
          author={item.author}
          createdTime={item.createdTime}
          modifiedTime={item.modifiedTime}
          private={item.private}
          authorName={item.authorName}
        />
      ))}
    </div>
  );
}
