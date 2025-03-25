"use client";

import { cn } from "@nova/ui/lib/utils";
import { HTMLAttributes } from "react";
import Logo from "@/public/image/Logo.svg";
import { Separator } from "@nova/ui/components/ui/separator";
import { Ellipsis, Eye } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
export default function FrameAboutMeSection({
  className,
  ...props
}: HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn(className)} {...props}>
      <div className="w-screen relative">
        <div className="absolute  w-screen h-[550px] bg-white" />
      </div>

      <div className="flex flex-col max-w-screen-xl mx-auto relative">
        <div className="flex flex-row">
          <div className="flex flex-col w-full">
            <div className="d-l !font-bold">ABOUT US</div>
            <div className="t-m ml-auto">노바가 더 궁금하다면?</div>
            <Separator className="mt-3" />
          </div>
        </div>
        <div className="flex flex-row w-full h-[500px]">
          <p
            style={{ writingMode: "vertical-rl" }}
            className="ml-auto text-center d-s"
          >
            nova
          </p>
          <div className="flex-1 relative">
            <Image
              src="/image/NovaPoster.png"
              alt=""
              width={300}
              height={500}
              className="h-auto object-cover absolute top-[90px] left-[98px] z-10"
            />
            <Image
              src="/image/NovaPosterSub.png"
              alt=""
              width={300}
              height={500}
              className="h-auto object-cover absolute top-[-10px] left-[198px] z-0"
            />
            <div className="absolute left-[600px] top-1/2  -translate-y-1/2  d-s !font-bold flex flex-col gap-7">
              <p>충북대학교 소프트웨어학부 학술동아리</p>
              <p>개발, 인공지능, 최적화 전문 동아리</p>
              <p>3년 연속 학부 1등 동아리</p>
              <p>여러가지 개발 스터디 및 자료 공유</p>
            </div>
          </div>
          <p
            style={{ writingMode: "vertical-rl" }}
            className="mr-auto text-center d-s"
          >
            nova
          </p>
        </div>
      </div>
    </div>
  );
}
