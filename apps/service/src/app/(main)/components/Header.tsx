"use client";
import Logo from "@/public/image/LogoWithName.svg";
import Image from "next/image";
import Link from "next/link";
import Navigation from "./Navigation";

export default function Header() {
  return (
    <div className="flex flex-row algin border-b-[1px] border-line01 px-[17px] py-[10px]">
      <Link href={"/"}>
        <Logo width={161.83} height={45} fill={"#B096F5"} />
      </Link>
      <div className="flex flex-row  items-center ml-[20px] mobile:hidden">
        <Navigation />
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
