"use client";
import { Button } from "@nova/ui/components/ui/button";
import { PlateEditor } from "@nova/ui/components/editor/plate-editor";
import React from "react";
import TextareaAutosize from "react-textarea-autosize";
export default function Page() {
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
      <div className="flex-none flex flex-row gap-2 my-5 t-m">
        <p>태그</p>
        <p>태그</p>
        <p>태그</p>
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
