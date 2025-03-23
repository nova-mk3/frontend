"use client";

import React from "react";
import Navigation from "./components/Navigation";
import { usePathname } from "next/navigation";

export default function layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();

  // 현재 URL과 링크의 href가 같다면 활성화된 스타일을 적용
  let isActive = null;

  if (pathname === "/board/newpost" || pathname === "/board/modify")
    isActive = true;

  if (isActive) {
    return <div className="flex flex-col  w-full t-m mx-auto ">{children}</div>;
  } else
    return (
      <>
        <Navigation />
        <div className="flex flex-col  w-full t-m mx-auto screenLg:w-[80%]">
          {children}
        </div>
      </>
    );
}
