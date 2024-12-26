"use client";
import React, { useState } from "react";
import Image from "next/image";
import Navigation from "./Navigation";
import Link from "next/link";
import AppSidebar from "./Siderbar/AppSidebar";
import { Menu } from "lucide-react";

export default function Header() {
  const [isLogin] = useState(false);
  const [isSiderbar, setIsSiderbar] = useState(false);

  const toggleSiderbar = () => {
    setIsSiderbar((prev) => !prev);
  };
  return (
    <>
      <div className="flex flex-row algin border-b-[1px] border-line01 px-[17px] py-[10px] relative">
        <Link href="/">
          <Image
            src="/image/Logo.svg"
            alt="로고"
            width={161.83}
            height={45}
            priority={true}
            className="cursor-pointer"
          />
        </Link>
        <div className="flex flex-row items-center ml-[20px] mobile:hidden">
          <Navigation />
        </div>
        <div className="flex items-center ml-auto">
          {!isLogin ? (
            <div className="flex flex-row justify-center items-center gap-[22px] mobile:hidden">
              <p className="w-[60px] h-[24px] flex content-center justify-center cursor-pointer">
                로그인
              </p>
              <p
                className="w-[60px] h-[24px] flex content-center justify-center cursor-pointer "
                onClick={() => alert("개발중")}
              >
                회원가입
              </p>
            </div>
          ) : (
            <div className="flex flex-row justify-center items-center gap-[22px] mobile:hidden">
              <Image
                src="/image/Search-d.svg"
                width={48}
                height={48}
                alt="검색"
              />
              <Image
                src="/image/Alarm-d.svg"
                width={48}
                height={48}
                alt="알람"
              />
              <Image
                src="/image/Profile.svg"
                width={48}
                height={48}
                alt="프로필"
                className="cursor-pointer"
              />
            </div>
          )}
          <Menu
            size={30}
            className="hidden mobile:block cursor-pointer"
            onClick={() => setIsSiderbar(true)}
          />
        </div>
        <AppSidebar toggle={toggleSiderbar} isOpen={isSiderbar} />
      </div>
    </>
  );
}
