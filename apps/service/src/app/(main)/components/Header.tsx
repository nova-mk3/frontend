"use client";
import Logo from "@/public/image/LogoWithName.svg";
import { cn } from "@nova/ui/lib/utils";
import { Menu } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { HTMLAttributes, useState } from "react";
import Navigation from "./Navigation";
import AppSidebar from "./Siderbar/AppSidebar";

export default function Header({ className }: HTMLAttributes<HTMLDivElement>) {
  const [isLogin] = useState(false);
  const [isSiderbar, setIsSiderbar] = useState(false);

  const toggleSiderbar = () => {
    setIsSiderbar((prev) => !prev);
  };
  return (
    <>
      <div
        className={cn(
          className,
          "flex flex-row algin border-b-[1px] border-line01 px-[17px] py-[10px] relative",
        )}
      >
        <Link href={"/"}>
          <Logo width={161.83} height={45} fill={"#B096F5"} />
        </Link>
        <div className="flex flex-row items-center ml-[20px] mobile:hidden">
          <Navigation />
        </div>
        <div className="flex items-center ml-auto">
          {!isLogin ? (
            <div className="flex flex-row justify-center items-center gap-[22px] mobile:hidden">
              <Link href="/signin">
                <p className="w-[60px] h-[24px] flex content-center justify-center cursor-pointer">
                  로그인
                </p>
              </Link>
              <Link href="signup">
                <p className="w-[60px] h-[24px] flex content-center justify-center cursor-pointer ">
                  회원가입
                </p>
              </Link>
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
