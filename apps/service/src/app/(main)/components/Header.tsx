import React from "react";
import Logo from "@/public/image/LogoWithName.svg";
import Navigation from "./Navigation";
import Link from "next/link";
import SuggestionIcon from "./SuggestionIcon";
import { SidebarWrapper } from "./Siderbar/SiderbarWrapper";
import HeaderLogin from "./HeaderLogin";

export default function Header() {
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
          <SuggestionIcon className="mobile:hidden" href="/suggestion" />
          <HeaderLogin />
        </div>
        <SidebarWrapper />
      </div>
    </>
  );
}
