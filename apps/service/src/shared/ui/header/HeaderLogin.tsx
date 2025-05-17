"use client";

import React from "react";
import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import HeaderLoginMenu from "./HeaderLoginMenu";
import Image from "next/image";
import { SimpleProfileQueryOptions } from "@/src/app/(main)/users/[id]/query/options";
import { useUnreadAlarmCountQuery } from "@/src/features/alarm/query/queries";

export default function HeaderLogin() {
  const { data: simpleProfile, isLoading: profileLoading } = useQuery(
    SimpleProfileQueryOptions()
  );

  const { isLoading: alarmLoading } = useUnreadAlarmCountQuery({
    enabled: !!simpleProfile,
  });

  if (profileLoading || alarmLoading) {
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
      {!simpleProfile ? (
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
              src={simpleProfile.profilePhoto.imageUrl}
              alt={simpleProfile.profilePhoto.originalFileName}
              width={40}
              height={40}
              className={`w-[40px] h-[40px] object-cover rounded-full border-[1px] border-black cursor-pointer scale-103`}
              unoptimized={true}
            />
          }
          memberId={simpleProfile.memberId}
        />
      )}
    </>
  );
}
