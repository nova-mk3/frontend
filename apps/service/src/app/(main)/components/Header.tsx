"use client";
import React, { useState } from "react";
import Logo from "@/public/image/LogoWithName.svg";
import Navigation from "./Navigation";
import Link from "next/link";
import AppSidebar from "./Siderbar/AppSidebar";
import { Bell, Menu, Search } from "lucide-react";
import Tendinous from "./Tendinous";
import HeaderLoginMenu from "./HeaderLoginMenu";

interface Props {
  memberId: string;
}
export default function Header({ memberId }: Props) {
  const [isSiderbar, setIsSiderbar] = useState(false);

  const toggleSiderbar = () => {
    setIsSiderbar((prev) => !prev);
  };

  return (
    <>
      <div className="flex flex-row  border-b  px-4 py-3 relative">
        <Link href={"/"}>
          <Logo width={161.83} height={45} fill={"#B096F5"} />
        </Link>
        <div className="flex flex-row items-center ml-[20px] mobile:hidden">
          <Navigation />
        </div>

        <div className="flex flex-row items-center ml-auto gap-4">
          <Tendinous className="mobile:hidden" href="/suggestion" />
          {memberId === "" ? (
            <div className="flex flex-row justify-center items-center gap-4 mobile:hidden">
              <Link href="/signin">
                <p className="w-[60px] h-[24px] flex content-center justify-center cursor-pointer">
                  로그인
                </p>
              </Link>
              <Link href="/signup">
                <p className="w-[60px] h-[24px] flex content-center justify-center cursor-pointer ">
                  회원가입
                </p>
              </Link>
            </div>
          ) : (
            <div className="flex flex-row justify-center items-center gap-4 mobile:hidden">
              <div
                className="border-black border-[1px] p-2 rounded-full cursor-pointer"
                onClick={() => {
                  alert("준비중입니다");
                }}
              >
                <Search size={20} />
              </div>
              <div
                className="border-black border-[1px] p-2 rounded-full cursor-pointer"
                onClick={() => {
                  alert("준비중입니다");
                }}
              >
                <Bell size={20} />
              </div>

              <HeaderLoginMenu
                trigger={
                  <div className="border-black border-[1px] p-2 rounded-full cursor-pointer">
                    <Menu size={20} />
                  </div>
                }
                memberId={memberId}
              />
            </div>
          )}
          <Menu
            size={30}
            className="hidden mobile:block cursor-pointer"
            onClick={() => setIsSiderbar(true)}
          />
        </div>
        <AppSidebar toggleSiderbar={toggleSiderbar} isOpen={isSiderbar} />
      </div>
    </>
  );
}
