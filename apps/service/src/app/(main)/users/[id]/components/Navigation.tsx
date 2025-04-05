"use client";
import Link from "next/link";
import React from "react";

import { usePathname } from "next/navigation";

interface NavigationProps {
  className?: string;
}

export default function Navigation({ className }: NavigationProps) {
  const pathname = usePathname();
  const userId = pathname.split("/")[2];
  return (
    <>
      <div className="">
        <ul className="flex flex-row gap-8 flex-wrap mx-auto justify-center border-b-[1px] border-line01">
          <NavigationMenuItem
            href={`/users/${userId}`}
            activeHref={[
              `/users/${userId}`,
              `/users/${userId}/board`,
              `/users/${userId}/suggestion`,
            ]}
          >
            마이페이지
          </NavigationMenuItem>
          {/* 이걸 안보여준다고 해도, 다른 사람이 이 경로를 들어가는걸 막아야하는데 */}
          <NavigationMenuItem
            href={`/users/${userId}/edit`}
            activeHref={[
              `/users/${userId}/edit`,
              `/users/${userId}/pwd`,
              `/users/${userId}/email`,
            ]}
          >
            설정
          </NavigationMenuItem>
        </ul>
      </div>
    </>
  );
}

interface ItemsProps {
  className?: string;
  children: React.ReactNode;
  href: string;
  activeHref?: string[];
}

function NavigationMenuItem({
  children,
  href,
  className,
  activeHref,
}: ItemsProps) {
  const pathname = usePathname();

  // 현재 URL과 링크의 href가 같다면 활성화된 스타일을 적용

  let isActive = false;
  activeHref?.forEach((href) => {
    if (pathname === href) isActive = true;
  });

  return (
    <Link href={href}>
      <li
        className={`${
          isActive ? "text-primary" : "hover:text-primary text-text01"
        } relative h-[60px] cursor-pointer  flex flex-row gap-2 items-center text-xl w-full bg-background01 !font-bold ${className}`}
      >
        {children}
      </li>
    </Link>
  );
}
