"use client"
import Link from 'next/link';
import React from 'react';
import { Hand, Pin, MessageSquareMore, Book, Layers } from 'lucide-react';
import { usePathname } from 'next/navigation';

interface NavigationProps {
  className?: string;
}

export default function Navigation({ className }: NavigationProps) {
  return (
    <div
      className={'p-2 border-line01 border-[1px] rounded-xl fixed -translate-y-1/2 left-[10%]'}
      style={{ top: 'calc(50% - 0px)' }}
    >
      <ul className='flex flex-col gap-2'>
        <NavigationMenuItem href="/board/any">
          <Book size={20} />자유게시판
        </NavigationMenuItem>
        <NavigationMenuItem href="/board/qna">
          <MessageSquareMore size={20} />Q&A
        </NavigationMenuItem>
        <NavigationMenuItem href="/board/selfintro">
          <Hand size={20} />자기소개
        </NavigationMenuItem>
        <NavigationMenuItem href="/board/notice">
          <Pin size={20} />공지사항
        </NavigationMenuItem>
        <NavigationMenuItem href="/board">
          <Layers size={20} />전체보기
        </NavigationMenuItem>
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
  const isActive = pathname === href;
  console.log(pathname)
  return (
    <Link href={href}>
      <li
        className={`${
          isActive ? 'bg-primary text-background01' : 'hover:bg-primary hover:text-background01'
        } px-3 py-2 cursor-pointer rounded-xl flex flex-row gap-2 items-center w-full ${className}`}
      >
        {children}
      </li>
    </Link>
  );
}
