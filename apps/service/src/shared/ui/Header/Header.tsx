import React from "react";
import Logo from "@/public/image/LogoWithName.svg";
import Link from "next/link";
import HeaderLogin from "./HeaderLogin";
import HeaderNavigation from "../navigation/HeaderNavigation";
import SuggestionIcon from "../tooltip/SuggestionIcon";
import { SidebarWrapper } from "../siderbar/SiderbarWrapper";

export default function Header() {
  return (
    <>
      <div className="flex flex-row  border-b  py-3 relative">
        <Link href={"/"}>
          <Logo width={161.83} height={45} fill={"#B096F5"} />
        </Link>
        <div className="flex flex-row items-center ml-[20px] mobile:hidden">
          <HeaderNavigation />
        </div>

        <div className="flex flex-row items-center ml-auto gap-4">
          <SuggestionIcon className="mobile:hidden" href="/suggestion" />
          <HeaderLogin />
        </div>
        <SidebarWrapper />
      </div>
    </>
  );
}
