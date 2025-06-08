"use client";
import React from "react";
import Link from "next/link";
import {
  Crown,
  Folder,
  History,
  Layers,
  Users,
  Image,
  ShieldCheck,
  BookText,
} from "lucide-react";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@nova/ui/components/ui/navigation-menu";
import { useQuery } from "@tanstack/react-query";
import { SimpleProfileQueryOptions } from "@/src/app/(main)/users/[id]/query/options";
export default function HeaderNavigation() {
  const { data, isLoading } = useQuery(SimpleProfileQueryOptions());

  return (
    <NavigationMenu className="z-[40]">
      <NavigationMenuList className="gap-[20px]">
        <NavigationMenuItem>
          <NavigationMenuTrigger>소개</NavigationMenuTrigger>
          {/* NavigationMenuContent 부분을 복사해 네비게이션 추가삭제가 가능함 -> 추후 리펙토링 예정 */}
          <NavigationMenuContent>
            <ul className="flex flex-col gap-[15px] p-4 md:w-[325px] lg:grid-cols-[.75fr_1fr] bg-background01">
              <NavigationMenuLink asChild>
                <Link href="/news">
                  <li className="flex items-center h-[60px]  rounded-lg hover:bg-ui01">
                    <div className="flex flex-row items-center">
                      <div className="w-[60px] h-[50px] flex justify-center items-center border-r-[1px] border-line01">
                        <History size={28} />
                      </div>
                      <div className="flex flex-col ml-[16px] t-m">
                        <p className="font-bold">연혁</p>
                        <p>동아리 소개 및 역사</p>
                      </div>
                    </div>
                  </li>
                </Link>
              </NavigationMenuLink>

              <NavigationMenuLink asChild>
                <Link href="/people">
                  <li className="flex items-center w-[285px] h-[60px]  rounded-lg hover:bg-ui01">
                    <div className="flex flex-row items-center">
                      <div className="w-[60px] h-[50px] flex justify-center items-center border-r-[1px] border-line01">
                        <Users size={28} />
                      </div>
                      <div className="flex flex-col ml-[16px] t-m">
                        <p className="font-bold">동아리원 소개</p>
                        <p>재학생 및 졸업생 소개</p>
                      </div>
                    </div>
                  </li>
                </Link>
              </NavigationMenuLink>

              <NavigationMenuLink asChild>
                <Link href="/executive">
                  <li className="flex items-center w-[285px] h-[60px]  rounded-lg hover:bg-ui01">
                    <div className="flex flex-row items-center">
                      <div className="w-[60px] h-[50px] flex justify-center items-center border-r-[1px] border-line01">
                        <Crown size={28} />
                      </div>
                      <div className="flex flex-col ml-[16px] t-m">
                        <p className="font-bold">임원소개</p>
                        <p>현재 임원 소개</p>
                      </div>
                    </div>
                  </li>
                </Link>
              </NavigationMenuLink>
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>

        <NavigationMenuItem>
          <NavigationMenuTrigger>게시판</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="flex flex-col gap-[15px] p-4 md:w-[325px] lg:grid-cols-[.75fr_1fr] bg-background01">
              <NavigationMenuLink asChild>
                <Link href="/board/home">
                  <li className="flex items-center h-[60px]  rounded-lg hover:bg-ui01">
                    <div className="flex flex-row items-center">
                      <div className="w-[60px] h-[50px] flex justify-center items-center border-r-[1px] border-line01">
                        <Layers size={28} />
                      </div>
                      <div className="flex flex-col ml-[16px] t-m">
                        <p className="font-bold">통합 게시판</p>
                        <p>질의,공지,건의 등 각종 게시판</p>
                      </div>
                    </div>
                  </li>
                </Link>
              </NavigationMenuLink>
              {/* 노바회원만 볼수 있도록! */}
              {data && (
                <NavigationMenuLink asChild>
                  <Link href="/exam_archive">
                    <li className="flex items-center w-[285px] h-[60px] rounded-lg hover:bg-ui01">
                      <div className="flex flex-row items-center">
                        <div className="w-[60px] h-[50px] flex justify-center items-center border-r-[1px] border-line01">
                          <Folder size={28} />
                        </div>
                        <div className="flex flex-col ml-[16px] t-m">
                          <p className="font-bold">자료 게시판</p>
                          <p>자료 모음 게시판</p>
                        </div>
                      </div>
                    </li>
                  </Link>
                </NavigationMenuLink>
              )}

              <NavigationMenuLink asChild>
                <Link href="/pictures">
                  <li className="flex items-center w-[285px] h-[60px]  rounded-lg hover:bg-ui01">
                    <div className="flex flex-row items-center">
                      <div className="w-[60px] h-[50px] flex justify-center items-center border-r-[1px] border-line01">
                        <Image size={28} />
                      </div>
                      <div className="flex flex-col ml-[16px] t-m">
                        <p className="font-bold">사진게시판</p>
                        <p>행사 및 일상 사진</p>
                      </div>
                    </div>
                  </li>
                </Link>
              </NavigationMenuLink>
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>

        <NavigationMenuItem>
          <NavigationMenuTrigger>가이드</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="flex flex-col gap-[15px] p-4 md:w-[325px] lg:grid-cols-[.75fr_1fr] bg-background01">
              <NavigationMenuLink asChild>
                <Link
                  href="/"
                  onClick={(e) => {
                    alert("제작중입니다");
                    e.preventDefault();
                  }}
                >
                  <li className="flex items-center h-[60px]  rounded-lg hover:bg-ui01">
                    <div className="flex flex-row items-center">
                      <div className="w-[60px] h-[50px] flex justify-center items-center border-r-[1px] border-line01">
                        <ShieldCheck size={28} />
                      </div>
                      <div className="flex flex-col ml-[16px] t-m">
                        <p className="font-bold">노바 생활 가이드</p>
                        <p>생활 규칙 가이드</p>
                      </div>
                    </div>
                  </li>
                </Link>
              </NavigationMenuLink>

              <NavigationMenuLink asChild>
                <Link
                  href="/"
                  onClick={(e) => {
                    alert("제작중입니다");
                    e.preventDefault();
                  }}
                >
                  <li className="flex items-center w-[285px] h-[60px] rounded-lg hover:bg-ui01">
                    <div className="flex flex-row items-center">
                      <div className="w-[60px] h-[50px] flex justify-center items-center border-r-[1px] border-line01">
                        <BookText size={28} />
                      </div>
                      <div className="flex flex-col ml-[16px] t-m">
                        <p className="font-bold">노바 임원 지침서</p>
                        <p>임원활동 가이드 라인</p>
                      </div>
                    </div>
                  </li>
                </Link>
              </NavigationMenuLink>
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
}
