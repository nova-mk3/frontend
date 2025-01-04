"use client";
import { Button } from "@nova/ui/components/ui/button";
import { PlateEditor } from "@nova/ui/components/editor/plate-editor";
import React, { useState } from "react";
import TextareaAutosize from "react-textarea-autosize";
import Tags from "../components/Tags";
import { Input } from "@nova/ui/components/ui/input";
export default function Page() {
  const [taglist, setTaglist] = useState<string[]>(["태그1", "태그"]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      const input = e.currentTarget.value.trim();
      if (input && !taglist.includes(input)) {
        setTaglist([...taglist, input]);
        e.currentTarget.value = "";
      }
    } else if (e.key === "Backspace") {
      const input = e.currentTarget.value;
      if (input === "" && taglist.length > 0) {
        // 마지막 태그 삭제
        taglist.pop();
        const data = [...taglist];
        setTaglist(data);
      }
    }
  };
  const deleteTags = (tagname: string) => {
    setTaglist((list) => list.filter((tag) => tag !== tagname));
  };

  return (
    <div className="flex flex-col mt-5 w-[80%] h-[calc(100vh-86px)] mx-auto relative">
      {/* 제목 입력란 */}
      <div className="flex-none border-line01 border-b-[1px] pb-5">
        <TextareaAutosize
          className="flex w-full h-[40px] h-l resize-none outline-none"
          placeholder="제목을 입력하세요"
        />
      </div>

      {/* 태그 영역 */}
      <div className="flex flex-row flex-wrap gap-2 my-5 t-m">
        {taglist.map((tag, index) => (
          <Tags key={index} onClick={deleteTags} tagname={tag} />
        ))}
        <Input
          className="w-[210px]"
          placeholder="태그를 입력하세요"
          onKeyDown={handleKeyDown}
        />
      </div>

      {/* 본문 스크롤 영역 */}
      <PlateEditor />

      {/* 하단 바 (버튼 등) */}
      <div className="flex items-center absolute bottom-0 w-full h-[64px] p-4 shadow-footer z-10 bg-white">
        <div className="flex flex-row gap-[20px] ml-auto items-center">
          <Button className="t-l w-[112px]" variant="text">
            임시저장
          </Button>
          <Button className="w-[112px] t-l">작성</Button>
        </div>
      </div>
    </div>
  );
}
