"use client";
import React, { useState } from "react";
import Link from "next/link";
import { Bell, CircleX } from "lucide-react";
import { useSidebar } from "./AppSidebar";

export default function SidebarHeader() {
  const { toggleSidebar } = useSidebar();
  // 나중에 로그인으로 바꿀예정
  const [isLogin] = useState(false);
  return (
    <div className="flex flex-row p-[20px] border-b-[1px] border-line01">
      {isLogin ? (
        <>
          <div className="flex flex-row items-end gap-[9px]">
            <p className="h-s">권성민님</p>
            <p className="text-[#938E8E]">로그아웃</p>
          </div>
          <div className="flex flex-row ml-auto gap-[24px] items-center">
            <Bell className="cursor-pointer" size={24} />
            <div>
              <CircleX
                className="cursor-pointer"
                size={24}
                onClick={toggleSidebar}
              />
            </div>
          </div>
        </>
      ) : (
        ""
      )}
      <>
        <div className="flex flex-row items-end gap-[9px]">
          <p className="h-s">
            <Link href="/signin" className="underline underline-offset-8">
              로그인
            </Link>
            을 해주세요
          </p>
        </div>
        <div className="flex flex-row ml-auto gap-[24px] items-center">
          <CircleX
            className="cursor-pointer"
            size={24}
            onClick={toggleSidebar}
          />
        </div>
      </>
    </div>
  );
}
