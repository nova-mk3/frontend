"use client";
import React, { useMemo } from "react";
import { Lock, Unlock } from "lucide-react";
import { formatDate } from "@/src/libs/utils/dateParsing";
import Link from "next/link";
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

  return (
    <Link
      href={`/suggestion/${id}`}
      className={`flex flex-row t-m border rounded-xl border-line01 py-2 hover:bg-background02 cursor-pointer ${className} items-center`}
    >
      <div className={`w-[60px] text-center`}>{index.substring(0, 2)}</div>
      <div className={`flex flex-row items-center gap-1 flex-1`}>
        {/* 이부분 신기하네요 */}
        {Private && <Lock size={16} className="text-text02" />}
        {!Private && <Unlock size={16} className="text-text02" />}

        {/* 이거 진짜 신기하긴하네 */}
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
}
