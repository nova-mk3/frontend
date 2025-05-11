"use client";
import { useMemo } from "react";
import { Lock, Unlock } from "lucide-react";
import Link from "next/link";
import { formatDate } from "@/src/shared/utils/dateParsing";
export interface SuggestionItem {
  adminRead: boolean;
  answered: boolean;
  author: boolean;
  createdTime: string;
  modifiedTime: string;
  private: boolean;
  title: string;
  className?: string;
  index: string;
  id: string;
  authorName: string;
}

const MakeNameToAnonymous = (name: string) => {
  return "***";
};

export default function SuggestionListItem({
  adminRead,
  answered,
  author,
  createdTime,
  private: Private,
  title,
  className,
  index,
  id,
  authorName,
}: SuggestionItem) {
  const anonymousName = useMemo(() => MakeNameToAnonymous(title), [title]);

  // 데스크탑 버전 (md 이상 화면에서 표시)
  const DesktopView = () => (
    <Link
      href={`/suggestion/${id}`}
      className={`hidden md:flex flex-row t-m border rounded-xl border-line01 py-2 hover:bg-background02 cursor-pointer ${className} items-center`}
    >
      <div className={`flex flex-row items-center gap-1 flex-1 pl-5`}>
        {Private && <Lock size={16} className="text-text02" />}
        {!Private && <Unlock size={16} className="text-text02" />}
        <p className="w-0 flex-1 truncate">{title}</p>
      </div>
      <div className={`w-[100px] text-center`}>
        {Private ? anonymousName : authorName}
      </div>
      <div className={`w-[100px] text-center`}>{formatDate(createdTime)}</div>
      <div
        className={`w-[100px] text-center ${adminRead.toString() === "true" ? "text-success" : "text-danger"}`}
      >
        {adminRead ? "읽음" : "안읽음"}
      </div>
      <div
        className={`w-[100px] text-center ${answered.toString() === "true" ? "text-success" : "text-danger"}`}
      >
        {answered ? "답변완료" : "답변대기"}
      </div>
    </Link>
  );

  // 모바일 버전 (md 미만 화면에서 표시)
  const MobileView = () => (
    <Link
      href={`/suggestion/${id}`}
      className={`md:hidden flex flex-col gap-1 t-m border rounded-xl border-line01 p-4 hover:bg-background02 cursor-pointer ${className}`}
    >
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          {Private && <Lock size={16} className="text-text02 flex-shrink-0" />}
          {!Private && (
            <Unlock size={16} className="text-text02 flex-shrink-0" />
          )}
          <p className="line-clamp-2 break-all">{title}</p>
        </div>
      </div>
      <div className="flex flex-row gap-2 text-xs">
        <div className={`${adminRead ? "text-success" : "text-danger"}`}>
          {adminRead ? "읽음" : "안읽음"}
        </div>
        <div className={` ${answered ? "text-success" : "text-danger"}`}>
          {answered ? "답변완료" : "답변대기"}
        </div>
      </div>
      <div className="flex justify-between text-sm">
        <div className="text-gray-500">
          작성자 : {Private ? anonymousName : authorName}
        </div>
        <div className="text-gray-500">{formatDate(createdTime)}</div>
      </div>
    </Link>
  );

  return (
    <>
      <DesktopView />
      <MobileView />
    </>
  );
}
