"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

export default function SubNavigation() {
  const pathname = usePathname();
  const userId = pathname.split("/")[2];
  return (
    <ul className="flex flex-row gap-8 flex-wrap mx-auto justify-center border-b-[1px] border-line01 ">
      <NavigationMenuItem href={`/users/${userId}`} pathname={pathname}>
        프로필
      </NavigationMenuItem>
      <NavigationMenuItem href={`/users/${userId}/board`} pathname={pathname}>
        게시글
      </NavigationMenuItem>
      <NavigationMenuItem
        href={`/users/${userId}/suggestion`}
        pathname={pathname}
      >
        건의함
      </NavigationMenuItem>
    </ul>
  );
}

interface ItemsProps {
  className?: string;
  children: React.ReactNode;
  href: string;
  activeHref?: string[];
  pathname: string;
}

function NavigationMenuItem({
  children,
  href,
  className,
  pathname,
}: ItemsProps) {
  // 현재 URL과 링크의 href가 같다면 활성화된 스타일을 적용

  const isActive = pathname === href;

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
