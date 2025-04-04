import React from "react";
import {
  History,
  Crown,
  Users,
  Folder,
  Layers,
  Image,
  ShieldCheck,
  BookText,
} from "lucide-react";
import Link from "next/link";
import { SidebarMenuItem } from "./AppSidebar";
export default function SiderbarContent() {
  return (
    <div className="flex flex-col gap-[30px] pt-[10px] px-[20px]">
      <div>
        <p className="h-s mb-2">소개</p>
        <ul className="t-m list-inside list-disc flex flex-col gap-[5px]">
          <SidebarMenuItem asChild>
            <Link href={"/news"}>
              <History />
              연혁
            </Link>
          </SidebarMenuItem>
          <SidebarMenuItem asChild>
            <Link href={"/people"}>
              <Users />
              동아리원 소개
            </Link>
          </SidebarMenuItem>
          <SidebarMenuItem asChild>
            <Link href={"/executive"}>
              <Crown />
              임원 소개
            </Link>
          </SidebarMenuItem>
        </ul>
      </div>
      <div>
        <p className="h-s mb-2">게시판</p>
        <ul className="t-m list-inside list-disc flex flex-col gap-[5px]">
          <SidebarMenuItem asChild>
            <Link href={"/board/home"}>
              <Layers />
              통합게시판
            </Link>
          </SidebarMenuItem>
          {/* <SidebarMenuItem asChild>
            <Link href={"/exam_archive"}>
              <Folder />
              자료게시판
            </Link>
          </SidebarMenuItem> */}
          <SidebarMenuItem asChild>
            <Link href={"/pictures"}>
              <Image />
              사진게시판
            </Link>
          </SidebarMenuItem>
        </ul>
      </div>
      <div>
        <p className="h-s mb-2">가이드</p>
        <ul className="t-m list-inside list-disc flex flex-col gap-[5px]">
          <SidebarMenuItem
            onClick={() => {
              alert("준비중입니다");
            }}
          >
            <ShieldCheck />
            노바 생활 가이드
          </SidebarMenuItem>

          <SidebarMenuItem
            onClick={() => {
              alert("준비중입니다");
            }}
          >
            <BookText />
            노바 임원 지침서
          </SidebarMenuItem>
        </ul>
      </div>
    </div>
  );
}
