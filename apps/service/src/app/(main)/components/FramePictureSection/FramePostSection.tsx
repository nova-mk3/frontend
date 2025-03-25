"use client";

import { cn } from "@nova/ui/lib/utils";
import { HTMLAttributes } from "react";
import Logo from "@/public/image/Logo.svg";
import { Separator } from "@nova/ui/components/ui/separator";
import { Ellipsis, Eye } from "lucide-react";
import Link from "next/link";
export default function FramePostSection({
  className,
  ...props
}: HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn(className)} {...props}>
      <div className="w-screen">
        <div className="absolute  w-screen h-[550px] bg-background02" />
      </div>
      <div className="flex flex-row h-[550px] py-20 relative max-w-screen-xl mx-auto">
        <div className="w-[600px] flex flex-col relative ml-[50px]">
          <div className="d-s text-primary !font-bold">NOVA</div>
          <div className="d-m !font-bold">NEWS</div>
          <Logo
            className="absolute top-[50px] left-[60px] -rotate-12"
            // fill="#B096F5"
            width="250px"
          />
        </div>
        <div className="ml-[50px] flex-1">
          <div className="flex flex-col">
            <div className="flex flex-row gap-3 items-center t-m">
              <div className="text-primary !font-bold cursor-pointer">
                최신글
              </div>
              <Separator orientation="vertical" className="h-4" />
              <div className="cursor-pointer">인기글</div>
              <Separator orientation="vertical" className="h-4" />
              <div className="cursor-pointer">공지사항</div>
              <Separator orientation="vertical" className="h-4" />
              <div className="cursor-pointer">자기소개</div>
              <Link href="/board/home" className="ml-auto">
                <Ellipsis className="w-6 h-6" />
              </Link>
            </div>
            <Separator className="mt-3" />
            <div className="flex flex-col">
              <Item />
              <Item />
              <Item />
              <Item />
              <Item />
              <Item />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Item() {
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
