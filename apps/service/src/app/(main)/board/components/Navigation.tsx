"use client"
import Link from 'next/link';
import React from 'react';
import { Hand, Pin, MessageSquareMore, Book, Layers, House } from 'lucide-react';
import { usePathname } from 'next/navigation';

interface NavigationProps {
  className?: string;
}

export default function Navigation({ className }: NavigationProps) {
  return (
    <div className=' bg-background02 py-3 px-4'>
      <ul className='flex flex-row gap-2 flex-wrap w-[80%] mx-auto'>
        <NavigationMenuItem href="/board/home">
        <House size={20} />CLUB NOVA
        </NavigationMenuItem>
        <NavigationMenuItem href="/board/all">
          <Layers size={20} />전체글보기
        </NavigationMenuItem>
        <NavigationMenuItem href="/board/free">
          <Book size={20} />자유게시판
        </NavigationMenuItem>
        <NavigationMenuItem href="/board/qna">
          <MessageSquareMore size={20} />Q&A
        </NavigationMenuItem>
        <NavigationMenuItem href="/board/introduction">
          <Hand size={20} />자기소개
        </NavigationMenuItem>
        <NavigationMenuItem href="/board/notice">
          <Pin size={20} />공지사항
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
  const isActive = pathname.includes(href);
  return (
    <Link href={href}>
      <li
        className={`${
          isActive ? 'bg-primary text-background01' : 'hover:bg-line01/50 border-line01 border-[1px]'
        } px-3 py-2 cursor-pointer rounded-xl flex flex-row gap-2 items-center w-full bg-background01 ${className}`}
      >
        {children}
      </li>
    </Link>
  );
}
