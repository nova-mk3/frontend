"use client";
import React from "react";
import Link from "next/link";
import Image from "next/image";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuIndicator,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  NavigationMenuViewport,
} from "@nova/ui/components/navigation-menu";
export default function Navigation() {
  return (
    <NavigationMenu>
      <NavigationMenuList className="gap-[20px]">
        <NavigationMenuItem>
          <NavigationMenuTrigger className="t-m font-bold">
            소개
          </NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="flex flex-col gap-[15px] p-4 md:w-[325px] lg:grid-cols-[.75fr_1fr] bg-background01">
              <NavigationMenuLink asChild>
                <Link href="/">
                  <li className="flex items-center h-[60px]  rounded-lg hover:bg-ui01">
                    <div className="flex flex-row items-center">
                      <div className="w-[60px] h-[50px] flex justify-center items-center border-r-[1px] border-line01">
                        <Image
                          src="/image/History.svg"
                          width={24}
                          height={24}
                          alt="연혁"
                        />
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
                <Link href="/">
                  <li className="flex items-center w-[285px] h-[60px] hover:bg-ui01">
                    <div className="flex flex-row items-center">
                      <div className="w-[60px] h-[50px] flex justify-center items-center border-r-[1px] border-line01">
                        <Image
                          src="/image/People.svg"
                          width={24}
                          height={24}
                          alt="연혁"
                        />
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
                <Link href="/">
                  <li className="flex items-center w-[285px] h-[60px]  rounded-lg hover:bg-ui01">
                    <div className="flex flex-row items-center">
                      <div className="w-[60px] h-[50px] flex justify-center items-center border-r-[1px] border-line01">
                        <Image
                          src="/image/Person.svg"
                          width={24}
                          height={24}
                          alt="연혁"
                        />
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
          <NavigationMenuTrigger className="font-bold">
            게시판
          </NavigationMenuTrigger>
          <NavigationMenuContent>
            <NavigationMenuLink>Link</NavigationMenuLink>
          </NavigationMenuContent>
        </NavigationMenuItem>

        <NavigationMenuItem>
          <NavigationMenuTrigger className="font-bold">
            가이드
          </NavigationMenuTrigger>
          <NavigationMenuContent>
            <NavigationMenuLink>Link</NavigationMenuLink>
          </NavigationMenuContent>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
}
