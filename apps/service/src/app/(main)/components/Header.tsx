import React from "react";
import Logo from "@/public/image/LogoWithName.svg";
import Navigation from "./Navigation";
import Link from "next/link";

import { Bell, Menu, Search } from "lucide-react";
import Tendinous from "./Tendinous";
import HeaderLoginMenu from "./HeaderLoginMenu";
import { cookies } from "next/headers";
import { getMemberId } from "@/src/api/user/server";
import { SidebarWrapper } from "./Siderbar/SiderbarWrapper";

export default async function Header() {
  const cookieStore = await cookies();
  const authToken = cookieStore.get("AUTH_TOKEN")?.value;
  let memberId = "";
  if (authToken) {
    memberId = await getMemberId();
  } else {
    memberId = "";
  }

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
            <HeaderLoginMenu
              trigger={
                <div className="border-black border-[1px] p-2 rounded-full cursor-pointer">
                  <Menu size={20} />
                </div>
              }
              memberId={memberId}
            />
          )}
        </div>
        <SidebarWrapper />
      </div>
    </>
  );
}
