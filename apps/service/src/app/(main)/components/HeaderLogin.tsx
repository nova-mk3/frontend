"use client";

import React from "react";
import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import HeaderLoginMenu from "./HeaderLoginMenu";
import { Menu } from "lucide-react";
import { getMemberId } from "@/src/api/user/client";
// API 호출 함수 경로에 맞게 수정해주세요.

export default function HeaderLogin() {
  const { data: memberId, isLoading } = useQuery({
    queryKey: ["memberId"],
    queryFn: getMemberId,
  });
  if (isLoading) {
    return (
      <div className="flex flex-row justify-center items-center gap-4 mobile:hidden">
        <div className="w-6 h-6 rounded-full bg-background02 animate-pulse"></div>
        <div className="w-6 h-6 rounded-full bg-background02 animate-pulse"></div>
        <div className="w-6 h-6 rounded-full bg-background02 animate-pulse"></div>
      </div>
    );
  }

  return (
    <>
      {!memberId ? (
        <div className="flex flex-row justify-center items-center gap-4 mobile:hidden">
          <Link href="/signin">
            <p className="w-[60px] h-[24px] flex content-center justify-center cursor-pointer">
              로그인
            </p>
          </Link>
          <Link href="/signup">
            <p className="w-[60px] h-[24px] flex content-center justify-center cursor-pointer">
              회원가입
            </p>
          </Link>
        </div>
      ) : (
        <HeaderLoginMenu
          trigger={
            <div className="border-black border-[1px] p-2 rounded-full cursor-pointer">
              <Menu size={20} />
            </div>
          }
          memberId={memberId}
        />
      )}
    </>
  );
}
