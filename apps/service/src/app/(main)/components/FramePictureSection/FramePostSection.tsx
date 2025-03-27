"use client";

import { cn } from "@nova/ui/lib/utils";
import { HTMLAttributes, useState } from "react";
import Logo from "@/public/image/Logo.svg";
import { Separator } from "@nova/ui/components/ui/separator";
import { Ellipsis, Eye } from "lucide-react";
import IntroPostList from "./IntroPostList";
import NoticePostList from "./NoticePostList";
import AcrossPostList from "./AcrossPostList";
import Link from "next/link";
export default function FramePostSection({
  className,
  ...props
}: HTMLAttributes<HTMLDivElement>) {
  const [selectedTab, setSelectedTab] = useState<
    "latest" | "popular" | "notice" | "intro"
  >("latest");

  return (
    <div className={cn(className)} {...props}>
      <div className="w-screen">
        <div className="absolute  w-screen h-[550px] bg-background02 mobile:h-[1100px]" />
      </div>
      <div className="flex flex-row min-h-[550px] py-20 relative max-w-screen-xl w-full mx-auto mobile:flex-col">
        <div className="flex flex-col relative pl-[50px] mobile:w-full mobile:h-[550px] mobile:items-center">
          <div className="d-s text-primary !font-bold">NOVA</div>
          <div className="d-m !font-bold">NEWS</div>
          <Logo
            className="-rotate-12 absolute top-[-30px]"
            // fill="#B096F5"
            width="250px"
          />
        </div>
        <div className="min-w-[600px] h-[550px] ml-auto mobile:min-w-full mobile:px-8">
          <div className="flex flex-row gap-3 items-center t-m">
            <div
              className={cn(
                "cursor-pointer",
                selectedTab === "latest" && "text-primary font-bold"
              )}
              onClick={() => setSelectedTab("latest")}
            >
              최신글
            </div>
            <Separator orientation="vertical" className="h-4" />
            <div
              className={cn(
                "cursor-pointer",
                selectedTab === "popular" && "text-primary font-bold"
              )}
              onClick={() => setSelectedTab("popular")}
            >
              인기글
            </div>
            <Separator orientation="vertical" className="h-4" />
            <div
              className={cn(
                "cursor-pointer",
                selectedTab === "notice" && "text-primary font-bold"
              )}
              onClick={() => setSelectedTab("notice")}
            >
              공지사항
            </div>
            <Separator orientation="vertical" className="h-4" />
            <div
              className={cn(
                "cursor-pointer",
                selectedTab === "intro" && "text-primary font-bold"
              )}
              onClick={() => setSelectedTab("intro")}
            >
              자기소개
            </div>
            <Link href="/board/home" className="ml-auto">
              <Ellipsis size={20} className="text-gray-700" />
            </Link>
          </div>
          <Separator className="mt-3" />
          {selectedTab === "latest" && <AcrossPostList sortBy="createdTime" />}
          {selectedTab === "popular" && <AcrossPostList sortBy="viewCount" />}
          {selectedTab === "notice" && <NoticePostList />}
          {selectedTab === "intro" && <IntroPostList />}
        </div>
      </div>
    </div>
  );
}

export function Item() {
  return (
    <div className="flex flex-row gap-3 w-full items-center py-4 border-b-[1px] border-line01 hover:cursor-pointer">
      <p className="bg-primary rounded-full text-sm flex items-center justify-center text-background01 px-2 py-0.5">
        공지
      </p>
      <div className="flex-1">노바 회식 장소 공지</div>
      <div className="flex text-gray-500 flex-row gap-3 items-center">
        <Eye className="w-4 h-4 te" />
        <span className="text-sm">2</span>
        <div className="text-sm">2025-01-01</div>
      </div>
    </div>
  );
}
