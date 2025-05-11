"use client";
import { logout } from "@/src/api/auth/auth";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@nova/ui/components/ui/dropdown-menu";
import { Separator } from "@nova/ui/components/ui/separator";
import { useQueryClient } from "@tanstack/react-query";
import { Bell, Search } from "lucide-react";
import Link from "next/link";
import React from "react";

interface Props {
  trigger: React.ReactNode;
  memberId: string;
}
export default function HeaderLoginMenu({ trigger, memberId }: Props) {
  const queryClient = useQueryClient();
  const handleLogout = async () => {
    await logout();
    queryClient.removeQueries({ queryKey: ["memberProfile"], exact: true });
    window.location.reload();
  };
  return (
    <div className="flex flex-row justify-center items-center gap-4 mobile:hidden">
      <div
        className="border-black border-[1px] p-2 rounded-full cursor-pointer"
        onClick={() => {
          alert("준비중입니다");
        }}
      >
        <Search size={20} />
      </div>
      <div
        onClick={() => {
          alert("준비중입니다");
        }}
        className="border-black border-[1px] p-2 rounded-full cursor-pointer"
      >
        <Bell size={20} />
      </div>

      <DropdownMenu>
        {/* asChild를 써주면 태그에 클릭이 붙는게 아니라  자식 element에 클릭 이벤트가 붙는다 */}
        <DropdownMenuTrigger asChild>{trigger}</DropdownMenuTrigger>
        <DropdownMenuContent className="w-[180px] py-2">
          <DropdownMenuGroup>
            <Link href={`/users/${memberId}`}>
              <DropdownMenuItem className="cursor-pointer px-4 py-2 hover:bg-background02">
                마이페이지
              </DropdownMenuItem>
            </Link>
            <Link href={`/users/${memberId}/edit`}>
              <DropdownMenuItem className="cursor-pointer px-4 py-2 hover:bg-background02">
                설정
              </DropdownMenuItem>
            </Link>
            <Separator className="my-1" />
            <DropdownMenuItem
              className="cursor-pointer px-4 py-2 hover:bg-background02"
              onClick={handleLogout}
            >
              로그아웃
            </DropdownMenuItem>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
