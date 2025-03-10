"use client";
import Link from "next/link";
import React from "react";
import {
  Hand,
  Pin,
  MessageSquareMore,
  Book,
  Layers,
  House,
} from "lucide-react";
import { usePathname } from "next/navigation";

interface NavigationProps {
  className?: string;
}

export default function Navigation({ className }: NavigationProps) {
  return (
    <div className="">
      <ul className="flex flex-row gap-7 flex-wrap mx-auto justify-center border-b-[1px] border-line01">
        <NavigationMenuItem href="edit">회원정보수정</NavigationMenuItem>
        <NavigationMenuItem href="pwd">비밀번호 변경</NavigationMenuItem>
        <NavigationMenuItem href="email">이메일 변경</NavigationMenuItem>
        <NavigationMenuItem href="board">나의 게시글</NavigationMenuItem>
        <NavigationMenuItem href="suggestion">나의 건의함</NavigationMenuItem>
      </ul>
    </div>
  );
}

interface ItemsProps {
  className?: string;
  children: React.ReactNode;
  href: string;
}

export function NavigationMenuItem({ children, href, className }: ItemsProps) {
  const pathname = usePathname();

  // 현재 URL과 링크의 href가 같다면 활성화된 스타일을 적용
  const arr = pathname.split("/");
  const isActive = arr[arr.length - 1] === href;

  return (
    <Link href={href}>
      <li
        className={`${
          isActive
            ? "text-primary after:content-[''] after:absolute after:w-full  after:h-[4px] after:bg-primary after:left-0 after:bottom-0"
            : "hover:text-primary text-text01"
        } relative h-[60px] cursor-pointer  flex flex-row gap-2 items-center w-full bg-background01 !font-bold ${className}`}
      >
        {children}
      </li>
    </Link>
  );
}
