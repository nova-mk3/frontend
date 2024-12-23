"use clinet";
import React from "react";
import Image from "next/image";
export default function Header() {
  return (
    <div className="flex flex-row algin border-b-[1px] border-line01 px-[17px] py-[10px]">
      <Image
        src="/image/Logo.svg"
        alt="로고"
        width={161.83}
        height={45}
        priority={true}
        className="cursor-pointer"
      />
      <div className="flex flex-row t-m font-bold items-center g-[20px]">
        <p className="w-[60px] h-[24px] flex content-center justify-center">
          소개
        </p>
        <p className="w-[60px] h-[24px] flex content-center justify-center">
          서비스
        </p>
        <p className="w-[60px] h-[24px] flex content-center justify-center">
          가이드
        </p>
      </div>
      <div className="flex items-center ml-auto">
        <div className="flex flex-row justify-center items-center mobile:hidden">
          <p className="w-[60px] h-[24px] flex content-center justify-center">
            로그인
          </p>
          <p className="w-[60px] h-[24px] flex content-center justify-center">
            회원가입
          </p>
        </div>

        <Image
          src="/image/hamburger.svg"
          width={20}
          height={20}
          alt="햄버거"
          className="hidden mobile:block"
        />
      </div>
    </div>
  );
}
