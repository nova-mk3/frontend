"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import HeaderLoginMenu from "./HeaderLoginMenu";
import Image from "next/image";
import { SimpleProfileQueryOptions } from "../users/[id]/query/options";
// API 호출 함수 경로에 맞게 수정해주세요.

export default function HeaderLogin() {
  const { data, isLoading } = useQuery(SimpleProfileQueryOptions());

  if (isLoading) {
    return (
      <div className="flex flex-row justify-center items-center gap-4 mobile:hidden">
        <div className="w-9 h-9 rounded-full bg-background02 animate-pulse"></div>
        <div className="w-9 h-9 rounded-full bg-background02 animate-pulse"></div>
        <div className="w-9 h-9 rounded-full bg-background02 animate-pulse"></div>
      </div>
    );
  }

  return (
    <>
      {!data ? (
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
            <Image
              src={data.profilePhoto.imageUrl}
              alt={data.profilePhoto.originalFileName}
              width={40}
              height={40}
              className={`w-[40px] h-[40px] object-cover rounded-full border-[1px] border-black cursor-pointer scale-103`}
              unoptimized={true}
            />
          }
          memberId={data.memberId}
        />
      )}
    </>
  );
}
